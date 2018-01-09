function getAllResidents () {
  // var url = "https://qa-san-jose.herokuapp.com/api/v1/residents";
  var url = "http://localhost:3000/api/v1/residents";
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      document.querySelector('#numOfResidents').innerHTML = data.residents.length;
      $(function() {
        var table = $("<div />").addClass("table2");
        var tr = $("<div />").addClass("head-table-row");
        var thead = $("<span />").addClass("table-head");
        tr.append('<span class="table-cell-head-one">Picture</span>')
        $.each(data.table_headers,function(_,text) {
          tr.append("<span class='table-cell-head'> "+text+" </span>");
          tr.appendTo(thead);
        });
        var tbody = $("<div />").attr("id", "table-body").addClass("tbody");
        $.each(data.residents,function(_,obj) {
          rowWrapper = $("<div />").attr("id", "row").addClass("row-wrapper");
          tr = $(`<a href="residents/${obj.id}"></a>`).attr("id", "row").addClass("table-row");
          tr.append(`<img src="${obj.image || "/images/default_avatar.png"}" alt="" class="avatar-container">`);
          tr.append("<div id='name' class='table-cell'> "+obj.first_name+ ' '+obj.last_name+" </div>");
          tr.append("<div class='table-cell'> "+obj.gender+" </div>");
          var date = new Date(obj.date);
          var rando = Math.floor((Math.random() * 3) + 1);
          tr.append("<div class='table-cell'> "+(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +" </div>");
          tr.append("<div class='table-cell'> "+(date.getMonth()+1+rando) + "/" + date.getDate() + "/" + date.getFullYear() +" </div>");
          tr.append(`<div class='table-cell'> ${obj.length_of_homelessness || "N/A"} day(s) </div>`);
          tr.append(`<div class='table-cell'> ${obj.documented || "N/A"}</div>`);
          tr.append("<div class='table-cell'> "+obj.bed_id+" </div>");
          tr.appendTo(rowWrapper);
          rowWrapper.appendTo(tbody);
        });
        thead.appendTo(table);
        tbody.appendTo(table);
        table.appendTo("#residents");
      });
    });
}
getAllResidents();

function nameSearch() {
    var input, filter, row, i;
    input = document.getElementById("nameSearch");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("table-body");
    rows = tableBody.getElementsByTagName('a')

    for (i = 0; i < rows.length; i++) {
        a = rows[i].getElementsByTagName("div")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

