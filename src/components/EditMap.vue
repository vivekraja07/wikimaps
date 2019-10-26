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
      "esri/widgets/Editor",
      "esri/widgets/TimeSlider"
       ], { css: true })
    .then(([ArcGISMap, MapView, FeatureLayer, Editor, TimeSlider]) => {    
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });

       var featureLayer = new FeatureLayer({
         url: "https://services5.arcgis.com/rQJwj1ctcaOp5BYz/arcgis/rest/services/wikimaps/FeatureServer/0",
         popupEnabled: true,
         popupTemplate: {
           title: "Details",
           content: "This is the content of the region"
         }
       });
      
      var layer = featureLayer;
       
     
       map.add(featureLayer);
      //  map.add(graphicsLayer);

      this.view = new MapView({
        container: this.$el,
        map: map,
        center: [23.4162, 25.6628],
        zoom: 4
    
      });

      var editor = new Editor({
        view  : this.view
      });

      var timeSlider = new TimeSlider({
        view: this.view,
        mode: "cumulative-from-start"
      });
      
      this.view.ui.add(editor, "top-right")
      this.view.ui.add(timeSlider, "bottom-left")

      let timeLayerView;
      this.view.whenLayerView(layer).then(function(layerView) {
      timeLayerView = layerView;
      const fullTimeExtent = layer.timeInfo.fullTimeExtent;
      const start = fullTimeExtent.start;

      // set up time slider properties based on layer timeInfo
      timeSlider.fullTimeExtent = fullTimeExtent;
      timeSlider.values = [start];
      timeSlider.stops = {
        interval: layer.timeInfo.interval
      };
    });

    timeSlider.watch("timeExtent", function(value){
      // update layer view filter to reflect current timeExtent
      timeLayerView.filter = {
        timeExtent: value
      };
});

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