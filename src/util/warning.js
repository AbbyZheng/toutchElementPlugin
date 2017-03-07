/**
 * Created by zhengfeiling on 17/3/1.
 */
export const warn = (msg)=>{
    return typeof console !== 'undefined' ? console.warn(`[toutchElement warn]:${msg}`) : ''
}
export const error = (msg)=>{
    return typeof console !== 'undefined' ? console.error(`[toutchElement warn]:${msg}`) : ''
}