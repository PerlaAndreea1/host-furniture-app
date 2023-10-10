<template>
  <div
    class="draggable-image"
    :style="{ top: top + 'px', left: left + 'px' }"
    @mousedown="startDragging"
    @mousemove="dragImage"
    @mouseup="stopDragging"
    @dragstart="preventDrag"
  >
    <img :src="imageUrl" :style="{ height: height + 'px', width: width + 'px' }" draggable="false" />
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
  methods: {
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
