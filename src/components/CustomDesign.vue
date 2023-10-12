<template lang="pug">
  .room
    el-select(v-model="selectedImage" placeholder='Select Furniture')
      el-option(v-for="(option, index) in availableImages" :key="index" :label='option.name' :value="index") {{ option.name }}
    el-button(@click="openDialog") Choose Image
    el-button(@click="deleteImage") Delete Selected Image
    // Render the room background
    img.room-background(:src="roomBackground")

    // Render dialog for each furniture item
    el-dialog(
      v-for="(option, index) in availableImages",
      :key="option.id",
      :visible.sync="dialogVisible[index]",
      title="Select a Picture",
      width="30%"
      @closed="closeDialog(index)"
    )
      div
        el-radio(v-for="(picture, picIndex) in option.pictures", :key="picture.id", v-model="selectedFurnitureImage[index]", @click="addPictureToScene(index, picIndex)")
          img(:src="picture.src", alt="Furniture", style="width: 100px; cursor: pointer;" @click="selectImage(picIndex)")
        el-button(type="primary" @click="addImageToScene") Add Selected Image
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
      selectedFurnitureImage: [],
      availableImages: [
        {
          id: 'lamp_1',
          name: 'Hanging Lamp',
          top: 30,
          left: 700,
          height: 300,
          width: 300,
          pictures: [         
          {
            id: 'lamp_1_pic_1',
            src: 'https://www.pngmart.com/files/7/Hanging-Light-Transparent-Background.png'
          },
          {
            id: 'lamp_1_pic_2',
            src: 'https://www.pngmart.com/files/16/Hanging-Lamp-Transparent-Background.png'
          },
          {
            id: 'lamp_1_pic_3',
            src: 'https://www.pngmart.com/files/16/Electric-Hanging-Lamp-Transparent-PNG.png'
          },
          ],
        },
        {
          name: 'Frame',
          top: 250,
          left: 900,
          height: 250,
          width: 250,
          pictures: [
            'https://www.pngmart.com/files/5/Square-Frame-PNG-Pic.png',
            'https://www.pngmart.com/files/22/Landscape-Painting-Art-PNG-HD.png',
            'https://www.pngmart.com/files/11/Stylish-Frame-PNG-File.png',
          ],
        },
        {
          name: 'Sofa',
          top: 500,
          left: 400,
          height: 300,
          width: 600,
          pictures: [
            'https://www.pngmart.com/files/7/Hanging-Light-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Hanging-Lamp-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Electric-Hanging-Lamp-Transparent-PNG.png',
          ],
        },
        {
          name: 'Table',
          top: 550,
          left: 1200,
          height: 300,
          width: 300,
          pictures: [
            'https://www.pngmart.com/files/7/Hanging-Light-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Hanging-Lamp-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Electric-Hanging-Lamp-Transparent-PNG.png',
          ],
        },
        {
          name: 'Armchair',
          top: 580,
          left: 0,
          height: 400,
          width: 500,
          pictures: [
            'https://www.pngmart.com/files/7/Hanging-Light-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Hanging-Lamp-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Electric-Hanging-Lamp-Transparent-PNG.png',
          ],
        },
        {
          name: 'Plant',
          top: 580,
          left: 1000,
          height: 200,
          width: 150,
          pictures: [
            'https://www.pngmart.com/files/7/Hanging-Light-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Hanging-Lamp-Transparent-Background.png',
            'https://www.pngmart.com/files/16/Electric-Hanging-Lamp-Transparent-PNG.png',
          ],
        },
      ],
      selectedImage: null,
      isDraggingBackground: false,
      backgroundStartX: 0,
      backgroundStartY: 0,
      isDraggingImage: false,
      imageStartX: 0,
      imageStartY: 0,
      dialogVisible: [],
    };
  },
  created() {
    // Check if availableImages is defined before accessing its length
    if (this.availableImages) {
      this.dialogVisible = Array(this.availableImages.length).fill(false);
    } else {
      this.dialogVisible = []; // Set it to an empty array as a fallback
    }
  },

  methods: {

    addSelectedImage(index) {
      if (this.selectedFurnitureImage[index] !== null) {
        this.addPictureToScene(index, this.selectedFurnitureImage[index]);
      }
    },
    openDialog() {
      // Open the dialog for the selected furniture item
      this.dialogVisible[this.selectedImage] = true;
    },
    closeDialog(index) {
      this.dialogVisible[index] = false;
      this.selectedFurnitureImage[index] = null;
    },
    selectImage(index) {
      this.selectedFurnitureImage = index;
    },
    updateImagePosition(index, newPosition) {
      // Update the position of the image in the data array
      this.images[index].top = newPosition.top;
      this.images[index].left = newPosition.left;
    },
    addPictureToScene(furnitureIndex, pictureIndex) {
      // Add the selected picture to the room
      this.images.push({
        src: this.availableImages[furnitureIndex].pictures[pictureIndex].src,
        top: 0,
        left: 0,
        height: 100,
        width: 100,
      });

      // Close the dialog after selecting a picture
      this.dialogVisible[furnitureIndex] = false;
    },
    openFurnitureDialog(index) {
      // Open the dialog for the selected furniture item\
      this.dialogVisible[index] = true;
    },
    addImageToScene() {
      if (this.selectedImage !== '') {
        const selectedImage = this.availableImages[this.selectedImage];
        const isDuplicate = this.images.some((image) => {
          return (
            image.name === selectedImage.name &&
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
          return image.name === this.availableImages[this.selectedImage].name;
        });

        if (index !== -1) {
          this.images.splice(index, 1);
        }
      }
    },
  },
};
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