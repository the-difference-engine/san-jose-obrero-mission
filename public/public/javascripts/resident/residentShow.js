var id = location.pathname.split('/')[2];
getResident(id);

function getResident(residentId) {

  // var url = "https://qa-san-jose.herokuapp.com/api/v1/residents/" + residentId;
 var url = "http://localhost:3000/api/v1/residents/" + residentId;
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
  var avatarHtml = `<img src='${ avatar }' alt='avatar' class='avatar-container'>`;
  return avatarHtml
}

function personalInformation(resident) {
  return '<div class="container-fluid">' +
            '<div class="row">' +
                '<div class="col-lg-2"><label>Full Name</label> ' + '<p>' + resident.full_name + '</p></div>' +
                '<div class="col-lg-2"><label>Gender</label> ' + '<p>' + resident.gender + '</p></div>' +
                '<div class="col-lg-2"><label>Phone Number</label> ' + '<p>' + (resident.phone_number || 'N/A') + '</p></div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-lg-2"><label>Date of Birth:</label> ' + '<p>' + (resident.date_of_birth || 'N/A') + '</p></div>' +
                '<div class="col-lg-2"><label>Age:</label> ' + '<p>' + resident.age + '</p></div>' +
                '<div class="col-lg-2"><label>Ethnicity:</label> ' + '<p>' + resident.ethnicity + '</p></div>' +
                '<div class="col-lg-3"><label>Race:</label> ' + '<p>' + resident.resident_race + '</p></div>' +
                '<div class="col-lg-3"><label>Status:</label> ' + '<p>' + (resident.status || 'N/A') + '</p></div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-lg-2"><label>Case Manager:</label> ' + '<p>' + (resident.case_manager || 'N/A') + '</p></div>' +
                '<div class="col-lg-2"><label>Bed:</label> ' + '<p>' + resident.bed_id
                  + '</p></div>' +
                '<div class="col-lg-2"><label>Bed lock combo number:</label> ' + '<p>' + (resident.bed_lock_combo_number || 'N/A') + '</p></div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-lg-2"><label>Admitted:</label>' + '<p>' + (resident.admitted_date || 'N/A')+ '</p></div>' +
                '<div class="col-lg-2"><label>Released:</label> ' + '<p>' + (resident.released_date || 'N/A') + '</p></div>' +
                '<div class="col-lg-2"><label>Tenure:</label> ' + '<p>' + (resident.tenure || 'N/A') + '</p></div>' +
                '<div class="col-lg-3"><label>HMIS#:</label> ' + '<p>' + resident.hmis_number
                  + '</p></div>' +
                '<div class="col-lg-3"><label>HMIS Entry Date:</label> ' + '<p>' + resident.hmis_entry_date
                  + '</p></div>' +
            '</div>' +
         '</div>';
  }

function displayGeneralTab(resident) {
  document.querySelector('#show-general').innerHTML = '<div class="row">' +
      '<div class="col-lg-6">' +
          '<label>Cause of Homelessness</label>' + '<p>' +
      (resident.cause_of_homelesness || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
          '<label>Length of Homelessness</label>' +
          '<p>' +
          (resident.length_of_homelesness || 'N/A') +
          '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-6">' +
          '<label>Prior Living Situation</label>' + '<p>' +
      (resident.prior_living_situation || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
          '<label>How long in prior living situation?</label>' +
          '<p>' +
          (resident.length_of_prior_situation || 'N/A') +
          '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-6">' +
          '<label>Number of Shelters in the Past Year</label>' + '<p>' +
      (resident.number_of_shelters || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
          '<label>Chronically Homeless</label>' +
          '<p>' +
          (resident.chronicallyHomeless || 'N/A') +
          '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Special Needs / Conditions</label>' + '<p>' +
      (resident.special_needs || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Is the client disabled?</label>' + '<p>' +
      (resident.disabled || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Is the client a veteran?</label>' + '<p>' +
      (resident.veteran || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Does the client speak and read English well?</label>' + '<p>' +
      (resident.speak_english || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Is the client taking prescribed medication?</label>' + '<p>' +
      (resident.prescribed_medication || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Does the client have any allergies?</label>' + '<p>' +
      (resident.allergies || 'N/A') + '</p>' +
      '</div>' +
    '</div>';
}
