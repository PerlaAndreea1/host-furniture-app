<template>
  <div
    class="draggable-image"
    :style="{ top: top + 'px', left: left + 'px', zIndex: zIndex }"
    @mousedown="startDragging"
    @mousemove="dragImage"
    @mouseup="stopDragging"
    @dragstart="preventDrag"
    @click.stop
  >
    <img :src="imageUrl" :style="{ height: height + 'px', width: width + 'px', transform: isFlipped ? 'scaleX(-1)' : '' }" draggable="false" />
    <div v-if="isOverlayVisible" class="overlay" ref="overlay">
      <el-button class="icon-button" @click="deleteImageButton">
        <i class="el-icon-delete"></i> <!-- Icon for delete -->
      </el-button>
      <el-button class="icon-button" @click="flipImage">
        <i class="el-icon-refresh"></i> <!-- Icon for flip -->
      </el-button>
      <el-button class="icon-button" @click="closeOverlay">
        <i class="el-icon-close"></i> <!-- Icon for close -->
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    imageUrl: String,
    top: Number,
    left: Number,
    height: Number,
    width: Number,
    zIndex: Number,
    room: String,
    deleteImage: Function, 
  },
  data() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      offsetX: 0,
      isFlipped: false,
      isOverlayVisible: false,
      offsetY: 0,
    };
  },
  watch: {
    // Watch changes in top and left properties
    top: 'updateOverlayVisibility',
    left: 'updateOverlayVisibility',
  },
  
  mounted() {
    document.addEventListener('click', this.closeMenuOnOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeMenuOnOutsideClick);
  },

  methods: {
    closeMenuOnOutsideClick(event) {
      const isClickInsideImage = this.$el.contains(event.target);
      const isClickInsideOverlay = this.$refs.overlay && this.$refs.overlay.contains(event.target);

      if (!isClickInsideImage && !isClickInsideOverlay) {
        this.closeOverlay();
      }
    },
    updateOverlayVisibility() {
      this.isOverlayVisible = true; // Show the overlay when the image is moved
    },
    showOverlay() {
      this.isOverlayVisible = true;
    },
    closeOverlay() {
      this.isOverlayVisible = false;
    },
    deleteImageButton() {
      this.$emit('delete-image', this.imageUrl); // Emit an event to trigger the deletion in the parent
      this.closeOverlay();
    },
    flipImage() {
      this.isFlipped = !this.isFlipped;
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px;
  align-items: center;
}

.overlay el-button {
  margin: 5px;
}

.icon-button {
  margin: 5px;
  width: 20px;
  height: 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>