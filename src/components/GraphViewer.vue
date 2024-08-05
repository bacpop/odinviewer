<template>
  <p v-if="!modelLoaded & !noModelFound">Loading image...</p> 
  <div v-else-if="noModelFound">
    <h2>The JSON file for this model doesn't exist</h2>
  </div>
  <div id="graphHolder"></div>
</template>

<script>
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { adjustStylesheet } from './stylesheet';

cytoscape.use(fcose);

export default {
  name: 'GraphViewer',

  props: {
    model_reference: String,
  },

  data() {
    return {
      modelLoaded: false,
      noModelFound: false,
    };
  },

  mounted() {
    console.log("Reading model")
    fetch(`./models/${this.model_reference}.json`).then( fileString => fileString.text())
      .then( json => {
        let sbml = JSON.parse(json)
        this.modelLoaded = true;
        const cyContainer = document.getElementById('graphHolder');
        if (cyContainer) {
          this.render(sbml);
        } else {
          console.error('Cytoscape container not found!');
        }
      })
      .catch( error => {
        this.noModelFound = true;
      });
  },

  methods: {

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
  width: calc(100% - 40px);
  height: 400px;
  margin: 40
}
</style>