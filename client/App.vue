<template>
  <h1>SBMLtoOdin Viewer</h1>

  <input type="text" v-model="path" placeholder="Enter the model name"  @keydown="no_model=true" @keydown.enter="loadModel" @keydown.delete="model_loaded=false" >
  <button v-if="!model_loaded" @click="loadModel">Load model</button>
  <button v-if="model_loaded" @click="model_loaded=!model_loaded; path=''">Clear model</button>

  <!-- Load the model only if its ID is in the public folder -->
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
import ModelViewer from './src/components/ModelViewer.vue';

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

    // Open the file containing the names of the models and extract them into a list
    async extractFileNames() {
      try {
        const response = await fetch('./models/file_names.txt');
        console.log(response)
        if (response.ok) {
          let fileContent = await response.text();
          console.log(fileContent)
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

