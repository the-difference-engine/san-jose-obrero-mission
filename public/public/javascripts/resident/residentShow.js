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
                '<td>' + resident.admittance_information.admitted_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Released' + '</th>' +
                '<td>' + resident.admittance_information.released_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Tenure' + '</th>' +
                '<td>' + resident.admittance_information.tenure + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'HMIS#' + '</th>' +
                '<td>' + resident.admittance_information.hmis_number + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'HMIS Entry Date' + '</th>' +
                '<td>' + resident.admittance_information.hmis_entry_date + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th class="showHeaderLeftAlign">' + 'Bed ID#' + '</th>' +
                '<td>' + resident.bed_id + '</td>' +
              '</tr>' +
            '</table>' +
          '</div>'
}
   
//   return '<div class="container-fluid">' +
//             '<div class="row">' +
//                 '<div class="col-lg-2"><label>Full Name</label> ' + '<p>' + resident.full_name + '</p></div>' +
//                 '<div class="col-lg-2"><label>Gender</label> ' + '<p>' + resident.gender + '</p></div>' +
//                 '<div class="col-lg-2"><label>Phone Number</label> ' + '<p>' + (resident.phone_number || 'N/A') + '</p></div>' +
//             '</div>' +
//             '<div class="row">' +
//                 '<div class="col-lg-2"><label>Date of Birth:</label> ' + '<p>' + (resident.date_of_birth || 'N/A') + '</p></div>' +
//                 '<div class="col-lg-2"><label>Age:</label> ' + '<p>' + resident.age + '</p></div>' +
//                 '<div class="col-lg-2"><label>Ethnicity:</label> ' + '<p>' + resident.ethnicity + '</p></div>' +
//                 '<div class="col-lg-3"><label>Race:</label> ' + '<p>' + resident.resident_race + '</p></div>' +
//                 '<div class="col-lg-3"><label>Status:</label> ' + '<p>' + (resident.status || 'N/A') + '</p></div>' +
//             '</div>' +
//             '<div class="row">' +
//                 '<div class="col-lg-2"><label>Case Manager:</label> ' + '<p>' + (resident.case_manager || 'N/A') + '</p></div>' +
//                 '<div class="col-lg-2"><label>Bed:</label> ' + '<p>' + resident.bed_id
//                   + '</p></div>' +
//                 '<div class="col-lg-2"><label>Bed lock combo number:</label> ' + '<p>' + (resident.bed_lock_combo_number || 'N/A') + '</p></div>' +
//             '</div>' +
//             '<div class="row">' +
//                 '<div class="col-lg-2"><label>Admitted:</label>' + '<p>' + (resident.admittance_information.admitted_date || 'N/A')+ '</p></div>' +
//                 '<div class="col-lg-2"><label>Released:</label> ' + '<p>' + (resident.admittance_information.released_date || 'N/A') + '</p></div>' +
//                 '<div class="col-lg-2"><label>Tenure:</label> ' + '<p>' + (resident.admittance_information.tenure || 'N/A') + '</p></div>' +
//                 '<div class="col-lg-3"><label>HMIS#:</label> ' + '<p>' + resident.admittance_information.hmis_number
//                   + '</p></div>' +
//                 '<div class="col-lg-3"><label>HMIS Entry Date:</label> ' + '<p>' + resident.admittance_information.hmis_entry_date
//                   + '</p></div>' +
//             '</div>' +
//          '</div>';
//   }

 

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
          '<td>' + resident.general.cause_of_homelessness + '</td>' +
          '<td>' + resident.general.length_of_homelessness + '</td>' +
          '<td>' + resident.general.prior_living_situation + '</td>' +
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
          '<td>' + resident.general.length_of_prior_situation + '</td>' +
          '<td>' + resident.general.number_of_shelters + '</td>' +
          '<td>' + resident.general.chronically_Homeless + '</td>' +
        '</tr>' +
        '<tr>' +
      '</table>' +
//   document.querySelector('#show-general').innerHTML = '<div class="row">' +
//       '<div class="col-lg-6">' +
//           '<label>Cause of Homelessness</label>' + '<p>' +
//       (resident.general.cause_of_homeslessness || 'N/A') + '</p>' +
//       '</div>' +
//       '<div class="col-lg-6">' +
//           '<label>Length of Homelessness</label>' +
//           '<p>' +
//           (resident.general.length_of_homelessness || 'N/A') +
//           '</p>' +
//       '</div>' +
//     '</div>' +
//     '<hr class="dashed">' +
//     '<div class="row">' +
//       '<div class="col-lg-6">' +
//           '<label>Prior Living Situation</label>' + '<p>' +
//       (resident.general.prior_living_situation || 'N/A') + '</p>' +
//       '</div>' +
//       '<div class="col-lg-6">' +
//           '<label>How long in prior living situation?</label>' +
//           '<p>' +
//           (resident.general.length_of_prior_situation || 'N/A') +
//           '</p>' +
//       '</div>' +
//     '</div>' +
//     '<hr class="dashed">' +
//     '<div class="row">' +
//       '<div class="col-lg-6">' +
//           '<label>Number of Shelters in the Past Year</label>' + '<p>' +
//       (resident.general.number_of_shelters || 'N/A') + '</p>' +
//       '</div>' +
//       '<div class="col-lg-6">' +
//           '<label>Chronically Homeless</label>' +
//           '<p>' +
//           (resident.general.chronically_Homeless || 'N/A') +
//           '</p>' +
//       '</div>' +
//     '</div>' +
//     '<hr class="dashed">' +
//     '<div class="row">' +
//       '<div class="col-lg-12">' +
//           '<label>Special Needs / None </label>' + '<p>' +
//       (resident.general.special_Needs_None || 'N/A')  + '</p>' +
//       '</div>' +
//       '<div class="col-lg-12">' +
//           '<label>Special Needs / Substance Abuse </label>' + '<p>' +
//       (resident.general.special_Needs_Substance_Abuse || 'N/A')  + '</p>' +
//       '</div>' +
//       '<div class="col-lg-12">' +
//           '<label>Special Needs / Alcohol Abuse</label>' + '<p>' +
//       (resident.general.special_Needs_alcohol_Abuse || 'N/A') + '</p>' +
//       '</div>' +
//     '</div>' +
//     '<hr class="dashed">' +
//     '<div class="row">' +
//       '<div class="col-lg-12">' +
//           '<label>Sought Treatment?</label>' + '<p>' +
//       (resident.general.sought_Treatment || 'N/A') + '</p>' +
//       '</div>' +
//     '</div>' +
  
    '<div style="text-align: left;" class="table-responsive">' +
      '<table class="table table-bordered">' +
        '<tr>' +
          '<th class="showHeader">' + '' + '</th>' +
          '<th class="showHeader">' + 'Yes/No' + '</th>' +
          '<th class="showHeader">' + 'Notes' + '</th>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Is the client disabled?' + '</th>' +
          '<td>' + resident.general.disabled + '</td>' +
          '<td>' + resident.general.disabled + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Is the client a veteran?' + '</th>' +
          '<td>' + resident.general.veteran + '</td>' +
          '<td>' + resident.general.veteran + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Is the client taking prescribed medicine?' + '</th>' +
          '<td>' + resident.general.prescribed_medicine + '</td>' +
          '<td>' + resident.general.prescribed_medicine + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Does the client have allergies?' + '</th>' +
          '<td>' + resident.general.allergies + '</td>' +
          '<td>' + resident.general.allergies + '</td>' +
        '</tr>' +
        '<tr>' +
          '<th class="showHeaderLeftAlign">' + 'Does the client speak and read English well?' + '</th>' +
          '<td>' + resident.general.speak_english + '</td>' +
          '<td>' + resident.general.speak_english + '</td>' +
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
          '<td>' + resident.general.special_Needs_None + '</td>' +
          '<td>' + resident.general.special_Needs_Substance_Abuse + '</td>' +
          '<td>' + resident.general.special_Needs_alcohol_Abuse + '</td>' +
          '<td>' + resident.general.sought_Treatment + '</td>' +
        //   '<td>' + resident.general.notes + '</td>' +
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
            '<td>' + resident.identification.id_Card + '</td>' +
            '<td>' + resident.identification.social_security_number + '</td>' +
            '<td>' + resident.identification.passport + '</td>' +
            '<td>' + resident.green_card + '</td>' +
        '</tr>' +
        '<tr>' +
      '</table>' +   
    '</div>';

    '<div class="col-lg-6">' +
    '<label for="ID-Card">ID Card</label>'+ '<p>' +
    (resident.identification.id_Card || 'N/A') + '</p>' +
    '</div>' +
    '<div class="col-lg-6">' +
   ' <label for="Driver-License">Drivers License</label>' + '<p>' +
   (resident.identification.driver_License || 'N/A') + '</p>' +
    '</div>' +
    '<div class="col-lg-6">' +
    '<label for="Birth-Certificate">Birth Certificate</label>'+ '<p>' +
    (resident.identification.birth_Certificate || 'N/A') + '</p>' +
    '</div>' +
    '<div class="col-lg-6">' +
    '<label for="Social-Security-Number">Social Security Number</label>'+ '<p>' +
    (resident.identification.social_Security_number || 'N/A') + '</p>' +
    '</div>' +
    '<div class="col-lg-6">' +
    '<label for="Passport-Number">Passport Number</label>'+ '<p>' +
    (resident.identification.passport_Number || 'N/A') + '</p>' +
    '</div>' +
    '<div class="col-lg-6">' +
    '<label for="Permanent-Resident-Card">Permanent Resident Card</label>'+ '<p>' +
    (resident.identification.permanent_Resident_card || 'N/A') + '</p>' +
    '</div>' +
    '<div class="col-lg-6">' +
    '<label for="Expectations">Expectations</label>'+ '<p>' +
    (resident.identification.information_Type || 'N/A') + '</p>' +
    '</div>' +

    '<div class="col-lg-6">' +
    '<label for="Date-Setup">Date Setup</label>'+ '<p>' +
    (resident.identification.date_Setup || 'N/A') + '</p>' +
    '</div>' +

    '<div class="col-lg-6">' +
    '<label for="Date-Expiration">Date Expiration</label>'+ '<p>' +
    (resident.identification.date_Expiration || 'N/A') + '</p>' +
    '</div>' +

    '<div class="col-lg-6">' +
    '<label for="Days-Left">Days Left</label>'+ '<p>' +
    (resident.identification.days_Left || 'N/A') + '</p>' +
    '</div>' +
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
            '<td>' + resident.identification.associates + '</td>' +
            '<td>' + resident.identification.high_school + '</td>' +
            '<td>' + resident.identification.bachelors + '</td>' +
            '<td>' + resident.identification.masters + '</td>' +
            '<td>' + resident.identification.other_education + '</td>' +
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
            '<td>' + resident.identification.employer_company + '</td>' +
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
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Mental Illines?</label>' + '<p>' +
      (resident.general.mental_Illness || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Mental Illness Type</label>' + '<p>' +
      (resident.general.mental_IllnessType || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>HIV or Aids</label>' + '<p>' +
      (resident.general.hiv_And_aids || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
          '<label>Chronic Health Problems</label>' + '<p>' +
      (resident.general.Chronical_health_Problem || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="col-lg-12">' +
          '<label>Victim of Domestic Violence</label>' + '<p>' +
      (resident.general.victim_Of_domestic_Violence || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
          '<label>Pregnant/Parenting Teen</label>' + '<p>' +
      (resident.general.pregnant_Parenting_Teen || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
          '<label>Ex-Offender(Criminal Record)</label>' + '<p>' +
      (resident.general.exOffender_Criminal_record || 'N/A') + '</p>' +
      '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
    '<div class="col-lg-12">' +
          '<label>Is the client disabled?</label>' + '<p>' +
      (resident.general.disabled_Yes || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
          '<label>Is the client disabled?</label>' + '<p>' +
      (resident.general.disabled || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Does Client have documentation of this?</label>' + '<p>' +
      (resident.general.disability_Documentation|| 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
      '<label>Does Client have documentation of this?</label>' + '<p>' +
  (resident.general.disability_Type || 'N/A') + '</p>' +
  '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Is the client a veteran?</label>' + '<p>' +
      (resident.general.veteran || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
    '<div class="col-lg-12">' +
          '<label>Does the client have documentation of this?</label>' + '<p>' +
      (resident.general.veteranDocumentation || 'N/A') + '</p>' +
      '</div>' +
   

      '<div class="col-lg-12">' +
          '<label>Does the client speak and read English well?</label>' + '<p>' +
      (resident.general.speak_english || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
          '<label>Notes?</label>' + '<p>' +
      (resident.general.primary_Language || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Is the client taking prescribed medication?</label>' + '<p>' +
      (resident.general.prescribed_medication || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
          '<label>Notes</label>' + '<p>' +
      (resident.general.med_Notes || 'N/A') + '</p>' +
      '</div>' +
    '</div>' +
    '<hr class="dashed">' +
    '<div class="row">' +
      '<div class="col-lg-12">' +
          '<label>Does the client have any allergies?</label>' + '<p>' +
      (resident.general.allergies || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-12">' +
          '<label>Notes</label>' + '<p>' +
      (resident.general.allergy_Notes || 'N/A') + '</p>' +
      '</div>' +
    '</div>';
}

function displayIdentificationtab(resident) {
  document.querySelector('#show-indentification').innerHTML = '<div class="row">' +
    //   '<div class="col-lg-6">' +
    //   '<label for="ID-Card">ID Card</label>'+ '<p>' +
    //   (resident.identification.id_Card || 'N/A') + '</p>' +
    //   '</div>' +
    //   '<div class="col-lg-6">' +
    //  ' <label for="Driver-License">Drivers License</label>' + '<p>' +
    //  (resident.identification.driver_License || 'N/A') + '</p>' +
    //   '</div>' +
    //   '<div class="col-lg-6">' +
    //   '<label for="Birth-Certificate">Birth Certificate</label>'+ '<p>' +
    //   (resident.identification.birth_Certificate || 'N/A') + '</p>' +
    //   '</div>' +
    //   '<div class="col-lg-6">' +
    //   '<label for="Social-Security-Number">Social Security Number</label>'+ '<p>' +
    //   (resident.identification.social_Security_number || 'N/A') + '</p>' +
    //   '</div>' +
    //   '<div class="col-lg-6">' +
    //   '<label for="Passport-Number">Passport Number</label>'+ '<p>' +
    //   (resident.identification.passport_Number || 'N/A') + '</p>' +
    //   '</div>' +
    //   '<div class="col-lg-6">' +
    //   '<label for="Permanent-Resident-Card">Permanent Resident Card</label>'+ '<p>' +
    //   (resident.identification.permanent_Resident_card || 'N/A') + '</p>' +
    //   '</div>' +
    //   '<div class="col-lg-6">' +
    //   '<label for="Expectations">Expectations</label>'+ '<p>' +
    //   (resident.identification.information_Type || 'N/A') + '</p>' +
    //   '</div>' +

    //   '<div class="col-lg-6">' +
    //   '<label for="Date-Setup">Date Setup</label>'+ '<p>' +
    //   (resident.identification.date_Setup || 'N/A') + '</p>' +
    //   '</div>' +

    //   '<div class="col-lg-6">' +
    //   '<label for="Date-Expiration">Date Expiration</label>'+ '<p>' +
    //   (resident.identification.date_Expiration || 'N/A') + '</p>' +
    //   '</div>' +

    //   '<div class="col-lg-6">' +
    //   '<label for="Days-Left">Days Left</label>'+ '<p>' +
    //   (resident.identification.days_Left || 'N/A') + '</p>' +
    //   '</div>' +
    //   '</div>';
}

function displayEmploymenttab(resident) {
  document.querySelector('#show-employment').innerHTML = '<div class="row">' +
  '<div class="col-lg-6">' +
      '<label for="Employment">Employment History</label>'+ '<p>' +
      (resident.employmenteducation.full_Time|| 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="CompanyName">Company Name</label>'+ '<p>' +
      (resident.employmenteducation.Company_Name || 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="Address">Street Address</label>'+ '<p>' +
      (resident.employmenteducation.Address || 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="City">City</label>'+ '<p>' +
      (resident.employmenteducation.City || 'N/A') + '</p>' +
      '</div>' +
  
  '<div class="col-lg-6">' +
      '<label for="City">City</label>'+ '<p>' +
      (resident.employmenteducation.City || 'N/A') + '</p>' +
      '<label for="state">State</label>'+ '<p>' +
      (resident.employmenteducation.state || 'N/A') + '</p>' +
      '<label class="control-label" for="Zip">Zip</label>'+ '<p>' +
      (resident.employmenteducation.Zip || 'N/A') + '</p>' +
      '</div>' +

  '<div class="col-lg-6">' +
      '<label class="control-label" for="Phone">Phone Number</label>'+ '<p>' +
      (resident.employmenteducation.Phone || 'N/A') + '</p>' +
      '</div>' +

  '<div class="col-lg-6">' +
      '<label for="Supervisor">Supervisor Name</label>'+ '<p>' +
      (resident.employmenteducation.Supervisor || 'N/A') + '</p>' +
      '</div>' +
  '<div class="col-lg-6">' +
      '<label for="Startdate">Start Date</label>'+ '<p>' +
      (resident.employmenteducation.Start_date || 'N/A') + '</p>' +
      '</div>' +
  
  '<div class="col-lg-6">' +
  '<label for="Enddate">End Date</label>'+ '<p>' +
      (resident.employmenteducation.End_date || 'N/A') + '</p>' +
      '</div>' +
  
  '<div class="col-lg-6">' +
      '<label for="Parttime">Part time</label>'+ '<p>' +
          (resident.employmenteducation.part_Time || 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
      '<label for="Selfemployed">Self Employed</label>'+ '<p>' +
          (resident.employmenteducation.self_Employed || 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
      '<label for="temp">Temporary</label>'+ '<p>' +
          (resident.employmenteducation.temp || 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
      '<label for="seasonal">seasonal</label>'+ '<p>' +
          (resident.employmenteducation.seasonal || 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
          '<label for="education">Education</label>'+ 
      '<label for="highSchool">High School</label>'+ '<p>' +
          (resident.employmenteducation.high_School|| 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
      '<label for="associateDegree">Associate Degree</label>'+ '<p>' +
          (resident.employmenteducation.associates_Degree || 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
      '<label for="Marketing">Major</label>'+ '<p>' +
          (resident.employmenteducation.Marketing || 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
      '<label for="bachelorsDegree">Bachelors Degree</label>'+ '<p>' +
          (resident.employmenteducation.Bachelors_Degree || 'N/A') + '</p>' +
          '</div>' +

          '<div class="col-lg-6">' +
          '<label for="mastersdegree">Masters Degree</label>'+ '<p>' +
              (resident.employmenteducation.mastersDegree || 'N/A') + '</p>' +
              '</div>' +

          '<div class="col-lg-6">' +
              '<label for="Other">Other</label>'+ '<p>' +
                  (resident.employmenteducation.other || 'N/A') + '</p>' +
                  '</div>' +
      '</div>';
}

function displayDisciplinaryTab(resident) {
    document.querySelector('#show-disciplinary').innerHTML = '<div class="row">' +
        '<div class="col-lg-6">' +
        '<label for="">Pilsen Wellness</label>'+ '<p>' +
        (resident.disciplanary. pilsen_Wellness || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
       ' <label for="">Failure to Complete/Do Chore</label>' + '<p>' +
       (resident.disciplanary.failure_Complete_do_Chore || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">Comments</label>'+ '<p>' +
        (resident.disciplanary.comment || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">Date</label>'+ '<p>' +
        (resident.disciplanary.date_Disciplinary || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">No Show/ No Call</label>'+ '<p>' +
        (resident.disciplanary.no_Show_no_Call || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">No Show: Program Activities/House Meeting</label>'+ '<p>' +
        (resident.disciplanary.no_Show_program_Activities || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">Lack of Hygiene/Cleanliness in Dormitory</label>'+ '<p>' +
        (resident.disciplanary.lack_Hygiene_cleanliness || 'N/A') + '</p>' +
        '</div>' +
  
        '<div class="col-lg-6">' +
        '<label for="">Failure to follow smoking/loitering policy</label>'+ '<p>' +
        (resident.disciplanary.failure_To_follow_Smoking_policy || 'N/A') + '</p>' +
        '</div>' +
  
        '<div class="col-lg-6">' +
        '<label for="">Confrontational/Problematic Behavior</label>'+ '<p>' +
        (resident.disciplanary.confrontational_Behavior || 'N/A') + '</p>' +
        '</div>' +
  
        '<div class="col-lg-6">' +
        '<label for="">Damage to SJOM/Others property</label>'+ '<p>' +
        (resident.disciplanary.damage_To_sjom_Property || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">No Show for case manager appointment</label>'+ '<p>' +
        (resident.disciplanary.no_Show_for_Case_manager_App || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">Failure to meet behavioral expectations</label>'+ '<p>' +
        (resident.disciplanary.failure_To_meet_Behavioral_expectation || 'N/A') + '</p>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<label for="">Fighting</label>'+ '<p>' +
        (resident.disciplanary.fighting || 'N/A') + '</p>' +
        '</div>' +
        '</div>';
  }
  
      

function displayRequirementstab(resident) {
        document.querySelector('#show-requirements').innerHTML = '<div class="row">' +
        '<div class="col-lg-6">' +
      '<label for="Employment">Bottom Bunk Requested</label>'+ '<p>' +
      (resident.requirementlist.bottom_Bunk_requested || 'N/A') + '</p>' +
      '</div>' +
      '<div class="col-lg-6">' +
      '<label for="Employment">Pilsen Wellness Requested</label>'+ '<p>' +
      (resident.requirementlist.pilsen_Wellness_Req || 'N/A') + '</p>' +
      '</div>' +
      '<label for="Employment">Background</label>'+ '<p>' +
      (resident.requirementlist.background_Check || 'N/A') + '</p>' +
      '</div>' +
      '<label for="Employment">Previous Part</label>'+ '<p>' +
      (resident.requirementlist.previous_Part || 'N/A') + '</p>' +
      '</div>' +
      '<label for="Employment">Referral</label>'+ '<p>' +
      (resident.requirementlist.referral || 'N/A') + '</p>' +
      '</div>' +
      '<label for="Employment">Tb Test</label>'+ '<p>' +
      (resident.requirementlist.tb_Test || 'N/A') + '</p>' +
      '</div>' +
      '</div>';
    }
      
  
  
  

  
  

     


      

