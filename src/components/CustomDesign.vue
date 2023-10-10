<template lang="pug">
.room  
  .instructions
    p To move a furniture item, click and drag it to the desired position.
  // Render the room background (e.g., Living Room, Bedroom, etc.)
  // Render draggable images based on the room
  img.room-background(:src="roomBackground")
  draggable-image(v-for='(image, index) in images' :key='index' :image-url='image.src' :top='image.top' :left='image.left' :height='image.height' :width='image.width' @updatePosition='updateImagePosition(index, $event)')

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
				images: [
					// Define the initial position and dimensions of each image based on the room
          {
						src: 'https://www.pngmart.com/files/22/Landscape-Painting-Art-PNG-HD.png',
						top: 250,
						left: 900,
						height: 250,
						width: 250,
					},
          {
						src: 'https://www.pngmart.com/files/16/Electric-Hanging-Lamp-Transparent-PNG.png',
						top: 30,
						left: 700,
						height: 300,
						width: 300,
					},
					{
						src: 'https://www.pngmart.com/files/7/Sleeper-Sofa-Transparent-Images-PNG.png',
						top: 500,
						left: 400,
						height: 300,
						width: 600,
					},
					{
						src: 'https://www.pngmart.com/files/7/Drum-Table-PNG-Image.png',
						top: 550,
						left: 1200,
						height: 300,
						width: 300,
					},
					{
						src: 'https://www.pngmart.com/files/8/Armchair-PNG-Image.png',
						top: 580,
						left: 0,
						height: 400,
						width: 500,
					},
					{
						src: 'https://www.pngmart.com/files/13/Aloe-Vera-Potted-PNG-Pic.png',
						top: 580,
						left: 1000,
						height: 200,
						width: 150,
					},

         
				],
      }
    },

    methods:{
		updateImagePosition(index, newPosition) {
			// Update the position of the image in the data array
			this.images[index].top = newPosition.top;
			this.images[index].left = newPosition.left;
		},
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