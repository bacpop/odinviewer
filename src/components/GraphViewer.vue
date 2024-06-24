<template>  
    <div>
        <div id="cy"></div>
    </div>
</template>

<script>
import { convertSbmlToSbgnml } from './functions';
let convert = require('sbgnml-to-cytoscape');
var cytoscape = require('cytoscape');
import fcose from 'cytoscape-fcose';
var cytoscapeSbgnStylesheet = require('cytoscape-sbgn-stylesheet');
cytoscape.use(fcose);

export default {
    name: 'GraphViewer',

    mounted() {
        fetch('./models/Phillips2013.xml').then( fileString => fileString.text())
            .then( text => {
                convertSbmlToSbgnml(text).then( sbgnml => {
                    sbgnml = sbgnml.replaceAll('ns2:','')
                    sbgnml = sbgnml.replaceAll('ns1:','')
                    let cy = convert(sbgnml);
                    console.log(cy);
                    
                    cytoscape({
                        container: document.getElementById('cy'),
                        elements: cy,
                        layout: { name: 'fcose' },
                        style: cytoscapeSbgnStylesheet(cytoscape),
                    });
                });
                
            })
    },
}
</script>

<style>
#cy {
    width: 90%;
    height: 400px;
    position: absolute;
    left: 10%;
}
</style>