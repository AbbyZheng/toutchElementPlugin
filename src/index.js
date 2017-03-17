/**
 * Created by zhengfeiling on 17/3/1.
 */
import * as DEFUALTOPTIONS from './config/default.config'
import * as COMMON from  './util/common'

export default class ToutchElement{
    constructor(options){
        this.options = Object.assign({}, DEFUALTOPTIONS.defaultOptions, options)
        this.state = Object.assign({}, DEFUALTOPTIONS.defaultState)
        this.target = null
        this.scroller = null
        this.trigger = null
        this.transitionStyle = null
        this.isTouching = false
        this.isPreventDefault = false
        this.isWaiting = false
        this.isGlobalScroller = false
        this.transitionDuration = 0
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }
    init() {
        var options = this.options
        var target = COMMON.getElem(options.target)
        var scroller = options.scroller
            ? COMMON.getElem(options.scroller)
            : target
        var trigger = options.trigger
            ? COMMON.getElem(options.trigger)
            : target

        this.target = target
        this.scroller = scroller
        this.trigger = trigger
        this.isGlobalScroller = (
            scroller === document.body ||
            scroller === window ||
            scroller === document.documentElement
        )
        this.transitionStyle = {
            transitionProperty: options.transitionProperty,
            transitionDuration: options.transitionDuration,
            transitionTimingFunction: options.transitionTimingFunction,
            webkitTransitionProperty: options.transitionProperty,
            webkitTransitionDuration: options.transitionDuration,
            webkitTransitionTimingFunction: options.transitionTimingFunction,
        }
        /**
         * in some browser, transitionend dose'nt work as expected
         * use setTimeout instead
         */
        var transitionDuration = Number(options.transitionDuration.replace(/[^.\d]+/g, ''))

        // transform 1s to 1000ms
        if (/[\d\.]+s$/.test(options.transitionDuration)) {
            transitionDuration = transitionDuration * 1000
        }
        this.transitionDuration = transitionDuration
        this.enable()
    }
    destroy() {
        this.disable()
    }
    setTranslate(translateX, translateY) {
        Object.assign(
            this.target.style,
            DEFUALTOPTIONS.emptyTransitionStyle,
            COMMON.getTranslateStyle(translateX, translateY)
        )
    }
    animateTo(translateX, translateY, callback) {
        var state = this.state
        var target = this.target
        var transitionDuration = this.transitionDuration
        var transitionStyle = this.transitionStyle
        var translateStyle = COMMON.getTranslateStyle(translateX, translateY)

        state.translateX = translateX
        state.translateY = translateY

        var createTransitionEndHandler = function(callback) {
            Object.assign(target.style, transitionStyle, translateStyle)
            setTimeout(callback, transitionDuration)
        }

        if (DEFUALTOPTIONS.isSupportPromise) {
            return new Promise(createTransitionEndHandler).then(callback)
        }
        createTransitionEndHandler(callback)
    }
    animateToOrigin(callback) {
        var context = this
        var finalCallback = function() {
            Object.assign(context.target.style, DEFUALTOPTIONS.emptyStyle)
            Object.assign(context.state, DEFUALTOPTIONS.defaultOffsetState)
            context.isWaiting = false
            callback && callback()
        }
        return this.animateTo(0, 0, finalCallback)
    }
    enable() {
        COMMON.addEvent(this.trigger, 'touchstart', this.handleTouchStart)
        COMMON.addEvent(document, 'touchmove', this.handleTouchMove, DEFUALTOPTIONS.eventHandlerOptions)
        COMMON.addEvent(document, 'touchend', this.handleTouchEnd)
        COMMON.addEvent(document, 'touchcancel', this.handleTouchEnd)
    }
    disable() {
        COMMON.removeEvent(this.trigger, 'touchstart', this.handleTouchStart)
        COMMON.removeEvent(document, 'touchmove', this.handleTouchMove, DEFUALTOPTIONS.eventHandlerOptions)
        COMMON.removeEvent(document, 'touchend', this.handleTouchEnd)
        COMMON.removeEvent(document, 'touchcancel', this.handleTouchEnd)
    }
    preventDefault() {
        this.isPreventDefault = true
    }
    getScrollInfo() {
        return COMMON.getScrollEndingInfo(this.scroller, this.isGlobalScroller)
    }
    isActiveAction(action) {
        var options = this.options
        var eventName = DEFUALTOPTIONS.eventMap[action]
        return options[eventName] || options[eventName + 'End'] || options[action]
    }
    emit(eventName, data) {
        var listener = this.options[eventName]
        if (COMMON.isFunction(listener)) {
            listener.call(this, data)
        }
    }
    handleTouchStart(event) {
        if (this.isTouching || this.isWaiting) {
            return
        }
        var options = this.options
        var coor = COMMON.getCoor(event)

        Object.assign(this.state, {
            clientX: coor.x,
            clientY: coor.y,
            axis: '',
            action: '',
        })

        if (options.detectScroll || options.detectScrollOnStart) {
            Object.assign(this.state, this.getScrollInfo())
        }

        if (options.stopPropagation) {
            event.stopPropagation()
        }

        this.isTouching = true
    }
    handleTouchMove(event) {
        if (!this.isTouching) {
            return
        }
        var coor = COMMON.getCoor(event)
        var options = this.options
        var state = this.state
        var clientX = coor.x
        var clientY = coor.y
        var deltaX = clientX - state.clientX
        var deltaY = clientY - state.clientY
        var translateX = state.translateX
        var translateY = state.translateY
        var axis = state.axis
        var action = state.action

        // only check the axis once
        if (!axis) {
            axis = Math.abs(deltaY) >= Math.abs(deltaX) ? 'y' : 'x'
        }

        // only check the action once
        if (!action) {
            if (axis === 'y') {
                if (deltaY > 0) {
                    action = 'pullDown'
                } else if (deltaY < 0) {
                    action = 'pullUp'
                }
            } else if (axis === 'x') {
                if (deltaX > 0) {
                    action = 'pullRight'
                } else if (deltaX < 0) {
                    action = 'pullLeft'
                }
            }
        }

        var isActiveAction = this.isActiveAction(action)

        if (isActiveAction && options.detectScroll && !state[DEFUALTOPTIONS.propMap[action]]) {
            Object.assign(state, this.getScrollInfo())
            if (state[DEFUALTOPTIONS.propMap[action]]) {
                deltaX = 0
                deltaY = 0
            }
        }

        var isActiveAndEnging = isActiveAction && state[DEFUALTOPTIONS.propMap[action]]

        if (isActiveAndEnging) {
            translateX += COMMON.transformValueByDamping(deltaX, options.damping)
            translateY += COMMON.transformValueByDamping(deltaY, options.damping)
        }

        Object.assign(state, {
            clientX: clientX,
            clientY: clientY,
            translateX: translateX,
            translateY: translateY,
            action: action,
            axis: axis,
        })

        if (!isActiveAndEnging) {
            return
        }

        if (!options.drag) {
            if (axis === 'y') {
                translateX = 0
            } else if (axis === 'x') {
                translateY = 0
            }
        }

        this.emit(DEFUALTOPTIONS.eventMap[action], {
            translateX: translateX,
            translateY: translateY,
        })

        if (this.isPreventDefault) {
            this.isPreventDefault = false
            return
        }

        if (options.wait) {
            this.isWaiting = true
        }

        event.preventDefault()
        this.setTranslate(translateX, translateY)
    }
    handleTouchEnd() {
        if (!this.isTouching) {
            return
        }
        this.isTouching = false

        var state = this.state
        var action = state.action
        if (!this.isActiveAction(action) || !state[DEFUALTOPTIONS.propMap[action]]) {
            return
        }

        this.emit(DEFUALTOPTIONS.eventMap[action] + 'End', {
            translateX: state.translateX,
            translateY: state.translateY,
        })

        if (this.isPreventDefault) {
            this.isPreventDefault = false
            return
        }

        this.animateToOrigin()
    }
}

window.ToutchElement = ToutchElement;