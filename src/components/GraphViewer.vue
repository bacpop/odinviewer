<template>
  <p v-if="!modelLoaded">Loading image...</p> 
  <div id="graphHolder"></div>
</template>

<script>
import TurnSBMLtoCytoscape from '../services/Request'
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
  width: calc(100% - 40px);
  height: 400px;
  margin: 40
}

#legend_button {
    float: left;
}

</style>