var d3 = require('d3');

/**
 * Expose BarChart
 */
module.exports = BarChart;

function BarChart (selector) {
  if (!(this instanceof BarChart)) return new BarChart(selector);
  var data = [4, 8, 15, 16, 23, 42];

  var dataMD = [
    { name: "Locke", value: 4 },
    { name: "Reyes", value: 8 },
    { name: "Ford", value: 15 },
    { name: "Jarrah", value: 16 },
    { name: "Shephard", value: 23 },
    { name: "Kwon", value: 42 }
  ];

  // makeDivChart(selector, data);
  makeSvgChart(selector, dataMD);
}

/**
 * Makes an SVG Chart
 * @param  {String} selector css selector string
 * @param  {Array} data      graph dataz
 */
function makeSvgChart (selector, data) {
  var width = 420
    , barHeight = 20;

  // map input domain to output range
  var x = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([0, width]);

  // select chart container and set width and height
  var chart = d3.select(selector)
      .attr("width", width)
      .attr("height", barHeight * data.length);

  // use data join to create a 'g' element for each
  // data point, then translate the 'g' element vertically
  var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  // Append a 'rect' to each 'g' and style it properly
  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1);

  // append a 'text' el to the 'g' and style and set content
  bar.append("text")
      .attr("x", function(d) { return x(d.value) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function (d) { return d.value; });
}

/**
 * Makes a bar chart based on DIVs
 * @param  {String} selector CSS selector string
 * @param  {Array} data Array of data
 */
function makeDivChart (selector, data) {
  // map from data space (domain (4-42)) to display space (range 
  // (px)).
  // this is a function that returns the scaled display value 
  // in the range for a given data value in the domain
  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

  // select chart container
  d3.select(selector)
    // define the elements we 'want' to exist using data joins:
    // "Thinking with joins means declaring a relationship 
    // between a selection (such as "circle") and data, and 
    // then implementing this relationship through the three 
    // enter, update and exit states."
    .selectAll("div")
      // join data to selection, so that each bar is bound to 
      // a piece of data in our array
      .data(data)
    // since selection is currently empty, only need to handle
    // the enter selection representing new data, so create 
    // missing elements
    .enter().append("div")
      // set width of new bar to a function of bound data
      .style("width", function (d) { return x(d) + "px"; })
      // set text of bar to a function of bound data
      .text(function (d) { return d; });
}