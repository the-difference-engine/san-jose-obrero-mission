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
     document.querySelector('#show-page-avatar').innerHTML = setAvatar(data.image);
     document.querySelector('#name-age').innerHTML = nameAge;
     document.querySelector('#personal-information').innerHTML = personalInformation(data);
     displayGeneralTab(data);
     displayIdentification(data);
     displayEmploymentEducation(data);
     displayRequirements(data);
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
  return '<div style="display: inline-block; width: 50%; text-align: center;" class="table-responsive">' + 
          '<table class="table table-bordered">' +
              '<tr>' +
                '<th class="showHeader">' + 'Status' + '</th>' +
                '<td>' + resident.status + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'Gender' + '</th>' +
                '<td>' + resident.gender + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'Date of Birth' + '</th>' +
                '<td>' + resident.date_of_birth + '</td>' +
              '</tr>' + 
              '<tr>' +
                '<th class="showHeader">' + 'Age' + '</th>' +
                '<td>' + resident.age + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'Ethnicity' +  '</th>' +
                '<td>' + resident.ethnicity + '</td>' +
              '</tr>'  +
              '<tr>' +
                '<th class="showHeader">' + 'Race' +  '</th>' +
                '<td>' + resident.resident_race + '</td>' +
              '</tr>' + 
              '<tr>' +
                '<th class="showHeader">' + 'Phone Number' +  '</th>' +
                '<td>' + resident.phone_number + '</td>' +
              '</tr>' +
          '</table>' +
         '</div>' + 
          '<div style="display: inline-block; width: 50%; text-align: center;" class="table-responsive">' +
            '<table class="table table-bordered">' +
              '<tr>' +
                '<th class="showHeader">' + 'Case Manager' + '</th>' +
                '<td>' + resident.case_manager + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'Admitted' + '</th>' +
                '<td>' + resident.admitted_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'Released' + '</th>' +
                '<td>' + resident.released_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'Tenure' + '</th>' +
                '<td>' + resident.tenure + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'HMIS#' + '</th>' +
                '<td>' + resident.hmis_number + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'HMIS Entry Date' + '</th>' +
                '<td>' + resident.hmis_entry_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeader">' + 'Bed ID#' + '</th>' +
                '<td>' + resident.bed_id + '</td>' +
              '</tr>' +
            '</table>' +
          '</div>'
}

function displayGeneralTab(resident) {
  document.querySelector('#show-general').innerHTML = 
    '<div class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="showHeader">' + 'Cause of Homelessness' + '</th>' +
          '<td>' + resident.cause_of_homelessness + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Length of Homelessness' + '</th>' +
          '<td>' + resident.length_of_homelessness + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Prior Living Situation' + '</th>' +
          '<td>' + resident.prior_living_situation + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Length of Prior Living Situation' + '</th>' +
          '<td>' + resident.length_of_prior_situation + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Number of Shelters in Past Year' + '</th>' +
          '<td>' + resident.number_of_shelters + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Chronically Homeless?' + '</th>' +
          '<td>' + resident.chronically_homeless + '</td>' +
        '</tr>' +
      '</table>' +   
    '</div>'+
    '<div class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="showHeader">' + '' + '</th>' +
          '<th class="showHeader">' + 'Y/N' + '</th>' +
          '<th class="showHeader">' + 'Notes' + '</th>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Is the client disabled?' + '</th>' +
          '<td>' + resident.disabled + '</td>' +
          '<td>' + resident.disabled + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Is the client a veteran?' + '</th>' +
          '<td>' + resident.veteran + '</td>' +
          '<td>' + resident.veteran + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Is the client taking prescribed medicine?' + '</th>' +
          '<td>' + resident.prescribed_medicine + '</td>' +
          '<td>' + resident.prescribed_medicine + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Does the client have allergies?' + '</th>' +
          '<td>' + resident.allergies + '</td>' +
          '<td>' + resident.allergies + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Does the client speak and read English well?' + '</th>' +
          '<td>' + resident.speak_english + '</td>' +
          '<td>' + resident.speak_english + '</td>' +
        '</tr>' +
      '</table>' +
    '</div>' + 
    '<div class="table-responsive">' +
      '<h4>' + 'Special Needs/Conditions' + '</h4>' + 
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="showHeader">' + 'Type' + '</th>' +
          '<th class="showHeader">' + 'Sought Treatment' + '</th>' +
          '<th class="showHeader">' + 'Notes' + '</th>' +
        '</tr>' +
        '<tr>' +
          '<td>' + resident.type + '</td>' +
          '<td>' + resident.sought_treatment + '</td>' +
          '<td>' + resident.notes + '</td>' +
        '</tr>' +
      '</table>' +
    '</div>';
}

function displayIdentification(resident) {
  document.querySelector('#show-indentification').innerHTML =
    '<div class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
            '<th class="showHeader">' + 'State ID/License Number' + '</th>' +
            '<th class="showHeader">' + 'Social Security Number' + '</th>' +
            '<th class="showHeader">' + 'Passport Number' + '</th>' +
            '<th class="showHeader">' + 'Green/Permanent Resident Card' + '</th>' +
        '</tr>' +
        '<tr>' +
            '<td>' + resident.license_number + '</td>' +
            '<td>' + resident.social_security_number + '</td>' +
            '<td>' + resident.passport + '</td>' +
            '<td>' + resident.green_card + '</td>' +
        '</tr>' +
        '<tr>' +
      '</table>' +   
    '</div>';
}

function displayEmploymentEducation(resident) {
  document.querySelector('#show-employment').innerHTML =
    '<div class="table-responsive">' +
      '<h3>' + 'Education' + '</h3>' + 
      '<table class="table table-bordered">' +
        '<tr>' +
            '<th class="showHeader">' + 'High School' + '</th>' +
            '<th class="showHeader">' + "Associate's" + '</th>' +
            '<th class="showHeader">' + "Bachelor's" + '</th>' +
            '<th class="showHeader">' + "Master's" + '</th>' +
            '<th class="showHeader">' + "Other" + '</th>' +
          '</tr>' +
            '<td>' + resident.associates + '</td>' +
            '<td>' + resident.high_school + '</td>' +
            '<td>' + resident.bachelors + '</td>' +
            '<td>' + resident.masters + '</td>' +
            '<td>' + resident.other_education + '</td>' +
          '<tr>' +
        '</tr>' +
      '</table>' +   
    '</div>' + 
    '<div class="table-responsive">' +
      '<h3>' + 'Employment History' + '</h3>' + 
      '<table class="table table-bordered">' +
        '<tr>' +
            '<th class="showHeader">' + 'Company' + '</th>' +
            '<th class="showHeader">' + "Address" + '</th>' +
            '<th class="showHeader">' + "Phone Number" + '</th>' +
            '<th class="showHeader">' + "Supervisor" + '</th>' +
            '<th class="showHeader">' + "Date Started" + '</th>' +
            '<th class="showHeader">' + "Date Ended" + '</th>' +
          '</tr>' +
            '<td>' + resident.employer_company + '</td>' +
            '<td>' + resident.employer_address + '</td>' +
            '<td>' + resident.employer_phone_number + '</td>' +
            '<td>' + resident.employer_supervisor + '</td>' +
            '<td>' + resident.date_started + '</td>' +
            '<td>' + resident.date_ended + '</td>' +
          '<tr>' +
        '</tr>' +
      '</table>' +   
    '</div>';
}

function displayRequirements(resident) {
  document.querySelector('#show-requirements').innerHTML =
    '<div class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="showHeader">' + 'Bottom Bunk Requested' + '</th>' +
          '<td>' + resident.bottom_bunk_requested + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Pilsen Wellness' + '</th>' +
          '<td>' + resident.pilsen_wellness + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Background Check' + '</th>' +
          '<td>' + resident.background_check + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'Referral' + '</th>' +
          '<td>' + resident.referral + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeader">' + 'TB Test' + '</th>' +
          '<td>' + resident.tb_test + '</td>' +
        '</tr>' +
      '</table>' +   
    '</div>';
}

