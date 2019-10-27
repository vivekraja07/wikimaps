<template>
    <div id="app">
        <Edit/>
    </div>
</template>

<script>
import Edit from './views/Edit.vue'

export default {
    name: 'App',
    components: { 
      Edit    
    }
};
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.esri-ui-bottom-left,.esri-time-slider {
  width: 100%;
}
</style>