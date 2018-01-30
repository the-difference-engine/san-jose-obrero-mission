
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
              general: {
                cause_of_homeslessness: document.forms.resident.cause_of_homelessness.value,
                length_of_homelessness: document.forms.resident.length_of_homelessness.value,
                prior_living_situation: document.forms.resident.priorLivingSituation.value,
                length_of_prior_situation: document.forms.resident.lengthOfPriorSituation.value,
                number_of_shelters: document.forms.resident.number_of_shelters.value,
                chronically_Homeless: document.forms.resident.chronicallyHomeless.checked,
                special_Needs_None: document.forms.resident.specialNeedsNone.checked,
                special_Needs_Substance_Abuse: document.forms.resident.specialNeedsSubstanceAbuse.checked,
                special_Needs_alcohol_Abuse: document.forms.resident.specialNeedsAlcoholAbuse.checked,
                sought_Treatment: document.forms.resident.soughtTreatment.checked,
                mental_Illness: document.forms.resident.mentalIllness.checked,
                mental_IllnessType: document.forms.resident.mentalIllnessType.value,
                hiv_And_aids: document.forms.resident.hivAndaids.checked,
                Chronical_health_Problem: document.forms.resident.Chronical_health_Problem.checked, 
                victim_Of_domestic_Violence: document.forms.resident.victimofDomesticViolence.checked,
                pregnant_Parenting_Teen: document.forms.resident.pregnantParentingTeen.checked,
                exOffender_Criminal_record: document.forms.resident.exOffenderCriminalRecord.checked,
                disabled_Yes: document.forms.resident.disabledYes.checked,
                disabled: document.forms.resident.disabled.checked,
                disability_Documentation: document.forms.resident.disabilityDocumentation.checked,
                disability_Type: document.forms.resident.disabilityType.value,
                veteran: document.forms.resident.veteran.checked,
                veteran_Documentation: document.forms.resident.veteranDocumentation.value,
                discharge_Type: document.forms.resident.dischargeType.value,
                speak_english: document.forms.resident.speak_english.checked,
                primary_Language: document.forms.resident.primaryLanguage.value,
                prescribed_medication: document.forms.resident.prescribed_medication.checked,
                med_Notes: document.forms.resident.medNotes.value,
                allergies: document.forms.resident.allergies.checked,
                allergy_Notes: document.forms.resident.allergyNotes.value
              },
              identification: {
                id_Card: document.forms.resident.idCard.value,
                driver_License: document.forms.resident.driverLicense.value,
                birth_Certificate: document.forms.resident. birthCertificate.value,
                social_Security_number: document.forms.resident.socialSecuritynumber.value,
                passport_Number: document.forms.resident.passportNumber.value,
                permanent_Resident_card: document.forms.resident.permanentResidentcard.value,
                information_Type: document.forms.resident.informationType.value,
                date_Setup: document.forms.resident.dateSetup.value,
                date_Expiration: document.forms.resident.dateExpiration.value,
                days_Left: document.forms.resident.daysLeft.value
              },
              employmenteducation: {
                full_Time: document.forms.resident.fullTime.checked,
                Company_Name: document.forms.resident.CompanyName.value,
                Address: document.forms.resident.Address.value,
                City: document.forms.resident.City.value,
                state: document.forms.resident.state.value,
                Zip: document.forms.resident.Zip.value,
                Phone: document.forms.resident.Phone.value,
                Supervisor: document.forms.resident.Supervisor.value,
                Start_date: document.forms.resident.Startdate.value,
                End_date: document.forms.resident.Enddate.value,
                part_Time: document.forms.resident.partTime.checked,
                self_Employed: document.forms.resident.selfEmployed.checked,
                temp: document.forms.resident.temp.checked,
                seasonal: document.forms.resident.seasonal.checked,
                high_School: document.forms.resident.highSchool.checked,
                associates_Degree: document.forms.resident.associatesDegree.checked,
                Marketing: document.forms.resident.Marketing.value,
                bachelors_Degree: document.forms.resident.bachelorsDegree.checked,
                masters_Degree: document.forms.resident.mastersDegree.checked,
                other: document.forms.resident.other.checked
              },
              disciplanary: {
                pilsen_Wellness: document.forms.resident.pilsenWellness.value,
                failure_Complete_do_Chore: document.forms.resident.failureCompletedoChore.checked,
                comment: document.forms.resident.comment.value,
                date_Disciplinary: document.forms.resident.dateDisciplinary.value,
                no_Show_no_Call: document.forms.resident.noShownoCall.checked,
                no_Show_program_Activities: document.forms.resident.noShowprogramActivities.checked,
                lack_Hygiene_cleanliness: document.forms.resident.lackHygienecleanliness.checked,
                failure_To_follow_Smoking_policy: document.forms.resident.failureTofollowSmokingpolicy.checked,
                confrontational_Behavior: document.forms.resident.confrontationalBehavior.checked,
                damage_To_sjom_Property: document.forms.resident.damageTosjomProperty.checked,
                no_Show_for_Case_manager_App: document.forms.resident.noShowforCasemanagerApp.checked,
                failure_To_meet_Behavioral_expectation: document.forms.resident.failureTomeetBehavioralexpectation.checked,
                fighting: document.forms.resident.fighting.checked
             },
             requirementlist: {
                bottom_Bunk_requested: document.forms.resident.bottomBunkrequested.checked,
                pilsen_Wellness_Req: document.forms.resident.pilsenWellnessReq.checked,
                background_Check: document.forms.resident.backgroundCheck.checked,
                previous_Part: document.forms.resident.previousPart.checked,
                referral: document.forms.resident.referral.checked,
                tb_Test: document.forms.resident.tbTest.check
             },
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
