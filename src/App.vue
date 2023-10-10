<template lang="pug">
  #app
    router-link(to='/') 
      el-button.buttons(type="info") Furnish Various Rooms
    router-link(to='/custom-design')
      el-button.buttons(type="info") Custom Room Design
    router-view
</template>

<script>

export default {
  name: 'App',
}
</script>

<style scoped>
.buttons{
	margin-bottom: 10px;
	margin-right: 10px;
}
</style>
