<template>
    <svg id="ViewerContainer"></svg>    
</template>

<script>
import * as d3 from 'd3'

export default {
    name: 'SingleViewer',
    props: ['times', 'results_names', 'results_y'],
    mounted() {
        this.createViewer()
    },
    methods: {
        createViewer() {

            const times = this.times
            const results_names = this.results_names
            const results_y = this.results_y

            let results = []
            let resultsDict = {}
            let max_y = 0
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
                }
            }

            const margin = {top: 20, right: 20, bottom: 50, left: 100}
            const width = 800 - margin.left - margin.right
            const height = 500 - margin.top - margin.bottom

            const svg = d3.select("#ViewerContainer")
            svg.selectAll("*").remove()
            var svg_container = svg.attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .append("g")
                                   .attr("transform", `translate(${margin.left}, ${margin.top})`)

            var sumsat = d3.group(results, d => d.name) // Group the data by name

            const x_scale = d3.scaleLinear()
                              .domain([0, times.length-1])
                              .range([0, width])

            const y_scale = d3.scaleLinear()
                              .domain([0, max_y*1.1])
                              .range([height, 0])

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

            svg_container.append("g")
                         .call(d3.axisLeft(y_scale).ticks(10).tickFormat(d3.format(".2s")))

            const colors = d3.scaleOrdinal(d3.schemeCategory10).domain([...Array(results_names.length).keys()])

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
        }
    }
}
</script>