<template lang="pug">
.room
  el-select(v-model="selectedImage" placeholder='Select Furniture')
    el-option(v-for="(option, index) in availableImages" :key="index" :label='option.name' :value="index") {{ option.name }}
  el-button(@click="addImageToScene") Add Selected Image
  el-button(@click="deleteImage") Delete Selected Image
  // Render the room background
  img.room-background(:src="roomBackground")
  
  // Draggable images based on the room
  draggable-image(
    v-for="(image, index) in images"
    :key="index"
    :image-url="image.src"
    :top="image.top"
    :left="image.left"
    :height="image.height"
    :width="image.width"
    @updatePosition="updateImagePosition(index, $event)"
  )
</template>

<script>
import DraggableImage from './DraggableImage.vue';
export default {
  name: 'CustomDesign',
	components: {
    DraggableImage,
  },
  props: {
    msg: String,
		room2: String,
  },
	data() {
      return {
				roomBackground: "https://png.pngtree.com/png-vector/20220723/ourmid/pngtree-empty-room-interior-for-gallery-exhibition-vector-png-image_6047393.png",
				images: [],
          availableImages:[
          {
            name: 'Hanging Lamp',
						src: 'https://www.pngmart.com/files/16/Electric-Hanging-Lamp-Transparent-PNG.png',
						top: 30,
						left: 700,
						height: 300,
						width: 300,
					},
          {
            name: 'Picture',
						src: 'https://www.pngmart.com/files/22/Landscape-Painting-Art-PNG-HD.png',
						top: 250,
						left: 900,
						height: 250,
						width: 250,
					},
					{
            name: 'Sofa',
						src: 'https://www.pngmart.com/files/7/Sleeper-Sofa-Transparent-Images-PNG.png',
						top: 500,
						left: 400,
						height: 300,
						width: 600,
					},
					{
            name: 'Table',
						src: 'https://www.pngmart.com/files/7/Drum-Table-PNG-Image.png',
						top: 550,
						left: 1200,
						height: 300,
						width: 300,
					},
					{
            name: 'Armchair',
						src: 'https://www.pngmart.com/files/8/Armchair-PNG-Image.png',
						top: 580,
						left: 0,
						height: 400,
						width: 500,
					},
					{
            name: 'Plant',
						src: 'https://www.pngmart.com/files/13/Aloe-Vera-Potted-PNG-Pic.png',
						top: 580,
						left: 1000,
						height: 200,
						width: 150,
					},
				],
        selectedImage: '',
        isDraggingBackground: false,
        backgroundStartX: 0,
        backgroundStartY: 0,
        isDraggingImage: false,
        imageStartX: 0,
        imageStartY: 0,
      }
    },

  methods: {
    updateImagePosition(index, newPosition) {
      // Update the position of the image in the data array
      this.images[index].top = newPosition.top;
      this.images[index].left = newPosition.left;
    },
    addImageToScene() {
      if (this.selectedImage !== '') {
        const selectedImage = this.availableImages[this.selectedImage];
        const isDuplicate = this.images.some((image) => {
          return (
            image.src === selectedImage.src &&
            image.top === selectedImage.top &&
            image.left === selectedImage.left &&
            image.height === selectedImage.height &&
            image.width === selectedImage.width
          );
        });
        if (!isDuplicate) {
          const newImage = {
            ...selectedImage, 
          };
          this.images.push(newImage);
        }
      }
    },
    deleteImage() {
      if (this.selectedImage !== '') {
        const index = this.images.findIndex((image) => {
          return (
            image.src === this.availableImages[this.selectedImage].src
          );
        });

        if (index !== -1) {
          this.images.splice(index, 1);
        }
      }
    }
  }
}
</script>

<style scoped>

.room {
  position: relative;
  width: 100%;
  height: 100%;
}

.room-background {
  width: 90%;
  object-fit: cover; /* Adjust as needed for background images */
}

.draggable-image {
  position: absolute;
  cursor: grab;
  user-select: none;
}
</style>