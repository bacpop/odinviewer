<template>
  <h1>SBMLtoOdin Viewer</h1>

  <input type="text" v-model="path" placeholder="Enter the model name" @keyup.enter="loadModel" >
  <button v-if="!model_loaded" @click="loadModel">Load model</button>
  <button v-if="model_loaded" @click="model_loaded=!model_loaded; path=''">Clear model</button>
  <div v-if="model_loaded && file_names.includes(path)">
    <h2>Model: {{ path }}</h2>
    <ModelViewer :path="path"/>
  </div>
  <div v-else-if="no_model">
    <h2>No model is loaded</h2>
  </div>
  <div v-else>
    <h2>Model not found</h2>
  </div>
</template>

<script>
import { ref } from 'vue'
import ModelViewer from './components/ModelViewer.vue';

export default {
  name: 'App',

  components: {
    ModelViewer
  },

  data() {
    return {
      file_names: [],
    }
  },

  created() {
    this.extractFileNames()
  },

  setup() {
    let path = ref("")
    let model_loaded = ref(false)
    let no_model = ref(true)

    return { 
      path,
      model_loaded,
      no_model
    }
  },

  methods: {
    loadModel() {
      if (this.file_names.includes(this.path)) {
        this.model_loaded = true
        this.no_model = true
      }
      else {
        this.no_model = false
      }
    },

    async extractFileNames() {
      try {
        const response = await fetch('./models/file_names.txt');
        if (response.ok) {
          let fileContent = await response.text();
          let file_names = fileContent.split("\n").slice(0, -1)
          for (let i = 0; i < file_names.length; i++) {
            file_names[i] = file_names[i].split("\r")[0]
          }
          this.file_names = file_names
        } else {
          console.error('Failed to load file');
        } 
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }
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

.keys {
  display: inline-block;
  width: 150px;
  margin-bottom: 5px;
}

.values {
  display: inline-block;
  width: 150px;
}

#time_slider {
  margin: 10px 20px;
}

#checkboxes {
  margin: 10px 20px;
}

.parameters_button {
  margin: 3px 0;
}

#initial_parameters {
  margin: 0px 50px;
}

#graph {
  margin-left: 20px;
}
</style>

