<template>
  <div class="home">
    <SidePanel id="side"/>
    <edit-map id="map"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SidePanel from '@/components/SidePanel.vue'
import EditMap from '@/components/EditMap.vue'

export default {
  name: 'home',
  components: {
    SidePanel,
    EditMap
  }
}
</script>

<style scoped>
    .home {
        height: 100%;
        width: 100%;
        font-size: 0;
        display: flex;

    }

    #map {
      width: 55%;
    }

    #side {
      width: 45%;
    }

    * {box-sizing:border-box}
</style>
