<template>
  <div></div>
</template>

<script>
import { loadModules } from 'esri-loader';
import { mapActions } from 'vuex'


export default {
  name: 'edit-map',
  
  methods: {
    ...mapActions([
      'linkSet',
      'empireNameSet',
      'informationSet'
    ])
  },
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/layers/FeatureLayer",
      "esri/widgets/Editor",
      "esri/widgets/TimeSlider",
      "esri/views/layers/support/FeatureFilter",
      "esri/widgets/LayerList",
      "esri/widgets/Expand",
       ], { css: true })
    .then(([ArcGISMap, MapView, FeatureLayer, Editor, TimeSlider, FeatureFilter, LayerList, Expand]) => {    
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });

      var renderer = {
        type: "unique-value",  // autocasts as new UniqueValueRenderer()
        // field: "OBJECTID",
        valueExpression: "When($feature.OBJECTID % 10 == 0, '1', " +
        "$feature.OBJECTID % 10 == 1, '2', " +
        "$feature.OBJECTID % 10 == 2, '3', " +
        "$feature.OBJECTID % 10 == 3, '4', " +
        "$feature.OBJECTID % 10 == 4, '5', " +
        "$feature.OBJECTID % 10 == 5, '6', " +
        "$feature.OBJECTID % 10 == 6, '7', " +
        "$feature.OBJECTID % 10 == 7, '8', " +
        "$feature.OBJECTID % 10 == 8, '9', " +
        "'10')",
        defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
        uniqueValueInfos: [{
          // All features with value of "North" will be blue
          value: "1",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "blue"
          }
        }, {
          // All features with value of "East" will be green
          value: "2",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "green"
          }
        }, {
          // All features with value of "South" will be red
          value: "3",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "red"
          }
        }, {
          // All features with value of "West" will be yellow
          value: "4",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "yellow"
          }
        },
        {
          // All features with value of "West" will be yellow
          value: "5",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "black"
          }
        },
        {
          // All features with value of "West" will be yellow
          value: "6",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "white"
          }
        },
        {
          // All features with value of "West" will be yellow
          value: "7",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "pink"
          }
        },
        {
          // All features with value of "West" will be yellow
          value: "8",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "purple"
          }
        },
        {
          // All features with value of "West" will be yellow
          value: "9",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "silver"
          }
        },
        {
          // All features with value of "West" will be yellow
          value: "10",
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: "orange"
          }
        }
        ]
      };

       var featureLayer = new FeatureLayer({
         url: "https://services5.arcgis.com/rQJwj1ctcaOp5BYz/arcgis/rest/services/wikimaps/FeatureServer/0",
         popupEnabled: true,
         popupTemplate: {
           title: "Details",
           content: "This is the content of the region"
         },
          outFields: ["startYear", "endYear", "wikiLink", "EmpireName", "Information"],
          renderer: renderer
       });

       var rlgLayer = new FeatureLayer({
         url: "https://services5.arcgis.com/rQJwj1ctcaOp5BYz/arcgis/rest/services/religionlayer/FeatureServer",
         popupTemplate: {
           title: "Details",
           content: "This is the content of the region"
         }
       });
      
      var layer = featureLayer;

      var layerArr = new Array();
      layerArr.push(featureLayer);
      layerArr.push(rlgLayer);
       
     
       map.add(featureLayer);
       map.add(rlgLayer);

      this.view = new MapView({
        container: this.$el,
        map: map,
        center: [23.4162, 25.6628],
        zoom: 2
    
      });
      

      var editor = new Editor({
        container: document.createElement("div"),
        view: this.view
      });

      var editorExpand = new Expand({
        expandIconClass: "esri-icon-edit",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
        view: this.view,
        content: editor.domNode
      });
      
      this.view.ui.add(editorExpand, "top-right");

            var timeSlider = new TimeSlider({
        //view: this.view,
        mode: "instant"
      });

      this.view.ui.add(timeSlider, "bottom-left")

      //let timeLayerView;
      //timeLayerView = new Array();
       
      this.view.whenLayerView(layer).then(function(layerView) {

          let timeLayerView = layerView;
          console.log(timeLayerView);
          const fullTimeExtent = layer.timeInfo.fullTimeExtent;
          //const start = fullTimeExtent.start;
          //const end = fullTimeExtent.end;

          // set up time slider properties based on layer timeInfo
          timeSlider.fullTimeExtent = fullTimeExtent;
          timeSlider.fullTimeExtent = {
             start: new Date(500,8,1),
             end: new Date(1200, 1, 1)
           };
          timeSlider.values = [new Date(1860, 9, 2)];
          timeSlider.stops = {
            interval: layer.timeInfo.interval
          };
      });
    var vw = this.view;
    
    let that = this
    var view = this.view
    this.view.on("click", function(event) {
      view.hitTest(event).then(function(response) {
        const graphic = response.results.filter(function(result) {
          return result.graphic.layer === featureLayer;
        })[0].graphic;
        const wiki = graphic.attributes.wikiLink;
        const information = graphic.attributes.Information;
        const empireName = graphic.attributes.EmpireName;
        
        that.linkSet(wiki)
        that.informationSet(information)
        that.empireNameSet(empireName)
      });
    });

    window.addEventListener("load", function(event) {
    // here is the Vue code
    var layerList = new LayerList({
      view: that.view,
      container: document.getElementById("featureLayers")
    })
    console.log(layerList)
    console.log(event)
  });
    
    
    timeSlider.watch("timeExtent", function(value){
      if (value != null) {
          let whereStr = "startYear < "+ value.start.getTime() + " AND " + "endYear > " + value.start.getTime();
          //whereStr = "EmpireName = A-1";
          console.log(whereStr);
          console.log(layerArr.length);
          //map.removeAll();
          for(var i = 0; i < layerArr.length; i++) {
            //alert(i);
            console.log("Working on: " + layerArr[i]);
            
            //layerArr[i].definitionExpression = whereStr;
            //map.add(layerArr[i]);
            //new FeatureFilter();
             
              vw.whenLayerView(layerArr[i]).then(function(lView) {
                lView.filter = new FeatureFilter({
                    where: whereStr
                });
              
              });
             
          }
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