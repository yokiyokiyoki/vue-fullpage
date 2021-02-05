# vue-fullpage

![image](https://img.shields.io/badge/vue-2.5.17-blue.svg)
![image](https://img.shields.io/badge/vue--cli-3.0.0-green.svg)

> A Vue.js components

## Install

```
$ npm install v-fullpage
```

## Usage

```javascript
import Vue from "vue";
import fullpage from "v-fullpage";

Vue.use(fullpage);
```

or

```html
<script src="vue.min.js"></script>
<!-- use vue2 -->
<!-- <script src="https://cdn.bootcss.com/vue/2.2.1/vue.js"></script> -->
<!-- must place this line after vue.js -->
<script src="v-fullpage.umd.min.js"></script>
<!-- download -->
<!-- <script src="https://github.com/yokiyokiyoki/vue-fullpage/blob/master/dist/v-fullpage.umd.min.js"></script> -->
```

## Demo

```html
<!-- default -->
<!-- 依赖于父级元素的大小，占满父级元素 -->
<v-fullpage>
  <div slot="section"></div>
  <div slot="section"></div>
</v-fullpage>
```

## Options

| Property  | Description                        |  Type  |  Default   |
| :-------: | ---------------------------------- | :----: | :--------: |
| direction | 滚动方向('vertical'或'horizontal') | String | 'vertical' |

### Callback

|    Name    | Description                |
| :--------: | -------------------------- |
| leaveSlide | 滑动之后，参数是当前 index |

### api

> 通过 ref 调用组件内部 api

|       Name        | Description                            |
| :---------------: | -------------------------------------- |
| setAllowScrolling | 传入 true/false，禁止滚动/开放滚动事件 |
|       move        | 传入 index，移动到 index 页面          |

## License

MIT
