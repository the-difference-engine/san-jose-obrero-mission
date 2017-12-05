function getResident(residentId) {
  var url = "http://localhost:3004/api/v1/residents/" + residentId;
  //var url = "http://localhost:3004/api/v1/residents/5";
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
        debugger
console.log(url)
    fetch(url, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    })
    .then((resp) => resp.json())
    .then(function(data) {

      //$(function() {
        //debugger
        //var table = $("<div />").addClass("table2");
        //var tr = $("<div />").addClass("table-row");
        //tr.append($("<span />")).addClass("table-head");
        //var thead = $("<span />").addClass("table-head");
        //$.each(data,function(_,text) {
          //tr.append("<span class='table-head'> "+text+" </span>");
          //tr.appendTo(thead);
        //});

        //tr.append("<div class='table-cell'> "+data.full_name+" </div>");
        //var tbody = $("<div />").addClass("tbody");
        //thead.appendTo(table);
        //tbody.appendTo(table);
        //table.appendTo("#table1");
      //});
      console.log(data)
        console.log('this shit worked')
    });
}
