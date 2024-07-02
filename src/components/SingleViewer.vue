<template>
    <svg id="ViewerContainer"></svg>    
</template>

<script>
import * as d3 from 'd3'
import { getTextWidth } from "./functions.js"

export default {
    name: 'SingleViewer',
    props: ['times', 'results_names', 'results_y'],
    mounted() {
        this.createViewer()
    },
    methods: {
        createViewer() {

            let times = this.times
            const results_names = this.results_names
            let results_y = this.results_y

            //We don't need all the data points to plot the graph, so we can reduce the number of points to 1000
            let step = Math.ceil(times.length / 1000);

            var new_times = []
            let new_results_y = []
            for (let i = 0; i < times.length; i += step) {
                new_times.push(times[i])
                new_results_y.push(results_y[i])
            }
            times = new_times
            results_y = new_results_y

            let results = []
            let resultsDict = {}
            let max_y = - 1000000000
            let min_y = 1000000000
            for (let i = 0; i < results_y.length; i++) {
                for (let j = 0; j < results_names.length; j++) {
                    resultsDict = {}
                    resultsDict["y"] = results_y[i][j]
                    resultsDict["name"] = results_names[j]
                    resultsDict["times"] = times[i]
                    results.push(resultsDict)
                    if (results_y[i][j] > max_y) {
                        max_y = results_y[i][j]
                    }
                    if (results_y[i][j] < min_y) {
                        min_y = results_y[i][j]
                    }
                }
            }

            const margin = {top: 20, right: 50, bottom: 50, left: 50}
            const width = 0.9*window.innerWidth - margin.left - margin.right
            const height = 500 - margin.top - margin.bottom

            const svg = d3.select("#ViewerContainer")
            svg.selectAll("*").remove()
            var svg_container = svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)

            var sumsat = d3.group(results, d => d.name) // Group the data by name to make it easier to plot

            const x_scale = d3.scaleLinear()
                .domain([0, times[times.length-1]])
                .range([0, width])

            const y_scale = d3.scaleLinear()
                .domain([min_y - Math.abs(0.1*min_y), max_y*1.1])
                .range([height, 0])

            // Add the x-axis
            svg_container.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x_scale))
                .call(g => g.append("text")
                    .attr("fill", "black")
                    .attr("x", (width - margin.right + margin.left)/2)
                    .attr("y", margin.bottom-10)
                    .attr("text-anchor", "center")
                    .attr("font-size", "12")
                    .text("Time"))

            // Add the y-axis
            svg_container.append("g")
                         .call(d3.axisLeft(y_scale).ticks(10).tickFormat(d3.format(".2s")))

            const colors = d3.scaleOrdinal(d3.schemeCategory10).domain([...Array(results_names.length).keys()])

            // Add the lines
            svg_container.selectAll(".line")
                .data(sumsat)
                .join("path")
                .attr("fill", "none")
                .attr("stroke", d => colors(d[0]))
                .attr("stroke-width", 1.5)
                .attr("d", function(d) {
                return d3.line()
                    .x(function(d) { return x_scale(d.times); })
                    .y(function(d) { return y_scale(+d.y); })(d[1]);
            })

            let width_legend = 0
            for (let name of results_names) {
                width_legend = Math.max(width_legend, getTextWidth(12, "Arial", name) + 20)
            }

            // Add the legend
            svg_container.selectAll("mydots")
                .data(sumsat)
                .enter()
                .append("circle")
                    .attr("cx", width - width_legend - 30)
                    .attr("cy", function(_,i){ return 17 + i*17})
                    .attr("r", 7)
                    .style("fill", function(d){ return colors(d[0])})
                
            svg_container.selectAll("mylabels")
                .data(sumsat)
                .enter()
                .append("text")
                    .attr("x", width - width_legend - 10)
                    .attr("y", function(d,i){ return 17 + i*17 + 2})
                    .style("fill", function(d){ return colors(d[0])})
                    .text(function(d){ return d[0]})
                    .attr("text-anchor", "left")
                    .style("dominant-baseline", "middle")
        }
    }
}
</script>