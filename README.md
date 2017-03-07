手机各种toutch事件效果插件

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# build文件夹为打包生成文件夹
```
#用法 onPullDown:下拉刷新,type:function;  onPullUp:上拉加载;   onPullRight:向右滑动;   onPullLeft:向左滑动
eventMap = ['onPullDown','onPullUp','onPullRight','onPullLeft']

let pullDown = new toutchElement({
    target: '#demo',
    scroller: '#main',
    detectScroll: true,
    onPullDown({ translateY }) {

    },
    onPullDownEnd({ translateY }) {

    }
})
pullDown.init()