<template>
  <p v-if="!modelLoaded & !noModelFound">Loading image...</p> 
  <div v-else-if="noModelFound">
    <h2>The JSON file for this model doesn't exist</h2>
  </div>
  <div id="graphHolder"></div>
  <button @click="downloadImage">Download model as an image</button>
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
      cy: null,
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

      var cy = cytoscape({
        container: document.getElementById('graphHolder'),
        elements: elements,
        style: stylesheet,
        layout: {
          name: 'fcose', // Or other layout options
        }
      });
      this.cy = cy;
    },

    downloadImage() {
      let png = this.cy.jpg();
      let a = document.createElement('a');
      a.href = png;
      a.download = 'graph.jpg';
      a.click();
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