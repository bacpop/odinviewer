<template>
  <input type="checkbox" id="multiple" v-model="multiple"/>
  <label for="multiple">Show each chart in its plot</label>
  <VueSlider 
    v-model="time" 
    :min="5"
    :max="2000"
    :interval="1"
    style="margin: 5px 20px;"
    >
  </VueSlider>
  <SingleViewer v-if="!multiple" :times="times" :results_names="results_names" :results_y="results_y" :key="update_single"/>
  <MultipleViewer v-else :times="times" :results_names="results_names" :results_y="results_y" :key="update_multiple"/>
</template>

<script>
import SingleViewer from './components/SingleViewer.vue'
import MultipleViewer from './components/MultipleViewer.vue'
import VueSlider from 'vue-3-slider-component'
import * as models from './model/LawModel.js'
import { PkgWrapper } from "@reside-ic/odinjs"
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    SingleViewer,
    MultipleViewer,
    VueSlider
  },

  setup() {
    let time = ref(20)
    let multiple = ref(false)
    const mod = new PkgWrapper(models.LawModel, {}, "error")
    const times = [...Array(time.value).keys()]
    const results_all = mod.run(times, null, {})
    const results_names = results_all.names
    const results_y = results_all.y

    var update_single = ref(0)
    var update_multiple = ref(0)

    return { 
      time, 
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
        this.times = [...Array(newTime).keys()]
        let time_diff = [...Array(newTime - oldTime + 1).keys()]
        console.log(time_diff)
        const results_all = this.mod.run(time_diff, this.results_y[oldTime - 1], {})
        console.log(results_all)
        this.results_y.pop()
        this.results_y = this.results_y.concat(results_all.y)
      }
      else {
        this.times = [...Array(newTime).keys()]
        this.results_y = this.results_y.slice(0, newTime)
      }
      this.update_single += 1
      this.update_multiple += 1
    }
  }

}
</script>

<style>
</style>

