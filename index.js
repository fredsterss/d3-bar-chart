var d3 = require('d3');

/**
 * Expose BarChart
 */
module.exports = BarChart;

function BarChart (selector) {
  if (!(this instanceof BarChart)) return new BarChart(selector);
  var data = [4, 8, 15, 16, 23, 42];  
  makeDivChart(selector, data);
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