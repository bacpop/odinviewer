<template>  
    <div>
        <div id="cy"></div>
    </div>
</template>

<script>
import { convertSbmlToSbgnml } from './functions';
var cytoscape = require('cytoscape');
import fcose from 'cytoscape-fcose';
cytoscape.use(fcose);

export default {
    name: 'GraphViewer',

    mounted() {
        fetch('./models/Phillips2013.xml').then( fileString => fileString.text())
            .then( text => {
                convertSbmlToSbgnml(text).then( sbgnml => {
                    console.log(sbgnml);
                    fillDiv(sbgnml);
                });
                
            })
    },
}

function fillDiv(sbgnml) {
    let size = 30;
        
    let cy = cytoscape({
        styleEnabled: true,
        headless: true
    });
    
    try{
        cy.add(sbgnml);
    }
    catch (e) {
        console.log(e);
    }
    cy.nodes().forEach((node) => {
        node.data("backgroundColor", "white");
    });

    // if(req.query.nodeInfo) {
    //     let ret = {
    //         nodeData: {}
    //     };
    //     cy.nodes().forEach(function(node){
    //         ret["nodeData"][node.id()] = node.data('label') ? node.data('label') : "";
    //     });
    //     ret["nodeAmount"] = cy.nodes().length;
    //     ret["edgeAmount"] = cy.edges().length;
    //     return res.status(200).send(ret);
    // }


    let layoutOptions = {
        name: "preset",
        padding: 30
    };
        
    let elementsToBeRendered = cy.elements();
    // let queryOptions = {};

    // if(queryOptions) {
    //     let queryResult;  // query result may or may not contain source/target nodes based on the type of the query
    //     let path;
    //     let sourceNodes = cy.collection();
    //     let targetNodes = cy.collection();
    //     // assign default values for some of the query options
    //     queryOptions.limit = 1;
    //     queryOptions.furtherDistance = 1;
    //     queryOptions.direction = "DIRECTED";
    //     queryOptions.highlight = true;

    //     const isCentrality = queryOptions.query == 'degreeCentrality' || queryOptions.query == 'closenessCentrality' 
    //         || queryOptions.query == 'betweennessCentrality' || queryOptions.query == 'pageRank';

    //     // run queries
    //     let result;
    //     try {
    //         if(!isCentrality) {
    //         queryOptions.sourceNodes.forEach(function(nodeId){
    //             let node = cy.getElementById(nodeId);
    //             node.addClass('source');
    //             node.data('highlightColor', queryOptions.sourceColor);
    //             sourceNodes.merge(node);
    //         });
    //         if(queryOptions.targetNodes) {
    //             queryOptions.targetNodes.forEach(function(nodeId){
    //             let node = cy.getElementById(nodeId);
    //             node.addClass('target');
    //             node.data('highlightColor', queryOptions.targetColor);
    //             targetNodes.merge(node);
    //             });
    //         }
    //     }

    //     if(queryOptions.query == 'degreeCentrality') {
    //       let direction = queryOptions.direction == "DIRECTED" ? true : false;
    //       queryResult = cy.elements().degreeCentralityNormalized({directed: direction});
    //     }
    //     if(queryOptions.query == 'closenessCentrality') {
    //       let direction = queryOptions.direction == "DIRECTED" ? true : false;
    //       queryResult = cy.elements().closenessCentralityNormalized({directed: direction});
    //     }
    //     if(queryOptions.query == 'betweennessCentrality') {
    //       let direction = queryOptions.direction == "DIRECTED" ? true : false;
    //       queryResult = cy.elements().betweennessCentrality({directed: direction});
    //     }
    //     if(queryOptions.query == 'pageRank') {
    //       queryResult = cy.elements().pageRank();
    //     }
    //     else if(queryOptions.query == 'shortestPath') {
    //       let direction = queryOptions.direction == "DIRECTED" ? true : false;
    //       queryResult = cy.elements().dijkstra(cy.getElementById(queryOptions.sourceNodes[0]), undefined, direction).pathTo(cy.getElementById(queryOptions.targetNodes[0]));
    //     }
    //     else if(queryOptions.query == 'kNeighborhood') {
    //       queryResult = cy.collection();
    //       result = cy.elements().kNeighborhood(sourceNodes, queryOptions.limit, queryOptions.direction);
    //       queryResult.merge(result.neighborNodes).merge(result.neighborEdges);
    //     }
    //     else if(queryOptions.query == 'commonStream') {
    //       queryResult = cy.collection();
    //       result = cy.elements().commonStream(sourceNodes, queryOptions.limit, queryOptions.direction);
    //       queryResult.merge(result.commonNodes).merge(result.edgesOnPath).merge(result.nodesOnPath);
    //     }
    //     else if(queryOptions.query == 'pathsBetween') {
    //       queryResult = cy.collection();
    //       result = cy.elements().pathsBetween(sourceNodes, queryOptions.limit, queryOptions.direction);
    //       queryResult.merge(result.resultNodes).merge(result.resultEdges);
    //     }
    //     else if(queryOptions.query == 'pathsFromTo') {
    //       queryResult = cy.collection();
    //       result = cy.elements().pathsFromTo(sourceNodes, targetNodes, queryOptions.limit, queryOptions.furtherDistance, queryOptions.direction);
    //       queryResult.merge(result.nodesOnThePaths).merge(result.edgesOnThePaths);
    //     }
    //   }
    //   catch (e) {
    //     let date = new Date()
    //     errorMessage = "<b>Sorry! Cannot process the given query!</b><br><br>Either format of the query options is wrong or there is a bug in our side.<br><br>Error detail: <br>" + e;
    //     logger.log('---- %s', date + ": \n" + errorMessage.replace(/<br\s*[\/]?>/gi,"\n").replace(/<b\s*\/?>/mg,"") + "\n");
    //     return res.status(500).send({
    //       errorMessage: errorMessage
    //     });
    //   }

    //   try {
    //     if(isCentrality) {
    //       let round2dec = num => Math.round(num * 100) / 100;

    //       if(queryOptions.query == 'degreeCentrality') {
    //         if(queryOptions.direction == "DIRECTED") {
    //           cy.nodes().forEach(function(node){
    //             if(req.params.format === 'sbgnml' || req.params.format === 'sbml') {
    //               if(node.data('label')) {
    //                 node.data('label', node.data('label') + "\n(" + round2dec(queryResult.indegree(node)) + ", " + round2dec(queryResult.outdegree(node)) + ")");
    //               }
    //               else {
    //                 node.data('label', "\n(" + round2dec(queryResult.indegree(node)) + ", " + round2dec(queryResult.outdegree(node)) + ")");
    //               }
    //             }
    //             else if(req.params.format === 'graphml' || req.params.format === 'json'){
    //               if(node.data('label')) {
    //                 node.data('label', node.data('label') + "\n(" + round2dec(queryResult.indegree(node)) + ", " + round2dec(queryResult.outdegree(node)) + ")");
    //               }
    //               else {
    //                 node.data('label', node.data('id') + "\n(" + round2dec(queryResult.indegree(node)) + ", " + round2dec(queryResult.outdegree(node)) + ")");
    //               }
    //             }
    //             if(queryOptions.highlight === true) {
    //               node.addClass('highlight');
    //               node.data('highlightColor', queryOptions.highlightColor);
    //               node.data('highlightWidth', (round2dec(queryResult.indegree(node)) + round2dec(queryResult.outdegree(node))) / 2 * 10);                
    //             }
    //           });
    //         }
    //         else {
    //           cy.nodes().forEach(function(node){
    //             if(req.params.format === 'sbgnml' || req.params.format === 'sbml') {
    //               if(node.data('label')) {
    //                 node.data('label', node.data('label') + "\n(" + round2dec(queryResult.degree(node)) + ")");
    //               }
    //               else {
    //                 node.data('label', "\n(" + round2dec(queryResult.degree(node)) + ")");
    //               }
    //             }
    //             else if(req.params.format === 'graphml' || req.params.format === 'json'){
    //               if(node.data('label')) {
    //                 node.data('label', node.data('label') + "\n(" + round2dec(queryResult.degree(node)) + ")");
    //               }
    //               else {
    //                 node.data('label', node.data('id') + "\n(" +round2dec( queryResult.degree(node)) + ")");
    //               }
    //             }
    //             if(queryOptions.highlight === true) {
    //               node.addClass('highlight');
    //               node.data('highlightColor', queryOptions.highlightColor);
    //               node.data('highlightWidth', round2dec(queryResult.degree(node)) * 10);                
    //             }
    //           });
    //         }
    //       }
    //       else if(queryOptions.query == 'closenessCentrality') {
    //         cy.nodes().forEach(function(node){
    //           if(req.params.format === 'sbgnml' || req.params.format === 'sbml') {
    //             if(node.data('label')) {
    //               node.data('label', node.data('label') + "\n(" + round2dec(queryResult.closeness(node)) + ")");
    //             }
    //             else {
    //               node.data('label', "\n(" + round2dec(queryResult.closeness(node)) + ")");
    //             }
    //           }
    //           else if(req.params.format === 'graphml' || req.params.format === 'json'){
    //             if(node.data('label')) {
    //               node.data('label', node.data('label') + "\n(" + round2dec(queryResult.closeness(node)) + ")");
    //             }
    //             else {
    //               node.data('label', node.data('id') + "\n(" + round2dec(queryResult.closeness(node)) + ")");
    //             }
    //           }
    //           if(queryOptions.highlight === true) {
    //             node.addClass('highlight');
    //             node.data('highlightColor', queryOptions.highlightColor);
    //             node.data('highlightWidth', round2dec(queryResult.closeness(node)) * 10);
    //           }
    //         });
    //       }
    //       else if(queryOptions.query == 'betweennessCentrality') {
    //         cy.nodes().forEach(function(node){
    //           if(req.params.format === 'sbgnml' || req.params.format === 'sbml') {
    //             if(node.data('label')) {
    //               node.data('label', node.data('label') + "\n(" + round2dec(queryResult.betweennessNormalized(node)) + ")");
    //             }
    //             else {
    //               node.data('label', "\n(" + round2dec(queryResult.betweennessNormalized(node)) + ")");
    //             }
    //           }
    //           else if(req.params.format === 'graphml' || req.params.format === 'json'){
    //             if(node.data('label')) {
    //               node.data('label', node.data('label') + "\n(" + round2dec(queryResult.betweennessNormalized(node)) + ")");
    //             }
    //             else {
    //               node.data('label', node.data('id') + "\n(" + round2dec(queryResult.betweennessNormalized(node)) + ")");
    //             }
    //           }
    //           if(queryOptions.highlight === true) {
    //             node.addClass('highlight');
    //             node.data('highlightColor', queryOptions.highlightColor);
    //             node.data('highlightWidth', round2dec(queryResult.betweennessNormalized(node)) * 10);
    //           }
    //         });
    //       }
    //       else if(queryOptions.query == 'pageRank') {
    //         cy.nodes().forEach(function(node){
    //           if(req.params.format === 'sbgnml' || req.params.format === 'sbml') {
    //             if(node.data('label')) {
    //               node.data('label', node.data('label') + "\n(" + round2dec(queryResult.rank(node)) + ")");
    //             }
    //             else {
    //               node.data('label', "\n(" + round2dec(queryResult.rank(node)) + ")");
    //             }
    //           }
    //           else if(req.params.format === 'graphml' || req.params.format === 'json'){
    //             if(node.data('label')) {
    //               node.data('label', node.data('label') + "\n(" + round2dec(queryResult.rank(node)) + ")");
    //             }
    //             else {
    //               node.data('label', node.data('id') + "\n(" + round2dec(queryResult.rank(node)) + ")");
    //             }
    //           }
    //           if(queryOptions.highlight === true) {
    //             node.addClass('highlight');
    //             node.data('highlightColor', queryOptions.highlightColor);
    //             node.data('highlightWidth', round2dec(queryResult.rank(node)) * 100);
    //           }
    //         });
    //       }
    //     }
    //     else {
    //       path = queryResult.difference(sourceNodes).difference(targetNodes);
    //       if(queryOptions.query == 'commonStream') {
    //         let commonNodes = cy.collection();  // change here after graph-algos bug fix
    //         result.commonNodes.forEach(function(node){
    //           commonNodes.merge(node);
    //         });
    //         path = path.difference(commonNodes);
    //         result.commonNodes.forEach(function(node){
    //           node.addClass('target');
    //           node.data('highlightColor', queryOptions.targetColor);
    //           targetNodes.merge(node);
    //         });
    //       }
    //       path.addClass('path');
    //       path.data('highlightColor', queryOptions.pathColor);
    //       queryResult.data('highlightWidth', queryOptions.highlightWidth);
    
    //       if(queryOptions.cropToResult) {
    //         elementsToBeRendered = queryResult.union(sourceNodes).union(targetNodes);
    //       }
    //     }
    //   }
    //   catch (e) {
    //     let date = new Date()
    //     errorMessage = "<b>Sorry! Cannot process the given query!<b><br><br>Either format of the query options is wrong or there is a bug in our side.<br><br>Error detail: <br>" + e;
    //     logger.log('---- %s', date + ": \n" + errorMessage.replace(/<br\s*[\/]?>/gi,"\n").replace(/<b\s*\/?>/mg,"") + "\n");
    //     return res.status(500).send({
    //       errorMessage: errorMessage
    //     });
    //   }
    // }

    let ret = {};
    
    function setJson(result){
        ret["layout"] = {};
        // whether to return edges or not
        elementsToBeRendered.nodes().forEach((ele) => {
            let obj = {};
            obj["position"] = result.positions[ele.id()];
            obj["data"] = { width: result.widths[ele.data().id], height: result.heights[ele.data().id], parent: ele.data("parent") };
            if(ele.data('clusterID') != null) {
                obj["data"]['clusterID'] = parseInt(ele.data('clusterID'));
            }
            ret["layout"][ele.id()] = obj;
        });
        elementsToBeRendered.edges().forEach((ele) => {
        ret["layout"][ele.id()] = { source: ele.data().source, target: ele.data().target };
        });
    }
}
</script>

<style>
#cy {
    width: 90%;
    height: 800px;
    position: absolute;
    left: 5%;
}
</style>