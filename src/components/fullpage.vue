<template>
    <div class="v-fullpage-container" ref='v-fullpage' @mousewheel='mouseWheelHandle' @DOMMouseScroll='mouseWheelHandle'>
            <div class="v-slide-container" :class="direction" ref='v-slide-container' v-show='isShow'>
                <slot name='section'></slot>  
            </div>
        </div>
</template>
<script>
export default {
    name:'v-fullpage',
    data(){
        return{
            fullpage:{
                current:1,
                isScrolling: false,
                // 返回鼠标滚轮的垂直滚动量
                deltaY:0,
            },
            isShow:false,
            isAllowScroll:true,
            api:{
              setAllowScrolling:this.setAllowScrolling
            }
        }
    },
    props:{
      direction:{
        type: String,
        default: 'vertical'//horizontal
      },
    },
    mounted() {
        this.initFullPage()
        //窗口resize时候重新设计大小
        window.addEventListener('resize',this.resizeEventHandler)
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.resizeEventHandler, false);
    },
    methods:{
        resizeEventHandler(){
            //节流,考虑效率
            throttle(this.initFullPage(),300)
        },
        initFullPage(){
            //初始化容器宽高度
            this.isShow=false
            let height = this.$refs['v-fullpage'].clientHeight;
            let width=this.$refs['v-fullpage'].clientWidth;
            this.direction=='horizontal'?this.$refs['v-slide-container'].style.width=`${width*this.$slots.section.length}px`:null;
            //手动设置slots里面为section的样式
            this.$slots.section.forEach((item)=>{
                item.elm.style.height=`${height}px`
                item.elm.style.width=`${width}px`
            })
            //显示滚动盒子
            this.isShow=true

            //如果index是其他，那么translate需要fix,when resize
            this.directToMove(this.fullpage.current)
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
            this.fullpage.isScrolling = true;
            this.directToMove(index)
            this.$emit('leaveSlide',{currentIndex:this.fullpage.current})
            //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
            setTimeout(()=>{
                this.fullpage.isScrolling = false;
            }, 1010);
        },
        directToMove(index){
          let height = this.$refs['v-fullpage'].clientHeight;
          let width=this.$refs['v-fullpage'].clientWidth;
          let $scroll = this.$refs['v-slide-container'];
          //位移多少
          let displacement 
          //判断是垂直滚动还是横向滚动
          if(this.direction=='vertical'){
            displacement = -(index-1)*height + 'px';
            $scroll.style.transform=`translateY(${displacement})`
          }else{
            displacement = -(index-1)*width + 'px';
            $scroll.style.transform=`translateX(${displacement})`
          }
          this.fullpage.current = index
        },
        mouseWheelHandle (event) {
            // 添加冒泡阻止
            let evt = event || window.event;
            if( evt.stopPropagation ) {
              evt.stopPropagation();
            } else {
              evt.returnValue = false;
            }

            if(!this.isAllowScroll){//是否可以滚动
              return
            }
            if (this.fullpage.isScrolling) {// 加锁部分
                return false;
            }
			
            let e = event.originalEvent || event;
            this.fullpage.deltaY = e.deltaY|| e.detail; // Firefox使用detail
            if (this.fullpage.deltaY > 0) {
                this.next();
            } else if (this.fullpage.deltaY < 0) {
                this.pre();
            }
        },
        setAllowScrolling(isAllow){
          this.isAllowScroll=isAllow
        },
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
.v-fullpage-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.v-slide-container {
  transition: all ease 1s;
}
.vertical {
  display: block;
}
.horizontal {
  display: inline-block;
}
</style>