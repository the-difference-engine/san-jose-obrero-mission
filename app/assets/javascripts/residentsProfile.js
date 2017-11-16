
$(function() {
  
  $.each(residentsPayload.residentProfile,function(key, value) {
    var table = $("<table />").addClass("table table-striped table-hover");
  var tr = $("<tr />");
  var tbody = $("<tbody />");

  var thead = $("<thead />");
    tr.append("<th> "+key+" </th>");
    tr.appendTo(thead);


    $.each(value, function(key1, value1) { 
       // var tr = $("<tr />");
       // if (tr.something < 2) {
        tr[0].cells.length
        tr.append("<td> " + key1 + " </td>");
       
       // }
       debugger
       tr.appendTo(tbody);

    });
      
thead.appendTo(table);
      tbody.appendTo(table);
          
       table.appendTo("#" + key);
    
  });

  
  
});


var residentsPayload = {
    "full_name": "Tomas O'Keefe",
    "first_name": "Tomas",
    "last_name": "O'Keefe",
    "date": "2017-09-21T00:00:00.000Z",
    "hmis_number": "6491505",
    "hmis_entry_date": "2017-07-18T00:00:00.000Z",
    "documented": true,
    "gender": "male",
    "ethnicity": "american indian",
    "bed_id": 2376,
    "resident_race": "Chuck Norris went out of an infinite loop.",
    "cause_of_homeslessness": "All arrays Chuck Norris declares are of infinite size, because Chuck Norris knows no bounds.",
    "length_of_homelessness": "4 years",
    "prior_living_situation": "Chuck Norris doesn't need the cloud to scale his applications, he uses his laptop.",
    "number_of_shelters": 95,
    "chronically_homeless": false,
    "image": "image",
    "residentProfile": {
        "prerequisites_needs": {
            "Chore": {},
            "Photo": {
                "Photo": false,
                "description": "Photo must be taken upon intake."
            },
            "TB Test": {},
            "BG Check": {
                "records": [
                    "DUI",
                    "Drug Possession"
                ],
                "complete": true,
                "description": "Background check must be conducted before Entry.\nList any criminal charges and dates below"
            },
            "Database": {},
            "Referral": {},
            "Allergies": {
                "allergies": "false",
                "description": "If there are any known allergies please list below:",
                "knownAllergies": []
            },
            "Previous Part": {},
            "Prescribed Med": {},
            "Pilsen Wellness": {
                "seen": false,
                "description": "Resident must see Pilsen Wellness within a month of being a resident. Please follow up by first month of residence if the square to the right is not marked."
            },
            "Bottom Bunk Req.": {
                "pending": true,
                "Date fulfilled": null,
                "Date requested": "11/12/2017"
            }
        },
        "identification": {
            "ID card": {
                "type": "card",
                "pending": true
            },
            "License": {
                "type": "card",
                "pending": true
            },
            "Passport": {
                "type": "card",
                "pending": true
            },
            "Green/Res Card": {
                "type": "card",
                "pending": true
            },
            "Birth Certificate": {
                "type": "card",
                "pending": true
            },
            "Social Security Card": {
                "type": "card",
                "pending": true
            }
        },
        "house_meetings": {
            "date": "3-1-1949"
        },
        "buss_passes": {
            "Cost": "3",
            "Total": "12",
            "Quantity": "4"
        }
    }
}