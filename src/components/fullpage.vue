<template>
    <div class="fullpage-container" ref='fullpage' >
            <div class="scroll-container" v-show='isShow' ref='scrollContainer' >
                <slot name='section'></slot>  
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return{
            fullpage:{
                current:1,
                isScrolling: false,
                // 返回鼠标滚轮的垂直滚动量
                deltaY:0,
                // 返回鼠标滚轮的横向滚动量
                deltaX:0
            },
            isShow:false,
        }
    },
    mounted() {
        this.initFullPage()
        // 滚动事件绑定
        document.addEventListener('mousewheel',this.mouseWheelHandle)
        //窗口resize时候重新设计大小
        window.addEventListener('resize',this.resizeEventHandler)

    },
    beforeDestroy() {
        // 滚动事件解绑
        document.removeEventListener('mousewheel',this.mouseWheelHandle)
        window.removeEventListener("resize", this.resizeEventHandler, false);
    },
    methods:{
        resizeEventHandler(){
            //节流,考虑效率
            throttle(this.initFullPage(),300)
        },
        initFullPage(){
            //初始化容器高度
            let height = this.$refs['fullpage'].clientHeight;
            this.isShow=false
            //手动设置slots里面为section的
            this.$slots.section.forEach((item)=>{
                item.elm.style.height=`${height}px`
            })
            //显示滚动盒子
            this.isShow=true
        },
        next() {
            let len = this.$slots.section.length;
            if((this.fullpage.current + 1) <= len) {
                this.fullpage.current += 1;
                this.move(this.fullpage.current);
            }
        },
        pre() {
            if(this.fullpage.current -1 > 0) {
                this.fullpage.current -= 1;
                this.move(this.fullpage.current);
            }
        },
        move(index) {
            // 为了防止滚动多次滚动，需要通过一个变量来控制是否滚动
            let height = this.$refs['fullpage'].clientHeight;
            let $scroll = this.$refs['scrollContainer'];
            this.fullpage.isScrolling = true;
            let di = -(index-1)*height + 'px';
            $scroll.style.transform=`translateY(${di})`
            this.$emit('leaveSlide',{currentIndex:this.fullpage.current})
            //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
            setTimeout(()=>{
                this.fullpage.isScrolling = false;
            }, 1010);
        },
        mouseWheelHandle (event) {
            if (this.fullpage.isScrolling) {// 加锁部分
                return false;
            }
            let e = event.originalEvent || event;
            this.fullpage.deltaY = e.deltaY;
            if (this.fullpage.deltaY > 0) {
                this.next();
            } else if (this.fullpage.deltaY < 0) {
                this.pre();
            }
        },
        setAllowScrolling(isAllow){
            if(isAllow){
                document.addEventListener('mousewheel',this.mouseWheelHandle)
            }else{
                document.removeEventListener('mousewheel',this.mouseWheelHandle)
            }
        }
    }
}
function throttle(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

</script>
<style  scoped>
.fullpage-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.scroll-container {
  transition: all ease 1s;
}
</style>