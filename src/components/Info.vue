<template>
  <div id="container3">
      <b>Empire Name: </b> 
      <label> {{empireName}} </label>
      <br>

      <b>Information: </b>
      <label> {{information}} </label>
  </div>
</template>

<script>

export default {
  name: 'Info',
  computed: {
    empireName() {
      return this.$store.state.empireName
    },
    information() {
      return this.$store.state.information
    }

  }
}

</script>

<style scoped>
#container3 {
  width: 100%;
  height: 100%;
  font-size: 30px;
}
</style>
