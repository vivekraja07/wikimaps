<template>
  <div id="container">
     <div class="toggle">

        <div class = "buttons">
          <div>
            <input type="radio" id="one" value="Info" v-model="pick" @input="blur">
            <label for="one">Info</label>
          </div>
          <div>
            <input type="radio" id="two" value="IFrame" v-model="pick" @input="blur">
            <label for="two">Wiki</label>
          </div>
          <div>
            <input type="radio" id="three" value="FeatureLayer" v-model="pick" @input="blur">
            <label for="three">Map-Type</label>
          </div>
        </div>

      </div>

    <div class="main">
        <keep-alive>
          <component :is="pick"/>
        </keep-alive>
    </div>
  </div>
</template>

<script>
import IFrame from '@/components/IFrame.vue'
import Info from '@/components/Info.vue'
import FeatureLayer from '@/components/FeatureLayer.vue'

export default {
  name: 'LeftSide',
  components: {
    IFrame,
    Info,
    FeatureLayer
  },
  data: function() {
    return {
       pick: 'FeatureLayer'
    }
  },
  methods: {
    blur: function (event) {
      event.target.blur();
      console.log(this.IFrame)
      console.log(this.Info)
      console.log(this.FeatureLayer)
    }
  }
}

</script>

<style scoped>

#container {
  width: 100%;
  height: 90%;
  display: inline-block;
  vertical-align: top;
  font-size: 1rem;
}

.toggle {
  width: 100%;
  height: 10%;

  background: black;
  color: white;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  font-size: 30px;
  width: 100%;

}

.main {
  width: 100%;
  height: 90%;
}

</style>




