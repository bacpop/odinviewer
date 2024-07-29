<template>
  <Popper>
    <button id="legend_button">Legend</button>
    <template #content>
      <img src="../assets/SBML_stylesheet.svg" alt="Legend" id="legend">
    </template>
  </Popper>
  <p v-if="!modelLoaded">Loading image...</p> 
  <div id="graphHolder"></div>
</template>

<script>
import TurnSBMLtoCytoscape from '../services/Request'
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { adjustStylesheet } from './stylesheet';
import Popper from "vue3-popper";

cytoscape.use(fcose);

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
      modelLoaded: false,
    };
  },

  mounted() {
    console.log("Reading model")
    fetch(`./models/${this.model_reference}.xml`).then( fileString => fileString.text())
      .then( text => {
        let sbml = text;
        let response = this.getCytoscape(sbml);
        response.then( res => {
          this.modelLoaded = true;
          const cyContainer = document.getElementById('graphHolder');
          if (cyContainer) {
            this.render(res);
          } else {
            console.error('Cytoscape container not found!');
          }
        })
      })
  },

  methods: {
    async getCytoscape(sbml) {
      console.log("Turning SBML to Cytoscape")
      let response = await TurnSBMLtoCytoscape(sbml)
      return response
    },

    render(elements) {

      let stylesheet = adjustStylesheet()
      console.log(elements)

      cytoscape({
        container: document.getElementById('graphHolder'),
        elements: elements,
        style: stylesheet,
        layout: {
          name: 'fcose', // Or other layout options
        }
      });
    }

  }
}
</script>

<style>
#graphHolder {
  height: 600px;
  width: 1200px;
  position: relative;
}

:root {
  --popper-theme-background-color: lightgray;
  --popper-theme-background-color-hover: lightgray;
  --popper-theme-text-color: black;
  --popper-theme-border-width: 3px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 5px;
}

#legend {
  height: 600px;
  width: auto;

}

</style>