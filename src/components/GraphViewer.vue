<template>
  <Popper>
    <button id="legend_button">Legend</button>
    <template #content>
      <img src="../assets/SBML_stylesheet.svg" alt="Legend" id="legend">
    </template>
  </Popper>
  <img class="imgContainer" v-if="imageData" :src="imageData" alt="Base64 Image">
  <p v-else>Loading image...</p> 
</template>

<script>
import { convertSbmlToSbgnml } from './functions.js';
import Popper from "vue3-popper";

export default {
  name: 'GraphViewer',

  components: {
    Popper
  },

  props: {
    model_reference: String,
  },

  data() {
    return {
      imageData: null, 
    };
  },

  mounted() {
    fetch(`./models/${this.model_reference}.xml`).then( fileString => fileString.text())
        .then( text => {
            convertSbmlToSbgnml(text).then( img => {
              this.imageData = img;
            });
        })
  },
}
</script>

<style>
:root {
  --popper-theme-background-color: lightgray;
  --popper-theme-background-color-hover: lightgray;
  --popper-theme-text-color: black;
  --popper-theme-border-width: 3px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 5px;
}

#legend_button {
  margin: 10px 20px;
}
#legend {
  width: 600px;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: auto;
}
</style>