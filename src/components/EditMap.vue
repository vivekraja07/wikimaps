<template>
  <div></div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'edit-map',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/layers/FeatureLayer",
      "esri/widgets/Editor" 
       ], { css: true })
    .then(([ArcGISMap, MapView, FeatureLayer, Editor]) => {    
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });

       var featureLayer = new FeatureLayer({
         url: "https://services5.arcgis.com/rQJwj1ctcaOp5BYz/arcgis/rest/services/wikimaps/FeatureServer/0"
       });

       map.add(featureLayer);
      //  map.add(graphicsLayer);

      this.view = new MapView({
        container: this.$el,
        map: map,
        center: [23.4162, 25.6628],
        zoom: 4
    
      });

      var editor = new Editor({
        view: this.view
      });
      
      this.view.ui.add(editor, "top-right")

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