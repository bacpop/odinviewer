<template>
  <input type="checkbox" id="multiple" v-model="multiple"/>
  <label for="multiple">Show each chart in its plot</label>
  <VueSlider 
    v-model="time" 
    :min="5"
    :max="200"
    :interval="1"
    style="margin: 5px 20px;"
    >
  </VueSlider>
  <SingleViewer v-if="!multiple" :times="times" :results_names="results_names" :results_y="results_y" :key="results_y"/>
  <MultipleViewer v-else :times="times" :results_names="results_names" :results_y="results_y" :key="results_names"/>
</template>

<script>
import SingleViewer from './components/SingleViewer.vue'
import MultipleViewer from './components/MultipleViewer.vue'
import VueSlider from 'vue-3-slider-component'
import * as models from './model/testModel3.js'
import { PkgWrapper } from "@reside-ic/odinjs"
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    SingleViewer,
    MultipleViewer,
    VueSlider
  },

  data() {
    return {
      multiple: false
    }
  },

  setup() {
    let time = ref(20)
    const mod = new PkgWrapper(models.testModel3, {}, "error")
    const times = [...Array(time.value).keys()]
    const results_all = mod.run(times, null, {})
    const results_names = results_all.names
    const results_y = results_all.y

    return { time, times, results_names, results_y }
  },

  watch: {
    time: function(newTime) {
      const mod = new PkgWrapper(models.testModel3, {}, "error")
      this.times = [...Array(newTime).keys()]
      const results_all = mod.run(this.times, null, {})
      this.results_names = results_all.names
      this.results_y = results_all.y
    }
  }

}
</script>

<style>
</style>

