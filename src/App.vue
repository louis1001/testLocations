<template>
  <div id="app">
    <h1>Un mapa de todos tus amigos!</h1>
    <leafmap/>
  </div>
</template>

<script>
import Map from './components/Map'

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {},
  components: {
    'leafmap': Map
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
