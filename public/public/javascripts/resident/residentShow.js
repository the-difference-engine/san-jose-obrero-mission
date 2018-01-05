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
  return '<div style="display: inline-block; width: 50%; text-align: left;" class="table-responsive">' + 
          '<table class="table table-bordered">' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Status' + '</th>' +
                '<td>' + resident.status + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Gender' + '</th>' +
                '<td>' + resident.gender + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Date of Birth' + '</th>' +
                '<td>' + resident.date_of_birth + '</td>' +
              '</tr>' + 
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Age' + '</th>' +
                '<td>' + resident.age + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Ethnicity' +  '</th>' +
                '<td>' + resident.ethnicity + '</td>' +
              '</tr>'  +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Race' +  '</th>' +
                '<td>' + resident.resident_race + '</td>' +
              '</tr>' + 
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Phone Number' +  '</th>' +
                '<td>' + resident.phone_number + '</td>' +
              '</tr>' +
          '</table>' +
         '</div>' + 
          '<div style="display: inline-block; width: 50%; text-align: left;" class="table-responsive">' +
            '<table class="table table-bordered">' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Case Manager' + '</th>' +
                '<td>' + resident.case_manager + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Admitted' + '</th>' +
                '<td>' + resident.admitted_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Released' + '</th>' +
                '<td>' + resident.released_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Tenure' + '</th>' +
                '<td>' + resident.tenure + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'HMIS#' + '</th>' +
                '<td>' + resident.hmis_number + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'HMIS Entry Date' + '</th>' +
                '<td>' + resident.hmis_entry_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Bed ID#' + '</th>' +
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
          '<th class="showHeader">' + 'Length of Homelessness' + '</th>' +
          '<th class="showHeader">' + 'Prior Living Situation' + '</th>' +
        '</tr>' +
        '<tr>' +
          '<td>' + resident.cause_of_homelessness + '</td>' +
          '<td>' + resident.length_of_homelessness + '</td>' +
          '<td>' + resident.prior_living_situation + '</td>' +
        '</tr>' +
        '<tr>' +
      '</table>' +
    '</div>' +
    '<div class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="showHeader">' + 'Length of Prior Living Situation' + '</th>' +
          '<th class="showHeader">' + 'Number of Shelters in Past Year' + '</th>' +
          '<th class="showHeader">' + 'Chronically Homeless?' + '</th>' +
        '</tr>' +
        '<tr>' +
          '<td>' + resident.length_of_prior_situation + '</td>' +
          '<td>' + resident.number_of_shelters + '</td>' +
          '<td>' + resident.chronically_homeless + '</td>' +
        '</tr>' +
        '<tr>' +
      '</table>' +
    '</div>' +
    // '<div class="table-responsive">' +
    //   '<table class="table table-bordered">' +
    //     '<tr>' +
    //       '<th class="showHeader">' + 'Cause of Homelessness' + '</th>' +
    //       '<td>' + resident.cause_of_homelessness + '</td>' +
    //     '</tr>' +
    //     '<tr>' +
    //       '<th class="showHeader">' + 'Length of Homelessness' + '</th>' +
    //       '<td>' + resident.length_of_homelessness + '</td>' +
    //     '</tr>' +
    //     '<tr>' +
    //       '<th class="showHeader">' + 'Prior Living Situation' + '</th>' +
    //       '<td>' + resident.prior_living_situation + '</td>' +
    //     '</tr>' +
    //     '<tr>' +
    //       '<th class="showHeader">' + 'Length of Prior Living Situation' + '</th>' +
    //       '<td>' + resident.length_of_prior_situation + '</td>' +
    //     '</tr>' +
    //     '<tr>' +
    //       '<th class="showHeader">' + 'Number of Shelters in Past Year' + '</th>' +
    //       '<td>' + resident.number_of_shelters + '</td>' +
    //     '</tr>' +
    //     '<tr>' +
    //       '<th class="showHeader">' + 'Chronically Homeless?' + '</th>' +
    //       '<td>' + resident.chronically_homeless + '</td>' +
    //     '</tr>' +
    //   '</table>' +   
    // '</div>'+
    '<div style="text-align: left;" class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="showHeader">' + '' + '</th>' +
          '<th class="showHeader">' + 'Yes/No' + '</th>' +
          '<th class="showHeader">' + 'Notes' + '</th>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Is the client disabled?' + '</th>' +
          '<td>' + resident.disabled + '</td>' +
          '<td>' + resident.disabled + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Is the client a veteran?' + '</th>' +
          '<td>' + resident.veteran + '</td>' +
          '<td>' + resident.veteran + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Is the client taking prescribed medicine?' + '</th>' +
          '<td>' + resident.prescribed_medicine + '</td>' +
          '<td>' + resident.prescribed_medicine + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Does the client have allergies?' + '</th>' +
          '<td>' + resident.allergies + '</td>' +
          '<td>' + resident.allergies + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Does the client speak and read English well?' + '</th>' +
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
          '<th class="showHeader">' + 'Pilsen Wellness' + '</th>' +
          '<th class="showHeader">' + 'Background Check' + '</th>' +
          '<th class="showHeader">' + 'Referral' + '</th>' +
          '<th class="showHeader">' + 'TB Test' + '</th>' +
        '</tr>' +
        '<tr>' +
          '<td>' + resident.bottom_bunk_requested + '</td>' +
          '<td>' + resident.pilsen_wellness + '</td>' +
          '<td>' + resident.background_check + '</td>' +
          '<td>' + resident.referral + '</td>' +
          '<td>' + resident.tb_test + '</td>' +
        '</tr>' +
      '</table>' +   
    '</div>';
}

function displayIdentificationtab(resident) {
  document.querySelector('#show-indentification').innerHTML = '<div class="row">' +
      '<div class="col-lg-6">' +
      '<label for="ID-Card">ID Card</label>'+ '<p>' +
      (resident.idCard || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
     ' <label for="Driver-License">Drivers License</label>' + '<p>' +
     (resident.driverLicense || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
      '<label for="Birth-Certificate">Birth Certificate</label>'+ '<p>' +
      (resident.birthCertificate || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
      '<label for="Social-Security-Number">Social Security Number</label>'+ '<p>' +
      (resident.socialSecuritynumber || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
      '<label for="Passport-Number">Passport Number</label>'+ '<p>' +
      (resident.passportNumber || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
      '<label for="Permanent-Resident-Card">Permanent Resident Card</label>'+ '<p>' +
      (resident.permanentResidentcard || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
      '<label for="Expectations">Expectations</label>'+ '<p>' +
      (resident.informationType || 'N/A') + '</p>' +
      '</div>' +

      '<div class="col-lg-6">' +
      '<label for="Date-Setup">Date Setup</label>'+ '<p>' +
      (resident.dateSetup || 'N/A') + '</p>' +
      '</div>' +

      '<div class="col-lg-6">' +
      '<label for="Date-Expiration">Date Expiration</label>'+ '<p>' +
      (resident.dateExpiration || 'N/A') + '</p>' +
      '</div>' +

      '<div class="col-lg-6">' +
      '<label for="Days-Left">Days Left</label>'+ '<p>' +
      (resident.daysLeft || 'N/A') + '</p>' +
      '</div>' +
      '</div>';
}

function displayEmploymenttab(resident) {
  document.querySelector('#show-employment').innerHTML = '<div class="row">' +
  '<div class="col-lg-6">' +
      '<label for="Employment">Employment History</label>'+ '<p>' +
      (resident.disabled || 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="CompanyName">Company Name</label>'+ '<p>' +
      (resident.CompanyName || 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="Address">Street Address</label>'+ '<p>' +
      (resident.Address || 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="City">City</label>'+ '<p>' +
      (resident.City || 'N/A') + '</p>' +
      '</div>' +
  
  '<div class="col-lg-6">' +
      '<label for="City">City</label>'+ '<p>' +
      (resident.City || 'N/A') + '</p>' +
      '<label for="state">State</label>'+ '<p>' +
      (resident.state || 'N/A') + '</p>' +
      '<label class="control-label" for="Zip">Zip</label>'+ '<p>' +
      (resident.Zip || 'N/A') + '</p>' +
      '</div>' +

  '<div class="col-lg-6">' +
      '<label class="control-label" for="Phone">Phone Number</label>'+ '<p>' +
      (resident.Phone || 'N/A') + '</p>' +
      '</div>' +

  '<div class="col-lg-6">' +
      '<label for="Supervisor">Supervisor Name</label>'+ '<p>' +
      (resident.Supervisor || 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="Startdate">Start Date</label>'+ '<p>' +
      (resident.Startdate || 'N/A') + '</p>' +
      '</div>' +
  
  '<div class="col-lg-6">' +
  '<label for="Enddate">End Date</label>'+ '<p>' +
      (resident.Enddate || 'N/A') + '</p>' +
      '</div>' +
      '</div>';
}
  
      //disabled buttons on new

function displayDisciplinarytab(resident) {
        document.querySelector('#show-disciplinary').innerHTML = '<div class="row">' +
        '<div class="col-lg-6">' +
      '<label for="Employment">Employment History</label>'+ '<p>' +
      (resident.disabled || 'N/A') + '</p>' +
      '</div>' +
      '</div>';
    }
      
  
  
  

  
  

     


      

