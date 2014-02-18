var d3 = require('d3');

/**
 * Expose BarChart
 */
module.exports = BarChart;

/**
 * BarChart instance
 * @param {string} css selector string, ie. ".class"
 */
function BarChart (selector) {
  if (!(this instanceof BarChart)) return new BarChart(selector);
  this.selector = selector;

  return this;
}

/**
 * create vertical SVG chart with data
 * @param  {Array} data
 *   @property {String} name
 *   @property {Number} value
 * @return {BarChart}
 */
BarChart.prototype.makeVerticalSvgChart = function (data) {
  var width = 960
    , height = 500
    , barWidth = width / data.length;

  var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([height, 0]);

  var chart = d3.select(this.selector)
      .attr("width", width)
      .attr("height", height);

  var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .attr("width", barWidth -1);

  bar.append("text")
    .attr("x", barWidth / 2)
    .attr("y", function(d) { return y(d.value) + 3; })
    .attr("dy", ".75em")
    .text(function(d) { return d.name; });

  return this;
}

/**
 * Makes an SVG Chart
 * @param  {Array} data      graph dataz
 */
BarChart.prototype.makeSvgChart = function (data) {
  var width = 420
    , barHeight = 20;

  // map input domain to output range
  var x = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([0, width]);

  // select chart container and set width and height
  var chart = d3.select(this.selector)
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

  return this;
}

/**
 * Makes a bar chart based on DIVs
 * @param  {Array} data Array of data
 */
BarChart.prototype.makeDivChart = function (data) {
  // map from data space (domain (4-42)) to display space (range 
  // (px)).
  // this is a function that returns the scaled display value 
  // in the range for a given data value in the domain
  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

  // select chart container
  d3.select(this.selector)
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

  return this;
}