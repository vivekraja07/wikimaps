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
      "esri/widgets/TimeSlider",
      "esri/views/layers/support/FeatureFilter"
       ], { css: true })
    .then(([ArcGISMap, MapView, FeatureLayer, Editor, TimeSlider, FeatureFilter]) => {    
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
        //view: this.view,
        mode: "instant"
      });
      
      this.view.ui.add(editor, "top-right")
      this.view.ui.add(timeSlider, "bottom-left")

      let timeLayerView;
      this.view.whenLayerView(layer).then(function(layerView) {

          timeLayerView = layerView;
          const fullTimeExtent = layer.timeInfo.fullTimeExtent;
          //const start = fullTimeExtent.start;
          //const end = fullTimeExtent.end;

          // set up time slider properties based on layer timeInfo
          timeSlider.fullTimeExtent = fullTimeExtent;
          timeSlider.fullTimeExtent = {
            start: new Date(2019,8,1),
            end: new Date(2020, 1, 1)
          };
          timeSlider.values = [new Date(2019, 9, 2)];
          timeSlider.stops = {
            interval: layer.timeInfo.interval
          };
    });

    timeSlider.watch("timeExtent", function(value){
      if (value != null) {
          let whereStr = "startYear < "+ value.start.getTime() + " AND " + "endYear > " + value.start.getTime();
          
          console.log(whereStr);
          
          timeLayerView.filter = new FeatureFilter({
            where: whereStr
          });
      }
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