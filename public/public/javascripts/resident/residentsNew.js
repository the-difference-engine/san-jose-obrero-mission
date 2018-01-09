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

              checkBoxhiv: document.forms.resident.checkBoxhiv.value,
              checkBoxhealthProblems: document.forms.resident.checkBoxhealthProblems.value,
              checkBoxvictimOfviolence: document.forms.checkBoxvictimOfviolence.value,
              checkBoxpregnantTeen: document.forms.checkBoxpregnantTeen.value,
              checkBoxexOffender: document.forms.checkBoxexOffender.value,
              speak_english: document.forms.speak_english.value,
              primaryLanguage: document.forms.primaryLanguage.value,
              prescribed_medication: document.forms.prescribed_medication.value,
              medNotes: document.forms.medNotes.value,
              allergies: document.forms.allergies.value,
              allergyNotes: document.forms.allergyNotes.value,

              partTime: document.forms.partTime.value,
              selfEmployed: document.forms.selfEmployed.value,
              temp: document.forms.temp.value,
              seasonal: document.forms.temp.value,
              highSchool: document.forms.temp.value,
              associatesDegree: document.forms.associatesDegree.value,
              Marketing: document.forms.Marketing.value,
              bachelorsDegree: document.forms.bachelorsDegree.value,
              mastersDegree: document.forms.mastersDegree.value,
              other: document.forms.other.value,


              pilsenWellness: document.forms.pilsenWellness.value,
              failureCompletedoChore: document.forms.failureCompletedoChore.value,
              comment: document.forms.comment.value,
              dateDisciplinary: document.forms.dateDisciplinary.value,
              noShownoCall: document.forms.noShownoCall.value,
              noShowprogramActivities: document.forms.noShowprogramActivities.value,
              lackHygienecleanliness: document.forms.lackHygienecleanliness.value,
              failureTofollowSmokingpolicy: document.forms.failureTofollowSmokingpolicy.value,
              confrontationalBehavior: document.forms.confrontationalBehavior.value,
              damageTosjomProperty: document.forms.damageTosjomProperty.vaule,
              noShowforCasemanagerApp: document.forms.noShowforCasemanagerApp.value,
              failureTomeetBehavioralexpectation: document.forms.failureTomeetBehavioralexpectation.value,
              fighting: document.forms.fighting.value,


              bottomBunkrequested: document.forms.bottomBunkrequested.value,
              pilsenWellnessReq: document.forms.pilsenWellnessReq.value,
              backgroundCheck: document.forms.backgroundCheck.value,
              previousPart: document.forms.previousPart.value,
              referral: document.forms.referral.value,
              tbTest: document.forms.tbTest.value,
              
    







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
