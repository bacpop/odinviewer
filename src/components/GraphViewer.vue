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
      layout: {},
      layoutParameters: {},
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

      this.layout = {
        name: 'fcose',
        padding: 10,
        nodeRepulsion: node => 4500,
        idealEdgeLength: edge => 50,
        edgeElasticity: edge => 0.45,
        nestingFactor: 0.1,
        numIter: 2500,
        gravity: 0.25,
        gravityRange: 3.8, 
        gravityCompound: 1.0,
        gravityRangeCompound: 1.5,
        tilingPaddingVertical: 10,
        tilingPaddingHorizontal: 10,
      }

      this.layoutParameters = {
        "Padding": 10,
        "Node Repulsion": 4500,
        "Ideal Edge Length": 50,
        "Edge Elasticity": 0.45,
        "Nesting Factor": 0.1,
        "Number of Iter.": 2500,
        "Gravity": 0.25,
        "Gravity Range": 3.8, 
        "Gravity Compound": 1.0,
        "Gravity Range Comp.": 1.5,
        "Tiling Padding Vert.": 10,
        "Tiling Padding Hor.": 10,
      }
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

    updateLayout() {
      this.cy.layout({ name: 'fcose' }).run();
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