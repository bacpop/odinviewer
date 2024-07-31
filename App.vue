<template>
  <div id="appContainer">
    <h1 id="title">SBMLtoOdin Viewer</h1>

    <div id="chooseModel">
      <input type="text" v-model="path" placeholder="Enter the model name"  @keydown="no_model=true" @keydown.enter="loadModel" @keydown.delete="model_loaded=false" >
      <button v-if="!model_loaded" @click="loadModel">Load model</button>
      <button v-if="model_loaded" @click="model_loaded=!model_loaded; path=''">Clear model</button>
        <!-- Load the model only if its ID is in the public folder -->
      <div v-if="model_loaded && file_names.includes(path)">
        <h2>Model: {{ path }}</h2>
      </div>
      <div v-else-if="no_model">
        <h2>No model is loaded</h2>
      </div>
      <div v-else>
        <h2>Model not found</h2>
      </div>
    </div>

    <div id="model_viewer" v-if="model_loaded && file_names.includes(path)">
      <ModelViewer :path="path"/>
    </div>
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

<style>
#appContainer {
  display: flex;
  flex-direction: column;
  height: 90vh;
  box-sizing: border-box;
}

#title {
  text-align: center;
  font-size: 50px;
  margin: 0;
}

h1 {
  text-align: center;
  font-size: 50px;
}

#chooseModel {
  display: flex;
  align-items: center;
  justify-content: center;
}

h2 {
  margin-left: 20px;
}

#model_viewer {
  width: 100%;
  flex-grow: 1;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
