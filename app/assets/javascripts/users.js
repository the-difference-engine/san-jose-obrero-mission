$(function() {
    var table = $("<table />").addClass("table table-striped table-hover");
    var tr = $("<tr />");
    tr.append($("<th />"));
    var thead = $("<thead />"),tr;
  $.each(userPayload.table_headers,function(_,text) {
        tr.append("<th> "+text+" </th>");
        tr.appendTo(thead);
  });

    var tbody = $("<tbody />"),tr;
  $.each(userPayload.users,function(_,obj) {
        tr = $("<tr />");
        tr.append("<td></td>");
        tr.append("<td> "+obj.email+" </td>");
        tr.append("<td> "+obj.role+" </td>");
        tr.appendTo(tbody);
      
  });
    thead.appendTo(table);    
    tbody.appendTo(table);
    table.appendTo("#users_table");    
});

var userPayload = {
    "users": [
        {
            "id": 1,
            "email": "a@mail.com",
            "password_digest": "$2a$10$/5WNuSCMU/TM20YZgk8N2OQC.IdgTVO6v9JUkHqhh0AaDZv4dDti.",
            "role": "admin",
            "created_at": "2017-10-26T23:50:43.620Z",
            "updated_at": "2017-10-26T23:50:43.620Z"
        },
        {
            "id": 2,
            "email": "cm@mail.com",
            "password_digest": "$2a$10$CBsn3DaNKzI3WHeNXQo9a.U8UvYpXXFYR0A5MAjJMtpGPW0kxF/Yi",
            "role": "case manager",
            "created_at": "2017-10-26T23:50:43.717Z",
            "updated_at": "2017-10-26T23:50:43.717Z"
        },
        {
            "id": 3,
            "email": "ra@mail.com",
            "password_digest": "$2a$10$kCiGKAemVhJoQdfE3HPJMeXwM4GeWE9EAbcqmhf1G9zoPNKafFlT.",
            "role": "residential aide",
            "created_at": "2017-10-26T23:50:43.791Z",
            "updated_at": "2017-10-26T23:50:43.791Z"
        },
        {
            "id": 4,
            "email": "s@mail.com",
            "password_digest": "$2a$10$qmBjrUHSlp21vDnjPzgdz.vkmjIC56jhYAJ3ZJDA8ltqQttoueY2e",
            "role": "security",
            "created_at": "2017-10-26T23:50:43.874Z",
            "updated_at": "2017-10-26T23:50:43.874Z"
        }
    ],
    "table_headers": [
        "email",
        "role"
    ]
}
