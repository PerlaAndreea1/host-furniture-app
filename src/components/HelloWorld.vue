<template lang="pug">
#room
	#room-selector
		el-select(v-model='room' placeholder='Select Room')
			el-option(v-for='item in options' :key='item.value' :label='item.label' :value='item.value')
	.furniture-buttons
		el-button#table.btn.btn-default
			span(v-if="room=='Living Room'") Table
			span(v-if="room=='Bedroom'") Dresser
			span(v-if="room=='Kitchen'") Counters
			span(v-if="room=='Bathroom'") Sink
		el-button#sofa.btn.btn-default
			span(v-if="room=='Living Room'") Sofa
			span(v-if="room=='Bedroom'") Bed
			span(v-if="room=='Kitchen'") Fridge
			span(v-if="room=='Bathroom'") Toilet
		el-button#light.btn.btn-default
			span(v-if="room=='Living Room'") Light
			span(v-if="room=='Bedroom'") Lamp
			span(v-if="room=='Kitchen'") Garbage Can
			span(v-if="room=='Bathroom'") Mirror
		el-button#carpet.btn.btn-default
			span(v-if="room=='Living Room'") Carpet
			span(v-if="room=='Bedroom'") Bedside Table
			span(v-if="room=='Kitchen'") Dining Table
			span(v-if="room=='Bathroom'") Plant
		el-button(type="primary" v-if="room" @click="captureAndSave") Save Design
		el-button(type="danger" v-if="room" @click="clear") Clear
	div.images(ref='captureDiv')
		img#room(v-if="room=='Living Room'" src='../assets/pngtree-empty-room-interior-for-gallery-exhibition-vector-png-image_6047393.png')
		img#room(v-else-if="room=='Bedroom'" src='../assets/pngtree-empty-room-house-interior-after-renovation-vector-png-image_6047391.png')
		img#room(v-else-if="room=='Bathroom'" src='../assets/blank-space-clean-white-empty-bathroom-interior-toilet-shower-modern-home-design-background.jpg')
		img#room(v-else-if="room=='Kitchen'" src='../assets/5ed2be6eb0266ee0e43da9e1a36fb040.jpg')

		img#table1.table(v-if="room=='Living Room'" src='../assets/Coffee-Table-PNG-Image.png')
		img#table1.table(v-else-if="room=='Bedroom'" style="margin-top:300px;margin-left:450px;height:300px;width:300px;"  src='../assets/Dresser-PNG-HD.png')
		img#table1.table(v-else-if="room=='Bathroom'" style="margin-top:300px;margin-left:850px;height:300px;width:300px;" src='../assets/Washstand-PNG-Photos.png')
		img#table1.table(v-else-if="room=='Kitchen'" style="margin-top:80px;margin-left:380px;height:550px;width:600px;" src='../assets/Kitchen-PNG-Transparent.png')

		img#table2.table(v-if="room=='Living Room'" src='../assets/Table-Transparent-PNG.png')
		img#table2.table(v-else-if="room=='Bedroom'" style="margin-top:350px;margin-left:450px;height:300px;width:300px;"  src='../assets/Dresser-Background-PNG.png')
		img#table2.table(v-else-if="room=='Bathroom'" style="margin-top:350px;margin-left:850px;height:400px;width:300px;" src='../assets/hampton-freestanding-wash-basin-bilden-home-and-hardware-market_grande.png')
		img#table2.table(v-else-if="room=='Kitchen'" style="margin-top:100px;margin-left:380px;height:500px;width:600px;" src='../assets/Kitchen-PNG-File-Download-Free.png')

		img#table3.table(v-if="room=='Living Room'" src='../assets/Drum-Table-PNG-HD.png')
		img#table3.table(v-else-if="room=='Bedroom'" style="margin-top:350px;margin-left:450px;height:300px;width:300px;" src='../assets/Dresser-PNG-Transparent-Picture.png')
		img#table3.table(v-else-if="room=='Bathroom'" style="margin-top:300px;margin-left:750px;height:450px;width:450px;" src='../assets/pngtree-bathroom-sink-for-washing-hands-and-face-vector-png-image_5732311.png')
		img#table3.table(v-else-if="room=='Kitchen'" style="margin-top:130px;margin-left:380px;height:450px;width:600px;" src='../assets/Modern-Kitchen-PNG-Transparent-Image.png')

		img#sofa1.sofa(v-if="room=='Living Room'" src='../assets/Five-Seater-Sofa-PNG-File.png')
		img#sofa1.sofa(v-else-if="room=='Bedroom'" style="margin-left:900px;" src='../assets/Sleigh-Bed-PNG-Image.png')
		img#sofa1.sofa(v-if="room=='Bathroom'" style="margin-top:450px;margin-left:1350px;height:300px;width:150px;" src='../assets/Toilet-PNG-Image.png')
		img#sofa1.sofa(v-if="room=='Kitchen'" style="margin-top:120px;margin-left:930px;height:500px;width:500px;" src='../assets/Refrigerator-Transparent-Images-PNG.png')

		img#sofa2.sofa(v-if="room=='Living Room'" src='../assets/Sleeper-Sofa-Transparent-Background.png')
		img#sofa2.sofa(v-else-if="room=='Bedroom'" style="margin-left:900px;" src='../assets/Platform-Bed-PNG-Clipart.png')
		img#sofa2.sofa(v-if="room=='Bathroom'" style="margin-top:450px;margin-left:1350px;height:300px;width:150px;" src='../assets/Toilet2-PNG-Image.png')
		img#sofa2.sofa(v-if="room=='Kitchen'" style="margin-top:100px;margin-left:1020px;height:500px;width:300px;" src='../assets/Refrigerator-PNG-Clipart.png')

		img#sofa3.sofa(v-if="room=='Living Room'" src='../assets/Sleeper-Sofa-PNG-Background-Image.png')
		img#sofa3.sofa(v-else-if="room=='Bedroom'" style="margin-left:900px;" src='../assets/Beds-PNG-HD.png')
		img#sofa3.sofa(v-if="room=='Bathroom'" style="margin-left:1200px;" src='../assets/Toilet-PNG-Picture.png')
		img#sofa3.sofa(v-if="room=='Kitchen'" style="margin-top:100px;margin-left:1020px;height:500px;width:300px;" src='../assets/LG-Refrigerator-PNG-File.png')

		img#light1.light(v-if="room=='Living Room'" src='../assets/Hanging-Chandelier-PNG-Pic.png')
		img#light1.light(v-else-if="room=='Bedroom'" style="margin-top:360px;height:150px;width:150px;"  src='../assets/Ceramic-Lamp-PNG-Photos.png')
		img#light1.light(v-else-if="room=='Bathroom'" style="margin-top:150px;margin-left:920px;height:200px;"  src='../assets/Mirror-Transparent-PNG.png')
		img#light1.light(v-else-if="room=='Kitchen'" style="margin-top:550px;margin-left:1450px;height:250px;width:150px;" src='../assets/Garbage-Can-PNG-Pic.png')


		img#light2.light(v-if="room=='Living Room'" src='../assets/Chandelier-Light-Lamp-Transparent-PNG.png')
		img#light2.light(v-else-if="room=='Bedroom'" style="margin-top:360px;margin-left:825px;height:150px;width:100px;" src='../assets/Lamp-PNG-Image.png')
		img#light2.light(v-else-if="room=='Bathroom'" style="margin-top:150px;margin-left:930px;height:200px;" src='../assets/Mirror-PNG-Transparent.png')
		img#light2.light(v-else-if="room=='Kitchen'" style="margin-top:600px;margin-left:1450px;height:100px;width:80px;" src='../assets/Trash-Silver-Bin-PNG-Clipart.png')

		img#light3.light(v-if="room=='Living Room'" src='../assets/Chandelier-Light-Lamp-PNG-File.png')
		img#light3.light(v-else-if="room=='Bedroom'" style="margin-top:360px;height:150px;width:150px;" src='../assets/Decorative-Lamp-PNG-Transparent-Image.png')
		img#light3.light(v-else-if="room=='Bathroom'" style="margin-top:150px;margin-left:890px;height:200px;width:250px;" src='../assets/a6244bc3dded15192b050b4b4109bd59.png')
		img#light3.light(v-else-if="room=='Kitchen'" style="margin-top:600px;margin-left:1450px;height:100px;width:80px;" src='../assets/Trash-Silver-Bin-PNG-Photos.png')

		img#carpet1.carpet(v-if="room=='Living Room'" src='../assets/Carpet-PNG-Pic.png')
		img#carpet1.carpet(v-else-if="room=='Bedroom'" style="margin-top:490px;margin-left:800px;height:150px;width:150px;" src='../assets/Bed-Table-PNG-File.png')
		img#carpet1.carpet(v-else-if="room=='Kitchen'" style="z-index:5;margin-top:300px;margin-left:600px;height:600px;width:600px;" src='../assets/Dining-Room-Table-Transparent-Images-PNG.png')
		img#carpet1.carpet(v-else-if="room=='Bathroom'" style="margin-top:220px;margin-left:50px;height:600px;width:400px;" src='../assets/Aesthetic-Plant-Transparent-PNG.png')

		img#carpet2.carpet(v-if="room=='Living Room'" src='../assets/Carpet-PNG-Clipart.png')
		img#carpet2.carpet(v-else-if="room=='Bedroom'" style="margin-top:480px;margin-left:800px;height:150px;width:150px;" src='../assets/Nightstand-Download-PNG-Image.png')
		img#carpet2.carpet(v-else-if="room=='Kitchen'" style="z-index:5;margin-top:300px;margin-left:600px;height:600px;width:600px;" src='../assets/Dining-Room-Table-PNG-Clipart.png')
		img#carpet2.carpet(v-else-if="room=='Bathroom'" style="margin-top:350px;height:400px;width:200px;" src='../assets/Flower-Pot-Plants-Transparent-PNG.png')
</template>

<script>
import domtoimage from 'dom-to-image';
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
	data() {
      return {
        options: [{
          value: 'Living Room',
          label: 'Living Room'
        }, {
          value: 'Bedroom',
          label: 'Bedroom'
        },{
					value: 'Bathroom',
					label: 'Bathroom'
				},{
          value: 'Kitchen',
          label: 'Kitchen'
        }],
        room: 'Living Room',
				output: null
      }
    },

	watch: {
			room: function() {
				this.clear();
		}
	},

  mounted() {

function ImageSwitcher(choices, i) {
	i = 0;
	
	this.Next = function() {
		hide_current_image();
		show_next_image();
	}
	
	var hide_current_image = function() {
		if(choices){
			choices[i].style.visibility = "hidden";
			i += 1;
		}
	}
	var show_next_image = function() {
		if(choices){
			if(i == (choices.length)) {
				i = 0;
			}
			choices[i].style.visibility = "visible";
		}
	}
}
  
  var sofas = this.$el.querySelectorAll('.sofa');
  var lights = this.$el.querySelectorAll('.light');
	var tables = this.$el.querySelectorAll('.table');
	var carpets = this.$el.querySelectorAll('.carpet');

	var tables_picker = new ImageSwitcher(tables);
	document.getElementById("table").onclick = function() { tables_picker.Next(); };
	
	var sofas_picker = new ImageSwitcher(sofas);
	document.getElementById("sofa").onclick = function() {sofas_picker.Next(); };
	
	var lights_picker = new ImageSwitcher(lights);
	document.getElementById("light").onclick = function() {lights_picker.Next(); };

	var carpets_picker = new ImageSwitcher(carpets);
	document.getElementById("carpet").onclick = function() {carpets_picker.Next(); };

  },
	methods:{
		clear(){
			var rooms = this.$el.querySelectorAll('#room');
			var sofas = this.$el.querySelectorAll('.sofa');
			var lights = this.$el.querySelectorAll('.light');
			var tables = this.$el.querySelectorAll('.table');
			var carpets = this.$el.querySelectorAll('.carpet');

			rooms.forEach(box => {
				box.style.visibility = 'visible';
			});
			sofas.forEach(box => {
				box.style.visibility = 'hidden';
			});
			lights.forEach(box => {
				box.style.visibility = 'hidden';
			});
			tables.forEach(box => {
				box.style.visibility = 'hidden';
			});
			carpets.forEach(box => {
				box.style.visibility = 'hidden';
			});
		},

		async fetchImages() {
      try {
        // Replace 'http://localhost:3000' with your proxy server's URL
        const proxyServerUrl = 'http://localhost:3000';

        // Define image URLs with paths on the proxy server
        const imageUrls = {
          'Living Room': `${proxyServerUrl}/external-image/path-to-living-room-image.png`,
          'Bedroom': `${proxyServerUrl}/external-image/path-to-bedroom-image.png`,
          'Bathroom': `${proxyServerUrl}/external-image/path-to-bathroom-image.png`,
          'Kitchen': `${proxyServerUrl}/external-image/path-to-kitchen-image.png`,
        };

        // Fetch the image for the current room
        const response = await axios.get(imageUrls[this.room], {
          responseType: 'blob', // Set response type to blob
        });

        // Create a blob URL for the image
        const blob = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(blob);

        // Update the 'output' data property with the fetched image URL
        this.output = imageUrl;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },


		async captureAndSave() {
			const divToCapture = this.$refs.captureDiv;
			try {
				const dataUrl = await domtoimage.toPng(divToCapture);
				const a = document.createElement('a');
				a.href = dataUrl;
				a.download = 'captured_image.png';
				a.click();
			} catch (error) {
				console.error('Error capturing and saving:', error);
			}
		}
	}
}
</script>

<style scoped>
body{
  font-family: 'Ubuntu', sans-serif;
}

#room-selector{
	margin-bottom: 10px;
}

.furniture-buttons{
	margin-bottom: 10px;
}

.images{
	width: 1800px;
	height: 1000px;
}

img {
	position: absolute;
	margin-left: 5%;
	display:inline-block;
  width:1525px;
	height:800px;
}

ul{
	list-style-type: none;
}


#room{
z-index: -1000;   
}

.table{
	margin-top: 500px;
	margin-left:500px;
	height: 200px;
	width: 200px;
	visibility:hidden;
  z-index: 2;
}

.sofa{
	margin-top: 350px;
	margin-left:800px;
	height: 400px;
	width: 500px;
	visibility:hidden;
  z-index: 4;
	}

.light{
	margin-left:800px;
	height: 200px;
	width: 150px;
	visibility:hidden;
	z-index: 3;
	}

.carpet{
	margin-top: 600px;
	margin-left:100px;
	height: 200px;
	visibility:hidden;
	z-index: 1;
	}
</style>
