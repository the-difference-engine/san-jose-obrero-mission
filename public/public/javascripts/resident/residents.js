function submitResidentsForm() {
  debugger
    var url = "http://localhost:3000/api/v1/residents";
    var data = {
        resident: {
              first_name: document.forms.residents.first_name.value,
              last_name: document.forms.residents.last_name.value,
              date: document.forms.residents.date.value,
              hmis_number: document.forms.residents.hmis_number.value,
              hmis_entry_date: document.forms.residents.hmis_entry_date.value,
              documented: document.forms.residents.documented.value,
              gender: document.forms.residents.gender.value,
              ethnicity: document.forms.residents.ethnicity.value,
              bed_id: document.forms.residents.bed_id.value,
              resident_race: document.forms.residents.resident_race.value,
              cause_of_homeslessness: document.forms.residents.cause_of_homelessness.value,
              length_of_homelessness: document.forms.residents.length_of_homelessness.value,
              prior_living_situation: document.forms.residents.prior_living_situation.value,
              number_of_shelters: document.forms.residents.number_of_shelters.value,
              chronically_homeless: document.forms.residents.chronically_homeless.value
        }
    };

    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    fetch(url, {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
    });
}


//var url = "http://localhost:3004/api/v1/residents/1";
//fetch(url)
//.then((resp) => resp.json())
//.then(function(data) {
  //debugger;
//});

//function getResident(residentId) {
  //var url = "http://localhost:3004/api/v1/residents/" + residentId;
  ////var url = "http://localhost:3004/api/v1/residents/5";
    //var myHeaders = new Headers();

    //myHeaders.append('Content-Type', 'application/json');
//console.log(url)
    //fetch(url, {
        //method: 'GET',
        //headers: myHeaders,
        //mode: 'cors',
        //cache: 'default'
    //})
    //.then((resp) => resp.json())
    //.then(function(data) {
        //debugger
        //console.log('this shit worked')
    //});
//}

function getAllResidents() {
  var url = "http://localhost:3000/api/v1/residents";
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
          tr = $(`<a href="residents/${obj.id}" onclick="getResident(this.id);"></a>`).addClass("table-row");
          //tr = $(`<a href="residents/${obj.id}"></a>`).addClass("table-row");
          // obj.id = t;
          // t += 1;
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
        table.appendTo("#table1");
      });
    });
}
getAllResidents();



//fetch(url)
//.then((resp) => resp.json())
//.then(function(data) {
    //$(function() {
      //var table = $("<table />").addClass("table table-striped table-hover");
      //var tr = $("<tr />");
      //tr.append($("<th />"));
      //var thead = $("<thead />"),tr;
      //$.each(data.table_headers,function(_,text) {
        //tr.append("<th> "+text+" </th>");
        //tr.appendTo(thead);
      //});

      //var tbody = $("<tbody />"),atag, tr;
      //var t = 1;
      //$.each(data.residents,function(_,obj) {
        //tr = $('<tr></tr>');
        //obj.id = t;
        //t += 1;
        //tr.append("<td> "+obj.id+" </td>");
        //tr.append("<td> "+obj.first_name+" </td>");
        //tr.append("<td> "+obj.gender+" </td>");
        //var date = new Date(obj.date);
        //var rando = Math.floor((Math.random() * 3) + 1);
        //var tenure = (date.getMonth()+1+rando)-(date.getMonth()+1)
        //tr.append("<td> "+(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +" </td>");
        //tr.append("<td> "+(date.getMonth()+1+rando) + "/" + date.getDate() + "/" + date.getFullYear() +" </td>");
        //tr.append("<td> "+(tenure+ " month(s)")+" </td>");
        //tr.append("<td> "+obj.documented+" </td>");
        //tr.append("<td> "+obj.bed_id+" </td>");
        //tr.appendTo(tbody);

      //});
      //thead.appendTo(table);    
      //tbody.appendTo(table);
      //table.appendTo("#table1");    
    //});
//});


