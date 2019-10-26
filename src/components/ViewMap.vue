<template>
  <div>
      <div id="viewDiv"></div>
      <div id="timeSlider"></div>
  </div>
  
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'view-map',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/layers/FeatureLayer",
      "esri/widgets/TimeSlider"
       ], { css: true })
    .then(([ArcGISMap, MapView, FeatureLayer, TimeSlider]) => {    
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });

      

       var featureLayer = new FeatureLayer({
         url: "https://services5.arcgis.com/rQJwj1ctcaOp5BYz/arcgis/rest/services/wikimaps/FeatureServer/0",
         timeInfo: {
            startField: "Time", // name of the date field
            interval: { // specify time interval for
            unit: "days",
            value: 1
            }
         }
       });

       map.add(featureLayer);

      this.view = new MapView({
        container: this.$el,
        map: map,
        center: [23.4162, 25.6628],
        zoom: 4
      });

    // create a new TimeSlider widget
        // const timeSlider = new TimeSlider({
        //     container: "timeSlider",
        //     playRate: 50
        // });

        // this.view.ui.add(timeSlider, "manual");

        // this.view.whenLayerView(featureLayer).then(function(lv) {
            
        //     // start time of the TimeSlider - 5/25/2019
        //     const start = new Date(2019, 4, 25);
        //     const end = new Date(start);
        //     // end of current time extent for TimeSlider
        //     // showing earthquakes with one day interval
        //     end.setDate(end.getDate() + 1);

        //     // set TimeSlider's full extent to 5/25/5019 - until end date of layer's fullTimeExtent
        //     timeSlider.fullTimeExtent = {
        //         start: start,
        //         end: featureLayer.timeInfo.fullTimeExtent.end
        //     };
        //     // setting current time extent
        //     timeSlider.values = [start, end];

        //     // calculate stops for the TimeSlider
        //     // with one day interval for given full time extent
        //     timeSlider.createStopsByInterval(
        //         timeSlider.fullTimeExtent,
        //         {
        //         value: 1,
        //         unit: "hours"
        //         }
        //     );

            // timeSlider.watch("timeExtent", function() {
            //     // gray out earthquakes that are outside of the current timeExtent
            //     lv.effect = {
            //         filter: {
            //             timeExtent: timeSlider.timeExtent,
            //             geometry: this.view.extent
            //         },
            //         excludedEffect: "grayscale(20%) opacity(12%)"
            //     };
            // });

        // });

            

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
 /* #timeSlider {
        position: absolute;
        left: 100px;
        right: 100px;
        bottom: 30px;
      } */

div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>