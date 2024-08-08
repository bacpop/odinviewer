<template>
  <div id="appContainer">
    <div id="Header">
      <h1 id="title">Biomodels Viewer</h1>
      <img src="./src/assets/favicon.png" alt="Logo" id="logo">
    </div>

    <div id="chooseModel">
      <div id="model_input">
        <input type="text" v-model="path" placeholder="Enter the model name"  @keydown="clearModel(false)" @keydown.enter="loadModel" @keydown.delete="clearModel(false)" >
        <button v-if="!model_loaded" @click="loadModel" id="loadModel">Load model</button>
        <button v-if="model_loaded" @click="clearModel(true)" id="clearModel">Clear model</button>
        <div id="exampleModels">
          <text>Example models:</text>
          <button class="exampleModel" @click="path = 'BIOMD0000000982'; loadModel()">BIOMD0000000982</button>
          <button class="exampleModel" @click="path = 'BIOMD0000000002'; loadModel()">BIOMD0000000002</button>
        </div>
      </div>
        <!-- Load the model only if its ID is in the public folder -->
      <div v-if="model_loaded && file_names.includes(path)" >
        <h2 style="font-size: 12pt;">Model: {{ path }}</h2>
      </div>
      <div v-else-if="no_model">
        <h2>No model is loaded</h2>
      </div>
      <div v-else>
        <h2>Model not found</h2>
      </div>
    </div>

    <div id="model_viewer" v-if="model_loaded && file_names.includes(path)">
      <ModelViewer :path="path" :key="path"/>
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

  mounted() {
    this.extractFileNames().then(() => {
      let url = window.location.href
      let model = url.split("id?")[1]

      if (model != undefined && model != "") {
        model = model.split("/")[0]
        this.path = model
        this.loadModel()
      }
    })


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
        window.history.pushState({}, null, window.location.origin + "/id?" + this.path)
        this.model_loaded = true
        this.no_model = true
      }
      else {
        this.no_model = false
      }
    },

    clearModel(clear_path) {
      this.model_loaded = false
      if (clear_path) {
        this.path = ""
      }
      window.history.pushState({}, null, window.location.origin + "/")
    },

    // Open the file containing the names of the models and extract them into a list
    async extractFileNames() {
      console.log("Extracting file names")

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
#appContainer {
  display: flex;
  flex-direction: column;
  height: 90vh;
  box-sizing: border-box;
  min-height: 500px;
  min-width: 500px;
}

#Header {
  display: flex;
  align-items: center;
  justify-content: center;
}

#logo {
  position: absolute;
  left: 5px;
  top: 5px;
  height: 100px; 
  width: fit-content;
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

#loadModel {
  background-color: lightblue;
  border-width: 1px;
  height: 20.86px;
}

#loadModel:hover {
  background-color: lightcyan;
}

#clearModel {
  background-color: lightcoral;
  border-width: 1px;
  height: 20.86px;
}

#clearModel:hover {
  background-color: lightpink;
}

.exampleModel {
  margin: 0 2px;
  background-color: #f5f5f5;
  border: 0;
  font-size: 8pt;
}

.exampleModel:hover {
  background-color: #e5e5e5;
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
