<template>
  <div id="app">
    <platform></platform>
  </div>
</template>

<script>
import platform from "./platform";

export default {
  name: "App",
  components: {
    platform,
  },
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  background: #eee;
  display: flex;
  justify-content: center;
}
* {
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
