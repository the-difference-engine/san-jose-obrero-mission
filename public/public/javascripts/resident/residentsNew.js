
function submitResidentsForm() {
//   var url = "https://qa-san-jose.herokuapp.com/api/v1/residents";
 var url = "http://localhost:3000/api/v1/residents";
 

    var data = {
        resident: {
              first_name: document.forms.resident.first_name.value,
              last_name: document.forms.resident.last_name.value,
              date_of_birth: document.forms.resident.dateOfBirth.value,
              gender: document.forms.resident.gender.value,
              ethnicity: document.forms.resident.ethnicity.value,
              bed_id: document.forms.resident.bed_id.value,
              resident_race: document.forms.resident.resident_race.value,

              admittance_information: {
                admitted_date: document.forms.resident.admittedDate.value,
                released_date: document.forms.resident.releasedDate.value,
                tenure: document.forms.resident.tenure.value,
                hmis_number: document.forms.resident.hmis_number.value,
                hmis_entry_date: document.forms.resident.hmis_entry_date.value
              },

              General:{
                cause_of_homeslessness: document.forms.resident.cause_of_homelessness.value,
                length_of_homelessness: document.forms.resident.length_of_homelessness.value,
                prior_living_situation: document.forms.resident.priorLivingSituation.value,
                number_of_shelters: document.forms.resident.number_of_shelters.value,
                chronicallyHomeless: document.forms.resident.chronicallyHomeless.value,

              },
              


    
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
            //   veteranType: document.forms.resident.veteranType.value,
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

              checkBoxhiv: document.forms.resident.checkBoxhiv.value,
              checkBoxhealthProblems: document.forms.resident.checkBoxhealthProblems.value,
              checkBoxvictimOfviolence: document.forms.resident.checkBoxvictimOfviolence.value,
              checkBoxpregnantTeen: document.forms.resident.checkBoxpregnantTeen.value,
              checkBoxexOffender: document.forms.resident.checkBoxexOffender.value,
              speak_english: document.forms.resident.speak_english.value,
              primaryLanguage: document.forms.resident.primaryLanguage.value,
              prescribed_medication: document.forms.resident.prescribed_medication.value,
              medNotes: document.forms.resident.medNotes.value,
              allergies: document.forms.resident.allergies.value,
              allergyNotes: document.forms.resident.allergyNotes.value,

              partTime: document.forms.resident.partTime.value,
              selfEmployed: document.forms.resident.selfEmployed.value,
              temp: document.forms.resident.temp.value,
              seasonal: document.forms.resident.seasonal.value,
              highSchool: document.forms.resident.highSchool.value,
              associatesDegree: document.forms.resident.associatesDegree.value,
              Marketing: document.forms.resident.Marketing.value,
              bachelorsDegree: document.forms.resident.bachelorsDegree.value,
              mastersDegree: document.forms.resident.mastersDegree.value,
              other: document.forms.resident.other.value,


              pilsenWellness: document.forms.resident.pilsenWellness.value,
              failureCompletedoChore: document.forms.resident.failureCompletedoChore.value,
              comment: document.forms.resident.comment.value,
              dateDisciplinary: document.forms.resident.dateDisciplinary.value,
              noShownoCall: document.forms.resident.noShownoCall.value,
              noShowprogramActivities: document.forms.resident.noShowprogramActivities.value,
              lackHygienecleanliness: document.forms.resident.lackHygienecleanliness.value,
              failureTofollowSmokingpolicy: document.forms.resident.failureTofollowSmokingpolicy.value,
              confrontationalBehavior: document.forms.resident.confrontationalBehavior.value,
              damageTosjomProperty: document.forms.resident.damageTosjomProperty.vaule,
              noShowforCasemanagerApp: document.forms.resident.noShowforCasemanagerApp.value,
              failureTomeetBehavioralexpectation: document.forms.resident.failureTomeetBehavioralexpectation.value,
              fighting: document.forms.resident.fighting.value,


              bottomBunkrequested: document.forms.resident.bottomBunkrequested.value,
              pilsenWellnessReq: document.forms.resident.pilsenWellnessReq.value,
              backgroundCheck: document.forms.resident.backgroundCheck.value,
              previousPart: document.forms.resident.previousPart.value,
              referral: document.forms.resident.referral.value,
              tbTest: document.forms.resident.tbTest.value
              
    







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
