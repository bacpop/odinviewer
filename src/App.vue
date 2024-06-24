<template>
  <h1>SBMLtoOdin Viewer</h1>
  <div id="multiple_div">
    <input type="checkbox" id="multiple" v-model="multiple"/>
    <label for="multiple">Show each chart in its plot</label>
  </div>  
  <div id="time_slider">
    <label for="time">Time: {{ time }}</label>
    <VueSlider 
      v-model="time" 
      :min="5"
      :max="2000"
      :interval="1"
      :tooltip="'none'"
      >
    </VueSlider>
  </div>
  <div id="initial_parameters">
    <Popper>
      <button>Choose initial parameters</button>
      <template #content>
        <div v-for="value in Object.entries(this.parameters)" :key="value[1]">
          <label class="keys">{{ value[0] }}</label>
          <input class="values" type="number" :value="value[1]" @change="event => this.parameters[value[0]] = +event.target.value"/>
        </div>
        <div class="parameters_button">
          <button @click="reload">Reload model with new parameters</button>
        </div>
        <div class="parameters_button">
          <button @click="Object.assign(this.parameters, this.initial_parameters); reload()">Reset parameters</button>
        </div>
      </template>
    </Popper>
  </div>
  <SingleViewer v-if="!multiple" :times="times" :results_names="results_names" :results_y="results_y" :key="update_single"/>
  <MultipleViewer v-else :times="times" :results_names="results_names" :results_y="results_y" :key="update_multiple"/>
  <Graph/>
</template>

<script>
import SingleViewer from './components/SingleViewer.vue'
import MultipleViewer from './components/MultipleViewer.vue'
import Graph from './components/GraphViewer.vue'
import VueSlider from 'vue-3-slider-component'
import * as models from '../public/models/BIOMD0000000012.js'
import { PkgWrapper } from "@reside-ic/odinjs"
import { ref } from 'vue'
import Popper from "vue3-popper";

export default {
  name: 'App',
  components: {
    SingleViewer,
    MultipleViewer,
    Graph,
    VueSlider,
    Popper
  },

  data() {
    return {
      parameters: {},
      initial_parameters: {},
    }
  },

  created() {
    this.extractParameters()
  },

  setup() {
    let time = ref(20)
    let time_interval = 0.3
    let multiple = ref(false)
    const mod = new PkgWrapper(models.BIOMD0000000012, {}, "error")
    const times = range(0, time.value, time_interval)
    const results_all = mod.run(times, null, {})
    const results_names = results_all.names
    const results_y = results_all.y

    var update_single = ref(0)
    var update_multiple = ref(0)

    return { 
      time, 
      time_interval,
      multiple, 
      mod, 
      times, 
      results_names, 
      results_y, 
      update_single, 
      update_multiple 
    }
  },

  watch: {
    time: function(newTime, oldTime) {
      if (oldTime < newTime) {
        this.times = range(0, newTime, this.time_interval)
        let time_diff = range(0, newTime - oldTime + 1, this.time_interval)
        const results_all = this.mod.run(time_diff, this.results_y[this.results_y.length - 1], {})
        this.results_y.pop()
        this.results_y = this.results_y.concat(results_all.y)
      }
      else {
        this.times = range(0, newTime, this.time_interval)
        this.results_y = this.results_y.slice(0, newTime/this.time_interval)
      }
      this.update_single += 1
      this.update_multiple += 1
    },
  },

  methods: {
    reload() {
      const mod = new PkgWrapper(models.BIOMD0000000012, this.parameters, "error")
      const times = range(0, this.time, this.time_interval)
      const results_all = mod.run(times, null, {})
      this.results_names = results_all.names
      this.results_y = results_all.y
      this.update_single += 1
      this.update_multiple += 1
    },
    
    async extractParameters() {
      try {
        const response = await fetch('./models/BIOMD0000000012.js');
        if (response.ok) {
          let fileContent = await response.text();
          let parameters_split = fileContent.replaceAll("this.base.user.setUserScalar(user, ","$").split("$")

          let parameters = {}
          for (let i = 1; i < parameters_split.length; i++) {
            parameters[parameters_split[i].split(",")[0].replaceAll('"', '')] = +parameters_split[i].split(",")[2]
          }
          this.parameters = parameters
          Object.assign(this.initial_parameters, this.parameters)
        } else {
          console.error('Failed to load file');
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }
  }
}

function range(start, end, step){
  const len = Math.floor((end - start) / step)
  return Array(len).fill().map((_, idx) => start + (idx * step))
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
  width: 100px;
  margin-bottom: 5px;
}

.values {
  display: inline-block;
  width: 150px;
}

#time_slider {
  margin: 10px 20px;
}

#multiple_div {
  margin: 10px 20px;
}

.parameters_button {
  margin: 3px 0;
}

#initial_parameters {
  margin: 0px 50px;
}
</style>

