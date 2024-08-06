<template>
  <div v-if="cy!=null" id="initial_layout">
    <Popper>
      <button>Choose layout</button>
      <template #content>
        <div v-for="value in Object.entries(this.layoutParameters)" :key="value[1]">
          <label class="keys_layout">{{ value[0] }}</label>
          <input class="values_layout" type="number" :value="value[1]" @change="event => this.layoutParameters[value[0]] = +event.target.value"/>
        </div>
        <div class="layout_button">
          <button @click="reload">Reload with new layout</button>
        </div>
        <div class="parameters_button">
          <button @click="Object.assign(this.layoutParameters, this.initialLayoutParameters); reload()">Reset layout</button>
        </div>
      </template>
    </Popper>
  </div>
  <p v-if="!modelLoaded & !noModelFound">Loading image...</p> 
  <div v-else-if="noModelFound">
    <h2>The JSON file for this model doesn't exist</h2>
  </div>
  <div id="graphHolder"></div>
  <button v-if="cy!=null" @click="downloadImage">Download graph as an image</button>
  
</template>

<script>
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
      noModelFound: false,
      cy: null,
      layout: {},
      layoutParameters: {},
      initialLayoutParameters: {},
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

      Object.assign(this.initialLayoutParameters, this.layoutParameters)

      this.layout = {
        name: 'fcose',
        padding: this.layoutParameters["Padding"],
        nodeRepulsion: node => this.layoutParameters["Node Repulsion"],
        idealEdgeLength: edge => this.layoutParameters["Ideal Edge Length"],
        edgeElasticity: edge => this.layoutParameters["Edge Elasticity"],
        nestingFactor: this.layoutParameters["Nesting Factor"],
        numIter: this.layoutParameters["Number of Iter."],
        gravity: this.layoutParameters["Gravity"],
        gravityRange: this.layoutParameters["Gravity Range"],
        gravityCompound: this.layoutParameters["Gravity Compound"],
        gravityRangeCompound: this.layoutParameters["Gravity Range Comp."],
        tilingPaddingVertical: this.layoutParameters["Tiling Padding Vert."],
        tilingPaddingHorizontal: this.layoutParameters["Tiling Padding Hor."],
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

    reload() {
      this.layout = {
        name: 'fcose',
        padding: this.layoutParameters["Padding"],
        nodeRepulsion: node => this.layoutParameters["Node Repulsion"],
        idealEdgeLength: edge => this.layoutParameters["Ideal Edge Length"],
        edgeElasticity: edge => this.layoutParameters["Edge Elasticity"],
        nestingFactor: this.layoutParameters["Nesting Factor"],
        numIter: this.layoutParameters["Number of Iter."],
        gravity: this.layoutParameters["Gravity"],
        gravityRange: this.layoutParameters["Gravity Range"],
        gravityCompound: this.layoutParameters["Gravity Compound"],
        gravityRangeCompound: this.layoutParameters["Gravity Range Comp."],
        tilingPaddingVertical: this.layoutParameters["Tiling Padding Vert."],
        tilingPaddingHorizontal: this.layoutParameters["Tiling Padding Hor."],
      }

      this.cy.layout(this.layout).run();
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

.keys_layout {
    display: inline-block;
    width: 150px;
    padding-bottom: 5px;
}

.values_layout {
    display: inline-block;
    width: 150px;
}

#initial_layout {
    margin-left: 5px;
    margin-top: 10px;
}
</style>