url = 'http://127.0.0.1:5000/jsonified';

console.log("Calgary Data v2");
console.log(url)

d3.json(url, function(response){
    console.log(response[0][0]);
})
