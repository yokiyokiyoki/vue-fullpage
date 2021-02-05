<template>
  <div id="app">
    <fullpage ref='fullpage' >
      <div slot='section' class="section">
          <div ref='chart1' class='chart-box'></div>
      </div>
      <div slot='section' class="section" >
         <div ref='chart2' class='chart-box'></div>
      </div>
      <div slot='section' class="section" >
         <div ref='chart3' class='chart-box'></div>
      </div>
      <div slot='section' class="section" >
         <div ref='chart4' class='chart-box'></div>
         <button @click='handleClick'>back</button>
      </div>
    </fullpage>
  </div>
</template>
<script>
const echarts = require('echarts');
import fullpage from './components/fullpage'
export default {
  components:{
    fullpage
  },
  mounted(){
    this.setChart(this.$refs['chart1'])
    this.setChart(this.$refs['chart2'])
    this.setChart(this.$refs['chart3'])
    this.setChart(this.$refs['chart4'])
    /* eslint-disable */
    console.log(this.$refs['fullpage'])
  },
  methods:{
    handleClick(){
      this.$refs['fullpage'].move(1)
    },
    setChart(dom){
      var myChart = echarts.init(dom);
      var option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.section{
  color: white;
}

.chart-box{
  height: 100vh;
  width:100vw;
}
</style>
