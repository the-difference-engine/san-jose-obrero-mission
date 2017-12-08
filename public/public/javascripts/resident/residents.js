function getAllResidents () {
  var url = "http://localhost:3004/api/v1/residents";
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      $(function() {
        var table = $("<div />").addClass("table2");
        var tr = $("<div />").addClass("table-row");
        tr.append($("<span />")).addClass("table-head");
        var thead = $("<span />").addClass("table-head");
        $.each(data.table_headers,function(_,text) {
          tr.append("<span class='table-head'> "+text+" </span>");
          tr.appendTo(thead);
        });
        var tbody = $("<div />").addClass("tbody");
        var t = 1;
        $.each(data.residents,function(_,obj) {
          tr = $(`<a href="residents/${obj.id}"></a>`).addClass("table-row");
          //tr = $(`<a href="residents/${obj.id}"></a>`).addClass("table-row");
          obj.id = t;
          t += 1;
          tr.append("<div class='table-cell'> "+obj.id+" </div>");
          tr.append("<div class='table-cell'> "+obj.first_name+" </div>");
          tr.append("<div class='table-cell'> "+obj.gender+" </div>");
          var date = new Date(obj.date);
          var rando = Math.floor((Math.random() * 3) + 1);
          var tenure = (date.getMonth()+1+rando)-(date.getMonth()+1);
          tr.append("<div class='table-cell'> "+(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +" </div>");
          tr.append("<div class='table-cell'> "+(date.getMonth()+1+rando) + "/" + date.getDate() + "/" + date.getFullYear() +" </div>");
          tr.append("<div class='table-cell'> "+(tenure+ " month(s)")+" </div>");
          tr.append("<div class='table-cell'> "+obj.documented+" </div>");
          tr.append("<div class='table-cell'> "+obj.bed_id+" </div>");
          tr.appendTo(tbody);

        });
        thead.appendTo(table);
        tbody.appendTo(table);
        table.appendTo("#residents");
      });
    });
}
getAllResidents();
