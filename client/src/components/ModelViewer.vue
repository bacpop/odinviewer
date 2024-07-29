<template>
    <div v-if="model!=null" id="model_viewer">
        <div id="checkboxes">
            <input v-if="!graph" type="checkbox" id="multiple" v-model="multiple"/>
            <label v-if="!graph" for="multiple">Show each chart in its plot</label>
            <input type="checkbox" id="graph" v-model="graph"/>
            <label for="single">Show a graph of the model</label>
        </div>
    
        <div id="time_slider" v-if="!graph">
            <label for="time">Time: {{ time }}</label>
            <VueSlider 
                v-model="time"
                :lazy="true" 
                :min="5"
                :max="1000"
                :interval="1"
                >
            </VueSlider>
        </div>
    
        <div v-if="!graph" id="initial_parameters">
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
        <SingleViewer v-if="!multiple && !graph" :times="times" :results_names="results_names" :results_y="results_y" :key="update_single"/>
        <MultipleViewer v-else-if="!graph" :times="times" :results_names="results_names" :results_y="results_y" :key="update_multiple"/>
        <GraphViewer v-else :model_reference="path"/>
    </div>
</template>

<script>
import SingleViewer from './SingleViewer.vue'
import MultipleViewer from './MultipleViewer.vue'
import GraphViewer from './GraphViewer.vue'
import VueSlider from 'vue-3-slider-component'
import { PkgWrapper } from "@reside-ic/odinjs"
import { ref } from 'vue'
import Popper from "vue3-popper";

export default {
    name: 'ModelViewer',

    components: {
        SingleViewer,
        MultipleViewer,
        GraphViewer,
        VueSlider,
        Popper
    },

    props: ['path'],

    data() {
        return {
            time: ref(5),
            len: 1000,
            multiple: ref(false),
            graph: ref(false),
            mod: null,
            times: null,
            results_names: null,
            results_y: null,
            update_single: 0,
            update_multiple: 0,
            model: null,
            parameters: {},
            initial_parameters: {},
            file_names: [],
        }
    },

    mounted() {
        this.load_model()
    },

    created() {
        this.extractParameters()
    },

    watch: {
        time: function() {
            const times = range(0, this.time, this.len)
            this.times = times
            const results_all = this.mod.run(times, null, {})
            this.results_y = results_all.y

            this.update_single += 1
            this.update_multiple += 1
        },
    },

    methods: {
        async load_model() {
            let models = await import(`../../models/${this.path}.js`)
            let model = models.model
            this.model = model

            const mod = new PkgWrapper(model, this.parameters, "error")
            this.mod = mod
            const times = range(0, this.time, this.len)
            this.times = times
            const results_all = mod.run(times, null, {})
            this.results_names = results_all.names
            this.results_y = results_all.y

            this.update_single += 1
            this.update_multiple += 1
        },

        reload() {
            const mod = new PkgWrapper(this.model, this.parameters, "error")
            this.mod = mod
            const times = range(0, this.time, this.len)
            const results_all = mod.run(times, null, {})
            this.results_names = results_all.names
            this.results_y = results_all.y
            
            this.update_single += 1
            this.update_multiple += 1
        },
        
        async extractParameters() {
            try {
                // Just keep i'th extract with i number of the file name we consider
                const response = await fetch(`./models/${this.path}.js`);
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
        },
    }
}

function range(start, end, len){
    return Array(len).fill().map((_, idx) => start + idx * (end - start) / (len - 1));
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
