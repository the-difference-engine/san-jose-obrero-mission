function submitResidentsForm() {
  var url = "https://qa-san-jose.herokuapp.com/api/v1/residents";
    //var url = "http://localhost:3000/api/v1/residents";
    var data = {
        resident: {
              first_name: document.forms.resident.first_name.value,
              last_name: document.forms.resident.last_name.value,
              date: document.forms.resident.date.value,
              hmis_number: document.forms.resident.hmis_number.value,
              hmis_entry_date: document.forms.resident.hmis_entry_date.value,
              gender: document.forms.resident.gender.value,
              ethnicity: document.forms.resident.ethnicity.value,
              bed_id: document.forms.resident.bed_id.value,
              resident_race: document.forms.resident.resident_race.value,
              cause_of_homeslessness: document.forms.resident.cause_of_homelessness.value,
              length_of_homelessness: document.forms.resident.length_of_homelessness.value,
              prior_living_situation: document.forms.resident.priorLivingSituation.value,
              number_of_shelters: document.forms.resident.number_of_shelters.value,
              chronicallyHomeless: document.forms.resident.chronicallyHomeless.value,
              specialNeedsNone: document.forms.resident.specialNeedsNone.value,
              specialNeedsSubstanceAbuse: document.forms.resident.specialNeedsSubstanceAbuse.value,
              specialNeedsAlcoholAbuse: document.forms.resident.specialNeedsAlcoholAbuse.value,
              soughtTreatment: document.forms.resident.soughtTreatment.value,
              mentalIllness: document.forms.resident.mentalIllness.value,
              mentalIllnessType: document.forms.resident.mentalIllnessType.value,
              hivAndaids: document.forms.resident.hivAndaids.value, 
              victimofDomesticViolence: document.forms.resident.victimofDomesticViolence.value,
              pregnantParentingTeen: document.forms.resident.pregnantParentingTeen.value,
              exOffenderCriminalRecord: document.forms.resident.exOffenderCriminalRecord.value,
              disabled: document.forms.resident.disabled.value,
              disabilityDocumentation: document.forms.resident.disabilityDocumentation.value,
              disabilityType: document.forms.resident.disabilityType.value,
              veteran: document.forms.resident.veteran.value,
              veteranDocumentation: document.forms.resident.veteranDocumentation.value,
              dischargeType: document.forms.resident.dischargeType.value,
              veteranType: document.forms.resident.veteranType.value,
              idCard: document.forms.resident.idCard.value,
              driverLicense: document.forms.resident.driverLicense.value,
              birthCertificate: document.forms.resident. birthCertificate.value,
              socialSecuritynumber: document.forms.resident.socialSecuritynumber.value,
              passportNumber: document.forms.resident.passportNumber.value,
              permanentResidentcard: document.forms.resident.permanentResidentcard.value,
              informationType: document.forms.resident.informationType.value,
              dateSetup: document.forms.resident.dateSetup.value,
              dateExpiration: document.forms.resident.dateExpiration.value,
              daysLeft: document.forms.resident.daysLeft.value,
              companyName: document.forms.resident.companyName.value,
              address: document.forms.resident.address.value,
              city: document.forms.resident.city.value,
              state: document.forms.resident.state.value,
              zip: document.forms.resident.zip.value,
              phone: document.forms.resident.phone.value,
              supervisor: document.forms.resident.supervisor.value, 
              stateDate: document.forms.resident.stateDate.value,
              endDate: document.forms.resident.endDate.value,
              marketing: document.forms.resident.marketing.value,
        }
    };

var id = location.pathname.split('/')[2];
getResident(id);

function getResident(residentId) {
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
     console.log('data ', data);
     var nameAge = data.full_name;
     document.querySelector('#name-age').innerHTML = nameAge;
     document.querySelector('#personal-information').innerHTML = personalInformation(data);
   })
   .catch(function(error) {
     console.log(JSON.stringify(error));
   });
}

function personalInformation(resident) {
  return  '<div class="show_wrapper_row1">' +
             '<div class="resident_show_box a"><h5>Full Name</h5> ' + '<p>' + resident.full_name + '</p></div>' +
             '<div class="resident_show_box b"><h5>Gender:</h5> ' + '<p>' + resident.gender + '</p></div>' +
             '<div class="resident_show_box c"><h5>Phone Number:</h5> ' + '<p>' + resident.phone_number + '</p></div>' +
         '</div>' +
         '<div class="show_wrapper_row2">' +
             '<div class="resident_show_box d"><h5>Date of Birth:</h5> ' + '<p>' + resident.date_of_birth + '</p></div>' +
             '<div class="resident_show_box e"><h5>Age:</h5> ' + '<p>' + resident.age + '</p></div>' +
             '<div class="resident_show_box f"><h5>Ethnicity:</h5> ' + '<p>' + resident.ethnicity + '</p></div>' +
             '<div class="resident_show_box g"><h5>Race:</h5> ' + '<p>' + resident.resident_race + '</p></div>' +
              '<div class="resident_show_box h"><h5>Status:</h5> ' + '<p>' + resident.status + '</p></div>' +
         '</div>' +
         '<div class="show_wrapper_row3">' +
             '<div class="resident_show_box i"><h5>Case Manager:</h5> ' + '<p>' + resident.case_manager + '</p></div>' +
             '<div class="resident_show_box j"><h5>Bed:</h5> ' + '<p>' + resident.bed_id
              + '</p></div>' +
             '<div class="resident_show_box k"><h5>Bed lock combo number:</h5> ' + '<p>' + resident.bed_lock_combo_number + '</p></div>' +
         '</div>' +
         '<div class="show_wrapper_row4">' +
             '<div class="resident_show_box l"><h5>Admitted:</h5>' + '<p>' + resident.admitted_date + '</p></div>' +
             '<div class="resident_show_box m"><h5>Released:</h5> ' + '<p>' + resident.released_date + '</p></div>' +
             '<div class="resident_show_box n"><h5>Tenure:</h5> ' + '<p>' + resident.tenure + '</p></div>' +
             '<div class="resident_show_box o"><h5>HMIS#:</h5> ' + '<p>' + resident.hmis_number
              + '</p></div>' +
             '<div class="resident_show_box p"><h5>HMIS Entry Date:</h5> ' + '<p>' + resident.hmis_entry_date
              + '</p></div>' +
         '</div>';
  }

