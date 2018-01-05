function submitResidentsForm() {
//   var url = "https://qa-san-jose.herokuapp.com/api/v1/residents";
 var url = "http://localhost:3000/api/v1/residents";
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



        }
    };

    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    fetch(url, {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
    });
}
