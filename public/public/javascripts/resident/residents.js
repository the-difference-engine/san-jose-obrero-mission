var initDoc;

function clearFilter(){
    console.log("this worked");
    // document = initDoc;
    location.reload();
    // getAllResidents();
}

function getAllResidents () {
  var url = "https://qa-san-jose.herokuapp.com/api/v1/residents";
  //var url = "http://localhost:3000/api/v1/residents";
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      document.querySelector('#numOfResidents').innerHTML = data.residents.length;
      $(function() {
        var table = $("<div />").attr('id', 'table2').addClass("table2")
        var thead = $("<span />").addClass("table-head");
        var tr = $("<div />").addClass("head-table-row");
        tr.append('<span class="table-cell-head-one">Picture</span>');        
        // $.each(data.table_headers,function(_,text) {
        //   tr.append("<span class='table-cell-head' > "+text+" </span>");
        //   tr.appendTo(thead);
        // });
        tr.append("<span class='table-cell-head'>Full Name</span>");
        tr.append("<span class='table-cell-head'>Gender</span>");
        tr.append("<span class='table-cell-head'>Admitted</span>");
        tr.append("<span class='table-cell-head'>Released</span>");
        tr.append("<span class='table-cell-head'>Tenure</span>");
        tr.append("<span class='table-cell-head'>Status</span>");
        tr.append("<span class='table-cell-head'>Bed #</span>");
        tr.appendTo(thead);
        var tbody = $("<div />").attr("id", "table-body").addClass("tbody");
        $.each(data.residents,function(_,obj) {
          rowWrapper = $("<div />").attr("id", "row").addClass("row-wrapper");
          tr = $(`<a href="residents/${obj.id}"></a>`).attr("id", "row").addClass("table-row");
          tr.append(`<img src="${obj.image || "/images/default_avatar.png"}" alt="" class="avatar-container">`);
          tr.append("<div id='name' class='table-cell'>" + obj.first_name + ' ' + obj.last_name + "</div>");
          tr.append("<div class='table-cell'>" + obj.gender.charAt(0).toUpperCase() + obj.gender.slice(1) + "</div>");
          var date = new Date(obj.date);
          var rando = Math.floor((Math.random() * 3) + 1);
          tr.append("<div class='table-cell'>" + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +"</div>");
          tr.append("<div class='table-cell'>" + (date.getMonth()+1+rando) + "/" + date.getDate() + "/" + date.getFullYear() + "</div>");
          tr.append(`<div class='table-cell'>${obj.length_of_homelessness || "N/A"} day(s)</div>`);
          tr.append(`<div class='table-cell'>${obj.documented || "N/A"}</div>`);
          tr.append("<div class='table-cell'>" + obj.bed_id + "</div>");
          tr.appendTo(rowWrapper);
          rowWrapper.appendTo(tbody);
        });
        thead.appendTo(table);
        tbody.appendTo(table);
        table.appendTo("#residents");
        // initDoc = $.extend({}, document);
      });
    });
}

getAllResidents();

function nameSearch() {
    var input, filter, row, i;
    input = document.getElementById("nameSearch");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("table-body");
    rows = tableBody.getElementsByTagName("a")

    for (i = 0; i < rows.length; i++) {
        a = rows[i].getElementsByTagName("div")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function sortMale(){
    var tableBody, rows;
    tableBody = document.getElementById("table-body");
    rows = tableBody.getElementsByTagName("a");
    for (i=0; i < rows.length; i++){
        a = rows[i].getElementsByTagName("div")[1];
        if (a.innerHTML == "Male") {
            rows[i].style.display = "";            
        } else {
            rows[i].style.display = "none";
        }
    }
}

function sortFemale(){
    var tableBody, rows;
    tableBody = document.getElementById("table-body");
    rows = tableBody.getElementsByTagName("a");
     for (i = 0; i < rows.length; i++) {
         a = rows[i].getElementsByTagName("div")[1];
         if (a.innerHTML == "Female") {
             rows[i].style.display = "";
         } else {
             rows[i].style.display = "none";
         }
    }
}
