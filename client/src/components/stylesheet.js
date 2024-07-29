// define stylesheet
import cytoscape from 'cytoscape';
import { getTextWidth } from './functions';

export function adjustStylesheet() {
    return cytoscape.stylesheet()
        .selector('node')
            .style({
                'background-color': (node) => node.data('backgroundColor') || '#ffffff',
                'width': (node) => 1.2*getTextWidth(12, "Arial", node.data("label")),
                'height': (node) => node.data('height') || 30,
                'text-valign': 'center',
                'text-wrap': 'wrap',
                'font-size': 12,
                'border-width': 2,
                'border-color': '#555555',
                'label': (node) => node.data('label') || ''
            })
        .selector('node.compartment')
            .style({
                'shape': 'barrel',
                'text-valign': 'bottom',
                'text-margin-y': 3,
                'background-opacity': 0.2,
                'border-width': 4
            })
        .selector('node.reaction')
            .style({
                'shape': 'rectangle',
                'width': (node) => 1.2*getTextWidth(12, "Arial", node.data("label")),
                'height': (node) => node.data('height') || 15,
                'text-valign': 'center',
                'background-opacity': 0,
                'border-width': 1,
            })
        .selector('node[sboTerm = 334]')
            .style({ 'shape': 'rhomboid' })
        .selector('node[sboTerm = 253]')
            .style({
                'shape': 'cut-rectangle',
                'text-valign': 'bottom',
                'background-opacity': 0.3,
                'text-margin-y': 3
            })
        .selector('node[sboTerm = 289]')
            .style({
                'shape': 'cut-rectangle',
                'border-style': 'dashed',
                'background-opacity': 0.3,
                'text-margin-y': 3
            })
        .selector('node[sboTerm = 291]')
            .style({
                'shape': 'polygon',
                'shape-polygon-points': "-1, 1, 1, -1, 0.625, -0.625, 0.5, -0.75, 0.25, -0.875,\n\
                0, -0.875, -0.25, -0.875, -0.5, -0.75, -0.625, -0.625, -0.75, -0.375, -0.875, 0,\n\
                -0.75, 0.375, -0.625, 0.625, -0.5, 0.75, -0.25, 0.875, 0, 0.875, 0.25, 0.875,\n\
                0.5, 0.75, 0.625, 0.625, 0.75, 0.375, 0.875, 0, 0.75, -0.375, 0.625, -0.625",
                'width': (node) => node.data('width') || 25,
                'height': (node) => node.data('height') || 25
        })
        .selector('node[sboTerm = 298]')
            .style({
                'shape': 'ellipse',
                'border-style': 'double',
                'background-opacity': 0.8
            })      
        .selector('node[sboTerm = 243]')
            .style({ 'shape': 'rectangle' })
        .selector('node[sboTerm = 252]')
            .style({ 'shape': 'round-rectangle' })
        .selector('node[sboTerm = 327]')
            .style({
                'shape': 'ellipse',
                'background-opacity': 0.8,
                'width': (node) => node.data('width') || 30,
                'height': (node) => node.data('height') || 30
            })
        .selector('node[sboTerm = 284]')
            .style({
                'shape': 'polygon',
                'shape-polygon-points': "-1, -0.8, -0.96, -0.86, -0.87, -0.96, -0.8, -1, 0.25, -1, \n\
                0.31, -0.96, 0.41, -0.86, 0.45, -0.8, 0.45, 0.8, 0.49, 0.86, 0.59, 0.96, 0.7, 1, 0.8, \n\
                1, 0.86, 0.96, 0.96, 0.86, 1, 0.8, 1, -0.8, 0.96, -0.86, 0.86, -0.96, 0.8, -1, 0.65, \n\
                -1, 0.59, -0.96, 0.49, -0.86, 0.45, -0.8, 0.45, 0.8, 0.41, 0.86, 0.31, 0.96, 0.25, 1, \n\
                -0.8, 1, -0.84, 0.96, -0.96, 0.86, -1, 0.8",
                'background-opacity': 0.8
            })
        .selector('node[sboTerm = 358]')
            .style({ 'shape': 'hexagon' })
        .selector('node[sboTerm = 244]')
            .style({
                'shape': 'polygon',
                'shape-polygon-points': "-1, -1, 0, -0.6, 1, -1, 1, 0.6, 0, 1, -1, 0.6"
            })
        .selector('node[sboTerm = 278]')
            .style({
                'shape': 'polygon',
                'shape-polygon-points': "-0.5, -1, 1, -1, 0.5, 1, -1, 1"
            })
        .selector('node[sboTerm = 247]')
            .style({
                'shape': 'ellipse',
                'background-opacity': 0.6
            })
        .selector('node[sboTerm = 285]')
            .style({
                'shape': 'ellipse',
                'border-width': 0,
                'background-opacity': 0.4
            })
        .selector('node[sboTerm = 173]')
            .style({
                'shape': 'ellipse',
                'label': 'AND',
                'text-valign': 'center',
                'width': 30,
                'height': 30,
                'background-color': "#F2F2F2"
            })
        .selector('node[sboTerm = 174]')
            .style({
                'shape': 'ellipse',
                'label': 'OR',
                'text-valign': 'center',
                'width': 25,
                'height': 25,
                'background-color': "#F2F2F2"
            })
        .selector('node[sboTerm = 238]')
            .style({
                'shape': 'ellipse',
                'label': 'NOT',
                'text-valign': 'center',
                'width': 25,
                'height': 25,
                'background-color': "#F2F2F2"
            })
        .selector('node[sboTerm = 398]')
            .style({
                'shape': 'ellipse',
                'width': 25,
                'height': 25,
                'background-color': "#F2F2F2"
            })
        .selector('node.source')
            .style({
                'underlay-color': (node) => node.data('highlightColor') || "#00ff00",
                'underlay-padding': (node) => node.data('highlightWidth') || "10px",
                'underlay-opacity': 0.5
            })
        .selector('node.target')
            .style({
                'underlay-color': (node) => node.data('highlightColor') || "#ff0000",
                'underlay-padding': (node) => node.data('highlightWidth') || "10px",
                'underlay-opacity': 0.5
            })
        .selector('node.path')
            .style({
                'underlay-color': (node) => node.data('highlightColor') || "#ffff00",
                'underlay-padding': (node) => node.data('highlightWidth') || "10px",
                'underlay-opacity': 0.5
            })
        .selector('node.highlight')
            .style({
                'underlay-color': (node) => node.data('highlightColor') || "#00ff00",
                'underlay-padding': (node) => node.data('highlightWidth') || "0px",
                'underlay-opacity': (node) => node.data('highlightWidth') ? 0.5 : 0 
            })
        .selector('edge')
            .style({
                'curve-style': 'bezier',
                'line-color': '#555555',
                'width': 1.5
            })
        .selector('edge.productEdge')
            .style({
                'line-color': '#555555',
                'target-arrow-shape': 'triangle',
                'target-arrow-color': '#555555',
                'arrow-scale': 1.25
            })
        .selector('edge.modifierEdge')
            .style({
                'line-color': '#555555',
                'target-arrow-shape': 'triangle-tee',
                'target-arrow-color': '#555555',
                'target-arrow-fill': 'hollow',
                'arrow-scale': 1.25
            })
        .selector('edge[sboTerm = 13]')
            .style({
                'line-color': '#555555',
                'target-arrow-shape': 'circle',
                'target-arrow-color': '#555555',
                'target-arrow-fill': 'hollow',
                'arrow-scale': 1.25
            })
        .selector('edge[sboTerm = 537]')
            .style({
                'line-color': '#555555',
                'target-arrow-shape': 'tee',
                'target-arrow-color': '#555555',
                'arrow-scale': 1.25
            })
        .selector('edge[sboTerm = 594]')
            .style({
                'line-color': '#555555',
                'target-arrow-shape': 'diamond',
                'target-arrow-color': '#555555',
                'target-arrow-fill': 'hollow',
                'arrow-scale': 1.25
            })
        .selector('edge[sboTerm = 459]')
            .style({
                'line-color': '#555555',
                'target-arrow-shape': 'triangle',
                'target-arrow-color': '#555555',
                'target-arrow-fill': 'hollow',
                'arrow-scale': 1.25
            })
        .selector('edge[sboTerm = 461]')
            .style({
                'line-color': '#555555',
                'target-arrow-shape': 'triangle-tee',
                'target-arrow-color': '#555555',
                'target-arrow-fill': 'hollow',
                'arrow-scale': 1.25
            })
        .selector('edge[sboTerm = 462]')
            .style({
                'line-color': '#555555',
                'line-style': 'dashed',
                'target-arrow-shape': 'circle',
                'target-arrow-color': '#555555',
                'target-arrow-fill': 'hollow',
                'arrow-scale': 1.25
            })
        .selector('edge[sboTerm = 536]')
            .style({
                'line-color': '#555555',
                'line-style': 'dashed',
                'target-arrow-shape': 'tee',
                'target-arrow-color': '#555555',
                'arrow-scale': 1.25
            })
        .selector('edge.path')
            .style({
                'underlay-color': (edge) => edge.data('highlightColor') || "#ffff00",
                'underlay-padding': (edge) => edge.data('highlightWidth') || "10px",
                'underlay-opacity': 0.5
            })
};
