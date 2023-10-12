<template lang="pug">
.room
  el-select(v-model="selectedImage" placeholder='Select Furniture' @change="updateOptions")
    el-option(v-for="(option, index) in availableImages" :key="index" :label='option.name' :value="index" ) {{ option.name }}
  el-select.options-dropdown(v-model="selectedOption", placeholder="Select Option")
    el-option(v-for="(option, index) in availableOptions" :key="index" :label='option.name' :value="index")
      div
        img(:src="option.src", alt="Option", width="32", height="32")
        | {{ option.name }}
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
    :zIndex="image.zIndex",
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
            name: 'Hanging Lamp'
					},
          {
            name: 'Picture',
					},
					{
            name: 'Sofa'
					},
					{
            name: 'Table',
					},
					{
            name: 'Armchair',
					},
					{
            name: 'Plant',
					},
				],
        availableOptions: [],
        selectedImage: '',
        selectedOption: '',
        isDraggingBackground: false,
        backgroundStartX: 0,
        backgroundStartY: 0,
        isDraggingImage: false,
        imageStartX: 0,
        imageStartY: 0,
      }
    },

  methods: {
    updateOptions() {
      if (this.selectedOption !== '')
        this.selectedOption = '';
      if (this.selectedImage !== '') {
        const selectedFurniture = this.availableImages[this.selectedImage];
        // Define options based on the selected furniture
        switch (selectedFurniture.name) {
          case 'Hanging Lamp':
            this.availableOptions = [
              {
                name: 'Modern Lamp',
                src: 'https://www.pngmart.com/files/7/Hanging-Light-PNG-HD.png',
                top: 40,
                left: 750,
                height: 200,
                width: 200,
                zIndex: 6,
              },
              {
                name: 'Vintage Lamp',
                src: 'https://www.pngmart.com/files/7/Hanging-Light-Transparent-Background.png',
                top: 20,
                left: 700,
                height: 300,
                width: 300,
                zIndex: 6,
              },
              {
                name: 'Antique Lamp',
                src: 'https://www.pngmart.com/files/7/Chandelier-PNG-Pic.png',
                top: 0,
                left: 700,
                height: 300,
                width: 300,
                zIndex: 6,
              },
            ];
            break;
          case 'Sofa':
            this.availableOptions = [
              {
                name: 'Yellow Sofa',
                src: 'https://www.pngmart.com/files/7/Yellow-Sofa-PNG-Photos.png',
                top: 400,
                left: 400,
                height: 500,
                width: 600,
                zIndex: 2,
              },
              {
                name: 'Blue Sofa',
                src: 'https://www.pngmart.com/files/7/Sofa-Bed-Transparent-Background.png',
                top: 400,
                left: 400,
                height: 550,
                width: 600,
                zIndex: 2,
              },
              {
                name: 'Cream Sofa',
                src: 'https://www.pngmart.com/files/7/Sleeper-Sofa-Transparent-Images-PNG.png',
                top: 500,
                left: 400,
                height: 300,
                width: 600,
                zIndex: 2,
              },
            ];
            break;
          case 'Picture':
            this.availableOptions = [
              {
                name: 'Landscape',
                src: 'https://www.pngmart.com/files/22/Landscape-Painting-Art-PNG-HD.png',
                top: 250,
                left: 900,
                height: 250,
                width: 250,
                zIndex: 1,
              },
              {
                name: 'Portrait',
                src: 'https://www.pngmart.com/files/22/Portrait-Art-PNG.png',
                top: 250,
                left: 900,
                height: 250,
                width: 200,
                zIndex: 1,
              },
              {
                name: 'Modern Art',
                src: 'https://www.pngmart.com/files/11/Modern-Art-Transparent-Background.png',
                top: 250,
                left: 900,
                height: 250,
                width: 250,
                zIndex: 1,
              },
            ];
            break;
          case 'Table':
            this.availableOptions = [
              {
                name: 'Modern Table',
                src: 'https://www.pngmart.com/files/7/Drum-Table-PNG-Image.png',
                top: 550,
                left: 1200,
                height: 300,
                width: 300,
                zIndex: 4,
              },
              {
                name: 'Metal Table',
                src: 'https://www.pngmart.com/files/7/Drum-Table-PNG-HD.png',
                top: 550,
                left: 1200,
                height: 300,
                width: 300,
                zIndex: 4,
              },
              {
                name: 'Wooden Table',
                src: 'https://www.pngmart.com/files/7/Drum-Table-PNG-Background-Image.png',
                top: 600,
                left: 1100,
                height: 200,
                width: 300,
                zIndex: 4,
              },
            ];
            break;
          case 'Armchair':
            this.availableOptions = [
              {
                name: 'Blue Armchair',
                src: 'https://www.pngmart.com/files/8/Armchair-PNG-Image.png',
                top: 580,
                left: 0,
                height: 400,
                width: 500,
                zIndex: 3,
              },
              {
                name: 'Brown Armchair',
                src: 'https://www.pngmart.com/files/8/Armchair-PNG-File.png',
                top: 580,
                left: 0,
                height: 400,
                width: 400,
                zIndex: 3,
              },
              {
                name: 'Gray Armchair',
                src: 'https://www.pngmart.com/files/3/Armchair-PNG-Image.png',
                top: 580,
                left: 0,
                height: 400,
                width: 500,
                zIndex: 3,
              },
            ];
            break;
          case 'Plant':
            this.availableOptions = [
              {
                name: 'Aloe Vera',
                src: 'https://www.pngmart.com/files/13/Aloe-Vera-Potted-PNG-Pic.png',
                top: 580,
                left: 1000,
                height: 200,
                width: 150,
                zIndex: 5,
              },
              {
                name: 'Pothos',
                src: 'https://www.pngmart.com/files/21/Aesthetic-Plant-PNG-Free-Download.png',
                top: 580,
                left: 1000,
                height: 200,
                width: 150,
                zIndex: 5,
              },
              {
                name: 'Palm Tree',
                src: 'https://www.pngmart.com/files/22/Plant-PNG.png',
                top: 400,
                left: 1000,
                height: 400,
                width: 200,
                zIndex: 5,
              },
            ];
            break;
          default:
            this.availableOptions = []; // Reset options
            break;
        }
      } else {
        this.availableOptions = []; // Reset options if no furniture selected
      }
    },
    updateImagePosition(index, newPosition) {
      // Update the position of the image in the data array
      this.images[index].top = newPosition.top;
      this.images[index].left = newPosition.left;
    },
    addImageToScene() {
      if (this.selectedImage !== '' && this.selectedOption !== '') {
        const selectedFurniture = this.availableImages[this.selectedImage];
        const selectedOption = this.availableOptions[this.selectedOption];

        // Check if an image with the same furniture type already exists in the scene
        const existingImageIndex = this.images.findIndex((image) => {
          return image.name.startsWith(selectedFurniture.name);
        });

        if (existingImageIndex !== -1) {
          // If an image of the same furniture type exists, replace it
          this.images.splice(existingImageIndex, 1);
        }

        const newImage = {
          name: `${selectedFurniture.name} - ${selectedOption.name}`,
          src: selectedOption.src,
          top: selectedOption.top,
          left: selectedOption.left,
          height: selectedOption.height,
          width: selectedOption.width,
          zIndex: selectedOption.zIndex,
        };

        this.images.push(newImage);
      }
    },
    deleteImage() {
      if (this.selectedImage !== '') {
        const selectedFurniture = this.availableImages[this.selectedImage].name;

        this.images = this.images.filter((image) => !image.name.startsWith(selectedFurniture));
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