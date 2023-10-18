<template>
  <div
    class="draggable-image"
    :style="{ top: top + 'px', left: left + 'px', zIndex: zIndex }"
    @mousedown="startDragging"
    @mousemove="dragImage"
    @mouseup="stopDragging"
    @dragstart="preventDrag"
    @contextmenu.prevent="openMenu"
  >
    <img :src="imageUrl" :style="{ height: height + 'px', width: width + 'px' }" draggable="false" />
    <image-menu v-if="isMenuOpen" />
  </div>
</template>

<script>
import ImageMenu from './ImageMenu.vue'; // Import your menu component

export default {
  components: {
    ImageMenu,
  },
  props: {
    imageUrl: String,
    top: Number,
    left: Number,
    height: Number,
    width: Number,
    zIndex: Number,
    room: String,
  },
  data() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
    };
  },
  
  mounted() {
    document.addEventListener('click', this.closeMenuOnOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeMenuOnOutsideClick);
  },

  methods: {
    openMenu(event) {
      event.preventDefault(); // Prevent the default context menu
      this.isMenuOpen = true;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    closeMenuOnOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.closeMenu();
      }
    },
    startDragging(event) {
      this.isDragging = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
    },
    dragImage(event) {
      if (this.isDragging) {
        this.offsetX = event.clientX - this.startX;
        this.offsetY = event.clientY - this.startY;
        this.startX = event.clientX;
        this.startY = event.clientY;

        // Update the image's position
        this.$emit('updatePosition', {
          top: this.top + this.offsetY,
          left: this.left + this.offsetX,
        });
      }
    },
    stopDragging() {
      this.isDragging = false;
    },
    preventDrag(event) {
      // Prevent the default browser drag-and-drop behavior
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
.draggable-image {
  position: relative;
}

</style>