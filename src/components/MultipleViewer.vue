<template>
    <div id="ViewerContainer"></div>    
</template>

<script>
import * as d3 from 'd3'

export default {
    name: 'MultipleViewer',
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
            let max_y = {}
            let min_y = {}
            for (let j = 0; j < results_names.length; j++) {
                // We will compute this values later so we give them extreme values
                max_y[results_names[j]] = - 1000000000
                min_y[results_names[j]] = 1000000000
            }

            // Transform the data into a format that can be plotted easily with d3
            for (let i = 0; i < results_y.length; i++) {
                for (let j = 0; j < results_names.length; j++) {
                    resultsDict = {}
                    resultsDict["y"] = results_y[i][j]
                    resultsDict["name"] = results_names[j]
                    resultsDict["times"] = times[i]
                    results.push(resultsDict)
                    if (results_y[i][j] > max_y[results_names[j]]) {
                        max_y[results_names[j]] = results_y[i][j]
                    }
                    if (results_y[i][j] < min_y[results_names[j]]) {
                        min_y[results_names[j]] = results_y[i][j]
                    }
                }
            }

            const margin = {top: 30, right: 50, bottom: 30, left: 50}
            const width = 300 - margin.left - margin.right
            const height = 300 - margin.top - margin.bottom

            var sumsat = d3.group(results, d => d.name) // Group the data by name

            var svg = d3.select("#ViewerContainer")
                .selectAll("uniqueChart")
                .data(sumsat)
                .enter()
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("class", "uniqueChart")
                .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)

            const x_scale = d3.scaleLinear()
                .domain([0, times[times.length-1]])
                .range([0, width])

            // Add the x-axis
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x_scale).ticks(5).tickFormat(d3.format("d")))
                .append("text")
                    .attr("x", width/2)
                    .attr("y", 30)
                    .attr("fill", "black")
                    .text("Time")

            var y_scales = {}

            for (let i = 0; i < results_names.length; i++) {
                y_scales[results_names[i]] = d3.scaleLinear()
                    .domain([min_y[results_names[i]] - Math.abs(0.1*min_y[results_names[i]]), max_y[results_names[i]]*1.1])
                    .range([height, 0])
            }

            // Giving a different y-axis to each chart
            d3.selectAll(".uniqueChart").each(function(d){
                var svg = d3.select(this)
                svg.append("g")
                    .call(d3.axisLeft(y_scales[d[0]]).ticks(5).tickFormat(d3.format(".2s")))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
            })

            const colors = d3.scaleOrdinal(d3.schemeCategory10).domain([...Array(results_names.length).keys()])

            // Add lines
            svg.append("path")
                .attr("fill", "none")
                .attr("stroke", function(d){ return colors(d[0]) })
                .attr("stroke-width", 1.9)
                .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x_scale(d.times); })
                        .y(function(d) { return y_scales[d.name](+d.y); })(d[1]);
                })

            // Add titles
            svg.append("text")
                .attr("text-anchor", "start")
                .attr("y", -5)
                .attr("x", 0)
                .text(function(d){ return(d[0])})
                .style("fill", function(d){ return colors(d[0]) })
        }
    }
}
</script>

<style>
#ViewerContainer {
    width: 100%;
}
</style>