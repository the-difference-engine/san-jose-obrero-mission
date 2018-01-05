// $(function() {
//     var table = $("<table />").addClass("table table-striped table-hover");
//     var tr = $("<tr />");
//     tr.append($("<th />"));
//     var thead = $("<thead />"),tr;
//   $.each(bedsPayload.table_headers,function(_,text) {
//         tr.append("<th> "+text+" </th>");
//         tr.appendTo(thead);
//   });

//     var tbody = $("<tbody />"),tr;
//   $.each(bedsPayload.beds,function(_,obj) {
//         tr = $("<tr />");
//         tr.append("<td></td>");
//         tr.append("<td> "+obj.name+" </td>");
//         tr.append("<td> "+obj.top_or_bottom+" </td>");
//         tr.append("<td> "+obj.occupied+" </td>");
//         tr.appendTo(tbody);
      
//   });
//     thead.appendTo(table);    
//     tbody.appendTo(table);
//     table.appendTo("#table_beds_payload");    
// });

// var bedsPayload = {
//   "beds": [
//     {
//       "name": "John Booker",
//       "top_or_bottom": "bottom",
//       "occupied": false
//     },
//     {
//       "name": "betty careface",
//       "top_or_bottom": "bottom",
//       "occupied": false
//     },
//     {
//       "name": "Dan booler",
//       "top_or_bottom": "top",
//       "occupied": true
//     },
//     {
//       "name": "Chuck Norris",
//       "top_or_bottom": "bottom",
//       "occupied": false
//     },
//     {
//       "name": "Frank bool",
//       "top_or_bottom": "top",
//       "occupied": true
//     }
//   ],
 
//   "table_headers": [
//     "name",
//     "top or bottom",
//     "occupied"  
            
//   ]
// }; 
