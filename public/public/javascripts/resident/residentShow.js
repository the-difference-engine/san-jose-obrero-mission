var id = location.pathname.split('/')[2];
getResident(id);

function getResident(residentId) {

  // var url = "https://qa-san-jose.herokuapp.com/api/v1/residents/" + residentId;
 var url = "http://localhost:3004/api/v1/residents/" + residentId;
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   console.log(url)
   fetch(url, {
       method: 'GET',
       headers: myHeaders,
       mode: 'cors',
       cache: 'default'
   })
   .then(function(response) {
     return response.json();
   })
   .then(function(data) {
     var nameAge = data.full_name;
     var status = data.status;
     document.querySelector('#show-page-avatar').innerHTML = setAvatar(data.image);
     document.querySelector('#name-age').innerHTML = nameAge;
     document.querySelector('#personal-information').innerHTML = personalInformation(data);
     displayGeneralTab(data);
   })
   .catch(function(error) {
     console.log(JSON.stringify(error));
   });
}

function setAvatar(avatar) {
  var avatar = avatar || "/images/default_avatar.png";
  var avatarHtml = `<img src='${ avatar }' alt='avatar' class='show-avatar-container'>`;
  return avatarHtml
}

function personalInformation(resident) {
  return '<div style="display: inline-block; float: left; width: 50%;" class="table-responsive">' + 
          '<table class="table table-bordered">' +
              '<tr>' +
                '<th class="residentShow">' + 'Status' + '</th>' +
                '<td class="showBody">' + resident.status + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'Gender' + '</th>' +
                '<td class="showBody">' + resident.gender + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'Date of Birth' + '</th>' +
                '<td class="showBody">' + resident.date_of_birth + '</td>' +
              '</tr>' + 
              '<tr>' +
                '<th class="residentShow">' + 'Age' + '</th>' +
                '<td class="showBody">' + resident.age + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'Ethnicity' +  '</th>' +
                '<td class="showBody">' + resident.ethnicity + '</td>' +
              '</tr>'  +
              '<tr>' +
                '<th class="residentShow">' + 'Race' +  '</th>' +
                '<td class="showBody">' + resident.resident_race + '</td>' +
              '</tr>' + 
              '<tr>' +
                '<th class="residentShow">' + 'Phone Number' +  '</th>' +
                '<td class="showBody">' + resident.phone_number + '</td>' +
              '</tr>' +
          '</table>' +
         '</div>' + 
          '<div style="display: inline-block; width: 50%; float: right;" class="table-responsive">' +
            '<table class="table table-bordered">' +
              '<tr>' +
                '<th class="residentShow">' + 'Case Manager' + '</th>' +
                '<td class="showBody">' + resident.case_manager + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'Admitted' + '</th>' +
                '<td class="showBody">' + resident.admitted_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'Released' + '</th>' +
                '<td class="showBody">' + resident.released_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'Tenure' + '</th>' +
                '<td class="showBody">' + resident.tenure + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'HMIS#' + '</th>' +
                '<td class="showBody">' + resident.hmis_number + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'HMIS Entry Date' + '</th>' +
                '<td class="showBody">' + resident.hmis_entry_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="residentShow">' + 'Bed ID#' + '</th>' +
                '<td class="showBody">' + resident.bed_id + '</td>' +
              '</tr>' +
            '</table>' +
          '</div>'

        // '<div class="table-responsive">' +
        //   '<table class="table table-bordered">' +
        //     '<thead class="residentShow">' +
        //       '<tr>' +
        //         '<th>' + 'Case Manager' + '</th>' +
        //         '<th>' + 'Admitted' + '</th>' +
        //         '<th>' + 'Released' + '</th>' +
        //         '<th>' + 'Tenure' + '</th>' +
        //         '<th>' + 'HMIS#' + '</th>' +
        //         '<th>' + 'HMIS Entry Date' + '</th>' +
        //         '<th>' + 'Bed ID' + '</th>' +
        //       '</tr>' +
        //     '</thead>' +
        //     '<tbody>' +
        //       '<tr>' +
        //         '<td class="showBody">' + resident.case_manager + '</td>' +
        //         '<td class="showBody">' + resident.admitted_date + '</td>' +
        //         '<td class="showBody">' + resident.released_date + '</td>' +
        //         '<td class="showBody">' + resident.tenure + '</td>' +
        //         '<td class="showBody">' + resident.hmis_number + '</td>' +
        //         '<td class="showBody">' + resident.hmis_entry_date + '</td>' +
        //         '<td class="showBody">' + resident.bed_id + '</td>' +
        //       '</tr>' +
        //     '</tbody>' +
        //     '</table>' +
        // '</div>'   
  // return '<div class="container-fluid">' +
  //           '<div class="row">' +
  //               '<div class="col-lg-2"><label>Full Name</label> ' + '<p>' + resident.full_name + '</p></div>' +
  //               '<div class="col-lg-2"><label>Gender</label> ' + '<p>' + resident.gender + '</p></div>' +
  //               '<div class="col-lg-2"><label>Phone Number</label> ' + '<p>' + (resident.phone_number || 'N/A') + '</p></div>' +
  //           '</div>' +
  //           '<div class="row">' +
  //               '<div class="col-lg-2"><label>Date of Birth:</label> ' + '<p>' + (resident.date_of_birth || 'N/A') + '</p></div>' +
  //               '<div class="col-lg-2"><label>Age:</label> ' + '<p>' + resident.age + '</p></div>' +
  //               '<div class="col-lg-2"><label>Ethnicity:</label> ' + '<p>' + resident.ethnicity + '</p></div>' +
  //               '<div class="col-lg-3"><label>Race:</label> ' + '<p>' + resident.resident_race + '</p></div>' +
  //               '<div class="col-lg-3"><label>Status:</label> ' + '<p>' + (resident.status || 'N/A') + '</p></div>' +
  //           '</div>' +
  //           '<div class="row">' +
  //               '<div class="col-lg-2"><label>Case Manager:</label> ' + '<p>' + (resident.case_manager || 'N/A') + '</p></div>' +
  //               '<div class="col-lg-2"><label>Bed:</label> ' + '<p>' + resident.bed_id
  //                 + '</p></div>' +
  //               '<div class="col-lg-2"><label>Bed lock combo number:</label> ' + '<p>' + (resident.bed_lock_combo_number || 'N/A') + '</p></div>' +
  //           '</div>' +
  //           '<div class="row">' +
  //               '<div class="col-lg-2"><label>Admitted:</label>' + '<p>' + (resident.admitted_date || 'N/A')+ '</p></div>' +
  //               '<div class="col-lg-2"><label>Released:</label> ' + '<p>' + (resident.released_date || 'N/A') + '</p></div>' +
  //               '<div class="col-lg-2"><label>Tenure:</label> ' + '<p>' + (resident.tenure || 'N/A') + '</p></div>' +
  //               '<div class="col-lg-3"><label>HMIS#:</label> ' + '<p>' + resident.hmis_number
  //                 + '</p></div>' +
  //               '<div class="col-lg-3"><label>HMIS Entry Date:</label> ' + '<p>' + resident.hmis_entry_date
  //                 + '</p></div>' +
  //           '</div>' +
  //        '</div>';
  }

function displayGeneralTab(resident) {
  document.querySelector('#show-general').innerHTML = 
    '<div style="display: inline-block; width: 50%;" class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="residentShow">' + 'Cause of Homelessness' + '</th>' +
          '<td class="showBody">' + resident.cause_of_homelessness + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Length of Homelessness' + '</th>' +
          '<td class="showBody">' + resident.length_of_homelessness + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Prior Living Situation' + '</th>' +
          '<td class="showBody">' + resident.prior_living_situation + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Length of Prior Living Situation' + '</th>' +
          '<td class="showBody">' + resident.length_of_prior_situation + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Number of Shelters in Past Year' + '</th>' +
          '<td class="showBody">' + resident.number_of_shelters + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Chronically Homeless?' + '</th>' +
          '<td class="showBody">' + resident.chronically_homeless + '</td>' +
        '</tr>' +
      '</table>' +   
    '</div>'+
    '<div style="display: inline-block; width: 50%;" class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="residentShow">' + 'Is the Client Disabled?' + '</th>' +
          '<td class="showBody">' + resident.disabled + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Is the Client a Veteran?' + '</th>' +
          '<td class="showBody">' + resident.veteran + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Is the Client Taking Prescribed Medicine?' + '</th>' +
          '<td class="showBody">' + resident.prescribed_medicine + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Does the Client Have Allergies?' + '</th>' +
          '<td class="showBody">' + resident.allergies + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Does the client speak and read English well?' + '</th>' +
          '<td class="showBody">' + resident.speak_english + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="residentShow">' + 'Special Needs/Conditions' + '</th>' +
          '<td class="showBody">' + resident.special_needs + '</td>' +
        '</tr>' +
      '</table>' +
    '</div>';
        // '<tr>' +
        // '<th class="residentShow">' + 'Released' + '</th>' +
        // '<td class="showBody">' + resident.released_date + '</td>' +
        // '</tr>' +
        // '<tr>' +
        // '<th class="residentShow">' + 'Tenure' + '</th>' +
        // '<td class="showBody">' + resident.tenure + '</td>' +
        // '</tr>' +
        // '<tr>' +
        // '<th class="residentShow">' + 'HMIS#' + '</th>' +
        // '<td class="showBody">' + resident.hmis_number + '</td>' +
        // '</tr>' +
        // '<tr>' +
        // '<th class="residentShow">' + 'HMIS Entry Date' + '</th>' +
        // '<td class="showBody">' + resident.hmis_entry_date + '</td>' +
        // '</tr>' +
        // '<tr>' +
        // '<th class="residentShow">' + 'Bed ID#' + '</th>' +
        // '<td class="showBody">' + resident.bed_id + '</td>' +
        // '</tr>' +

  // '<div class="row">' +
  //     '<div class="col-lg-6">' +
  //         '<label>Cause of Homelessness</label>' + '<p>' +
  //     (resident.cause_of_homelesness || 'N/A') + '</p>' +
  //     '</div>' +
  //     '<div class="col-lg-6">' +
  //         '<label>Length of Homelessness</label>' +
  //         '<p>' +
  //         (resident.length_of_homelesness || 'N/A') +
  //         '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-6">' +
  //         '<label>Prior Living Situation</label>' + '<p>' +
  //     (resident.prior_living_situation || 'N/A') + '</p>' +
  //     '</div>' +
  //     '<div class="col-lg-6">' +
  //         '<label>How long in prior living situation?</label>' +
  //         '<p>' +
  //         (resident.length_of_prior_situation || 'N/A') +
  //         '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-6">' +
  //         '<label>Number of Shelters in the Past Year</label>' + '<p>' +
  //     (resident.number_of_shelters || 'N/A') + '</p>' +
  //     '</div>' +
  //     '<div class="col-lg-6">' +
  //         '<label>Chronically Homeless</label>' +
  //         '<p>' +
  //         (resident.chronicallyHomeless || 'N/A') +
  //         '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-12">' +
  //         '<label>Special Needs / Conditions</label>' + '<p>' +
  //     (resident.special_needs || 'N/A') + '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-12">' +
  //         '<label>Is the client disabled?</label>' + '<p>' +
  //     (resident.disabled || 'N/A') + '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-12">' +
  //         '<label>Is the client a veteran?</label>' + '<p>' +
  //     (resident.veteran || 'N/A') + '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-12">' +
  //         '<label>Does the client speak and read English well?</label>' + '<p>' +
  //     (resident.speak_english || 'N/A') + '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-12">' +
  //         '<label>Is the client taking prescribed medication?</label>' + '<p>' +
  //     (resident.prescribed_medication || 'N/A') + '</p>' +
  //     '</div>' +
  //   '</div>' +
  //   '<hr class="dashed">' +
  //   '<div class="row">' +
  //     '<div class="col-lg-12">' +
  //         '<label>Does the client have any allergies?</label>' + '<p>' +
  //     (resident.allergies || 'N/A') + '</p>' +
  //     '</div>' +
  //   '</div>';
}
