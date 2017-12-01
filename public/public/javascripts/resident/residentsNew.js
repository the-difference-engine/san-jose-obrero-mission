function getResident(test) {
    console.log("residentID:", test);
  var url = "http://localhost:3000/api/v1/residents/" + test;
  //var url = "http://localhost:3004/api/v1/residents/5";
  console.log("url");
  console.log(url);
  console.log("url");
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    console.log(url);
    fetch(url, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    })
    .then((resp) => {
        console.log("resp", resp.json());
        resp.json()}) 
    .then(function(data) {
        console.log('this shit worked');
    });
}

