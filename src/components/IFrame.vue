<template>
  <div id="container2">
     <iframe :src="link" :title="empireName" width="100%" height="100%">
          <p>Your browser does not support iframes.</p>
        </iframe> 
  </div>
</template>

<script>

export default {
  name: 'LeftSide',
  computed: {
    link() {
     console.log(this.$store.state.link)
      return this.$store.state.link
    },
    empireName() {
      return this.$store.state.empireName
    }
  }
}

</script>

<style scoped>
#container2 {
  width: 100%;
  height: 100%;
}
</style>
