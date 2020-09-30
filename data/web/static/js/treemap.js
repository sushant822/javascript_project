url = "http://127.0.0.1:5000/post2"

d3.json(url, function (d){
    return {
        postalCode: d[0][0].post,
        houseCount: d[0][0].count,
        avgPrice: d[0][0].mean,
    }
}, function (data) {
    d3.select("body").style("background-color", "black");

    const map = new Datamap({
        scope: "ca",
        element: document.getElementById("mapContainer"),
        responsive: true,
        geographyConfig: {
            highlightOnHover: true,
        }
    })
    }
    )