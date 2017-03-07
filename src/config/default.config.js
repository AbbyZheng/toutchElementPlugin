/**
 * Created by zhengfeiling on 17/3/1.
 */
export const eventHandlerOptions = {
    passive: false,
}

export const emptyStyle = {
    transition: '',
    transform: '',
    webkitTransform: '',
    webkitTransition: '',
}

export const emptyTransitionStyle = {
    transition: '',
    webkitTransition: '',
}

export const eventMap = {
    pullDown: 'onPullDown',
    pullUp: 'onPullUp',
    pullRight: 'onPullRight',
    pullLeft: 'onPullLeft',
}

export const propMap = {
    pullDown: 'isScrollTopEnd',
    pullUp: 'isScrollBottomEnd',
    pullRight: 'isScrollLeftEnd',
    pullLeft: 'isScrollRightEnd',
}

export const defaultOffsetState = {
    action: '',
    axis: '',
    translateX: 0,
    translateY: 0,
}

export const defaultState = Object.assign({
    isScrollTopEnd: true,
    isScrollLeftEnd: true,
    isScrollBottomEnd: true,
    isScrollRightEnd: true,
    clientX: 0,
    clientY: 0,
},defaultOffsetState)

export const defaultOptions = {
    target: 'body',
    scroller: '',
    trigger: '',
    damping: 1.6,
    wait: true,
    pullUp: false,
    pullDown: false,
    pullLeft: false,
    pullRight: false,
    detectScroll: false,
    detectScrollOnStart: false,
    stopPropagation: false,
    drag: false,
    transitionProperty: 'transform',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
}

export const isSupportPromise = typeof Promise === 'function'