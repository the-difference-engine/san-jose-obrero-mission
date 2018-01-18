// function getAllBeds() {
//     var url = "http://localhost:3004/api/v1/beds";
//     fetch(url)
//         .then((resp) => resp.json())
//         .then(function(data){
//             document.querySelector('#numOfBeds').innerHTML = data.beds.length;
//             $(function(){
//                 var table = $("<div />").attr('id', 'bedsTable').addClass("bedsTable")
//                 var thead = $("<span />").addClass("table-head");
//                 var tr = $("<div />").addClass("head-table-row");
//                 tr.append("<span class='table-cell-head'>Room Number</span>");
//                 tr.append("<span class='table-cell-head'>Name</span>");
//                 tr.append("<span class='table-cell-head'>Top or Bottom</span>");
//                 tr.append("<span class='table-cell-head'>Occupied</span>");
//                 tr.append("<span class='table-cell-head'>Resident</span>");
//                 tr.appendTo(thead);
//                 var tbody = $("<div />").attr("id", "table-body").addClass("tbody");
//                 $.each(data.beds,function(_,obj) {
//                     rowWrapper = $("<div />").attr("id", "table-body").addClass("tbody");
//                     tr = $(`<a href="beds/${obj.id}"></a>`).attr("id", "row").addClass("table-row");
//                     tr.append(`<div class='table-cell'>${obj.room_id || "N/A"}</div>`);
//                     tr.append(`<div class='table-cell'>${obj.name || "N/A"}</div>`);
//                     tr.append(`<div class='table-cell'>${obj.top_or_bottom || "N/A"}</div>`);
//                     tr.append(`<div class='table-cell'>${obj.occupied || "N/A"}</div>`);
//                     tr.append(`<div class='table-cell'>${obj.resident_id || "N/A"}</div>`);
//                     tr.appendTo(rowWrapper);
//                     rowWrapper.appendTo(tbody);
//                 });
//                 thead.appendTo(table);
//                 tbody.appendTo(table);
//                 table.appendTo("#beds");
//             });
//         });
// }

// getAllBeds();


function getBeds() {
//   var url = "https://qa-san-jose.herokuapp.com/api/v1/residents";
  var url = "http://localhost:3004/api/v1/beds";
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      $(function() {
        var label = $('<label for="bed_id">' + 'BED' + "</label>");
        var select = $('<select name="bed_id"></select>').addClass("form-control");
        // var noneAvailable = data.find((o, i) => {
        //   if (o.occupied === false) {
        //     return true;
        //   }
        // });
        // console.log("None Available", noneAvailable);
        for (var i = 0; i < data.length; i++) {
          if (data[i].occupied === false) {
            var option = $(
              select.append('<option value=' + data[i].bed_id + '>' + data[i].bed_id + '</option>')
            );
          } 
        }
        select.appendTo(label);
        option.appendTo(select);
        label.appendTo("#bed_id");
        
      });
    });
}
getBeds();