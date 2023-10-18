<template lang="pug">
  div.image-menu(:style="{ display: isMenuOpen ? 'block' : 'none' }")
    el-button(@click="deleteImage") Delete
    el-button(@click="flipImage") Flip
    el-button(@click="closeMenu") Close
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: true,
    };
  },
  methods: {
    deleteImage() {
      this.$emit('deleteImage');
      this.closeMenu();
    },
    flipImage() {
      this.$emit('flipImage');
      this.closeMenu();
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>

.image-menu {
  position: absolute;
  top: 0; /* Adjust as needed */
  left: 100%; /* Adjust as needed */
  display: block;
  background: #fff;
  border: 1px solid #ccc;
  padding: 5px;
}
</style>