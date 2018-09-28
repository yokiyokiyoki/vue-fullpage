<template>
  <div id="app">
    <fullpage >
      <div slot='section' class="section-one">
          1
      </div>
      <div slot='section' class="section-two" >
          2
      </div>
    </fullpage>
  </div>
</template>
<script>
import fullpage from './components/fullpage'
export default {
  components:{
    fullpage
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
.section-one {
  background: black;
  color: white;
}
.section-two {
  background: blue;
  color: white;
}
</style>
