var url = "http://127.0.0.1:5000//jsonified";
/*
var latExists = 0.0;
var lngExists = 0.0;
// Grab the data with d3
d3.json(url, function(data) {

  // Loop through data, select keys for treemap
  response = data[0][0]
  console.log(response);

          var treemap = d3.select("#treemap").append("svg")

            .chart("#treemap")

              .value("size")
              .sortable("_DESC_")
              .zoomable()
              .collapsible()
              //.duration()
              .colors(['#FF0000', '#00FF00', '#0000FF'])
              ;

          treemap.draw(response);
})
*/



(function() {
    d3.json("https://rawgit.com/annaghi/d3.chart.layout.hierarchy/master/example/data/flare.json", function(error, json) {

      var treemap = d3.select("#treemap").append("svg")

        //.chart("treemap")

          .value("size")
          .sortable("_DESC_")
          //.zoomable()
          .collapsible()
          //.duration()
          //.colors(['#FF0000', '#00FF00', '#0000FF'])
          ;

      treemap.draw(json);

    });
  }());