$(function() {
  var tbody = $("<tbody />"), tr;
  $.each(bedsPayload.beds,function(_,obj) {

    tr = $("<tr />");

    $.each(obj,function(_,text) {

      tr.append("<td>"+ text +"</td>")
    }); 
    tr.appendTo(tbody);
  });
  tbody.appendTo("#table_beds_payload");
});

var bedsPayload = {
  "beds": [

    {
      "name": "John Booker",
      "top_or_bottom": "bottom",
      "occupied": false
    },
    {
      "name": "betty careface",
      "top_or_bottom": "bottom",
      "occupied": false
    },
    {
      "name": "Dan booler",
      "top_or_bottom": "top",
      "occupied": true
    },
    {
      "name": "Chuck Norris",
      "top_or_bottom": "bottom",
      "occupied": false
    },
    {
      "name": "Frank bool",
      "top_or_bottom": "top",
      "occupied": true
    }
  ],
 
  "table_headers": [
    "name",
    "top or bottom",
    "occupied"  
            
  ]
}; 
