var residentsPayload = [
    ["","Full Name", "Gender", "Admitted", "Released", "Tenure", "Status", "bed #"],
    {
        "image": "image",
        "full_name": "Gabe Weimann",
        "gender": "female",
        "admitted_date": "2017-08-18T00:00:00.000Z",
        "released_date": "2017-08-18T00:00:00.000Z",
        "tenure": "33 days",
        "status": "current",
        "bed_id": 334,
    }
];


var residentsPayload =  $.getJSON( "http://localhost:3000/api/v1/residents", function( data ) {
  console.log(data);
  });

$(function() {
  var tbody = $("<tbody />"),tr;
  $.each(residentsPayload,function(_,obj) {
    tr = $("<tr />");
      $.each(obj,function(_,text) {
        tr.append("<td class='residentstable'>"+text+"</td>");
      });
    tr.appendTo(tbody);
  });
  tbody.appendTo("#table1");    
});

