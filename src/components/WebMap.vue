<template>
  <div></div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'web-map',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/Layer"], { css: true })
    .then(([ArcGISMap, MapView, Layer]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });

      this.view = new MapView({
        container: this.$el,
        map: map,
        center: [-118, 34],
        zoom: 8
    
      });

      var trailheadsPortalItem = Layer.fromPortalItem({
        portalItem: {
          id: "45dd30b0ded249ec87b2d5751e3fc419"
        }
      });

      function addLayer(layerItemPromise, index) {
        return layerItemPromise.then(function(layer){
          map.add(layer, index);
        });
      }

      addLayer(trailheadsPortalItem, 0)

    });
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
};

</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>