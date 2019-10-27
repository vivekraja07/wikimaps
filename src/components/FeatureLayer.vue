<template>
  <div id=top>
    <div id="featureLayers">
    </div>

    <div id ="bottom">
        <button id = "myButton" type="button"> Add Feature Layer</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'FeatureLayer'
}
</script>

<style scoped>
  #top {
    font-size: 30px;
      height: 100%;
      width: 100%;
  }

  button {
    font-size: 30px;
    width: 100%;
  }


    #featureLayers {
        height: 90%;
        width: 100%;
    }
</style>
