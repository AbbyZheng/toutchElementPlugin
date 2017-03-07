/**
 * Created by zhengfeiling on 17/3/1.
 */
import {warn} from './warning'
export const getElem = (elem)=>{
    return typeof elem === 'string' ? document.querySelector(elem) : elem
}

export const createElem = (elem)=>{
    return typeof elem === 'string' ? document.createElement(elem) : elem
}

export const isNumber = (obj)=>{
    return typeof obj === 'number' && !isNaN(obj)
}

export const isFunction = (obj)=>{
    return typeof obj === 'function'
}

export const getScrollEndingInfo = (scroller, isGlobalScroller)=>{
    var scrollTop, scrollLeft, offsetWidth, offsetHeight
    var scrollWidth = scroller.scrollWidth
    var scrollHeight = scroller.scrollHeight

    if (isGlobalScroller) {
        var documentElement = document.documentElement
        var documentBody = document.body
        offsetWidth = documentElement.clientWidth
        offsetHeight = documentElement.clientHeight
        scrollTop = documentBody.scrollTop || documentElement.scrollTop
        scrollLeft = documentBody.scrollLeft || documentElement.scrollLeft
    } else {
        offsetWidth = scroller.offsetWidth
        offsetHeight = scroller.offsetHeight
        scrollTop = scroller.scrollTop
        scrollLeft = scroller.scrollLeft
    }

    return {
        isScrollTopEnd: scrollTop <= 0,
        isScrollBottomEnd: offsetHeight + scrollTop >= scrollHeight,
        isScrollLeftEnd: scrollLeft <= 0,
        isScrollRightEnd: offsetWidth + scrollLeft >= scrollWidth,
    }
}

export const addEvent = (elem, type, handler, options)=>{
    elem.addEventListener(type, handler, options)
}

export const removeEvent = (elem, type, handler)=>{
    elem.removeEventListener(type, handler)
}

export const getCoor = (event)=>{
    var targetEvent = event.touches[0]
    return {
        x: targetEvent.clientX,
        y: targetEvent.clientY,
    }
}

export const transformValueByDamping = (value, damping)=>{
    if (isFunction(damping)) {
        return damping(value)
    }
    if (isNumber(damping)) {
        return value / damping
    }
    return value
}

export const getTranslateStyle = (translateX, translateY)=>{
    var translateValue = 'translate(' + translateX + 'px,' + translateY + 'px) translateZ(0)'
    return {
        transform: translateValue,
        webkitTransform: translateValue,
    }
}
