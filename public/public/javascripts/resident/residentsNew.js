
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
                number_of_shelters: document.forms.resident.number_of_shelters.value,
                chronically_Homeless: document.forms.resident.chronicallyHomeless.value,
                special_Needs_None: document.forms.resident.specialNeedsNone.value,
                special_Needs_Substance_Abuse: document.forms.resident.specialNeedsSubstanceAbuse.value,
                sought_Treatment: document.forms.resident.soughtTreatment.value,
                mental_Illness: document.forms.resident.mentalIllness.value,
                mental_IllnessType: document.forms.resident.mentalIllnessType.value,
                hiv_And_aids: document.forms.resident.hivAndaids.value, 
                victim_Of_domestic_Violence: document.forms.resident.victimofDomesticViolence.value,
                pregnant_Parenting_Teen: document.forms.resident.pregnantParentingTeen.value,
                exOffender_Criminal_record: document.forms.resident.exOffenderCriminalRecord.value,
                disabled: document.forms.resident.disabled.value,
                disability_Documentation: document.forms.resident.disabilityDocumentation.value,
                disability_Type: document.forms.resident.disabilityType.value,
                veteran: document.forms.resident.veteran.value,
                veteran_Documentation: document.forms.resident.veteranDocumentation.value,
                discharge_Type: document.forms.resident.dischargeType.value,
                check_Box_hiv: document.forms.resident.checkBoxhiv.value,
                check_Box_health_Problems: document.forms.resident.checkBoxhealthProblems.value,
                check_Box_victim_Of_violence: document.forms.resident.checkBoxvictimOfviolence.value,
                check_Box_pregnant_Teen: document.forms.resident.checkBoxpregnantTeen.value,
                check_Box_exOffender: document.forms.resident.checkBoxexOffender.value,
                speak_english: document.forms.resident.speak_english.value,
                primary_Language: document.forms.resident.primaryLanguage.value,
                prescribed_medication: document.forms.resident.prescribed_medication.value,
                med_Notes: document.forms.resident.medNotes.value,
                allergies: document.forms.resident.allergies.value,
                allergy_Notes: document.forms.resident.allergyNotes.value,

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
                days_Left: document.forms.resident.daysLeft.value,
              },

              employmenteducation: {
                full_Time: document.forms.resident.fullTime.value,
                Company_Name: document.forms.resident.CompanyName.value,
                Address: document.forms.resident.Address.value,
                City: document.forms.resident.City.value,
                state: document.forms.resident.state.value,
                Zip: document.forms.resident.Zip.value,
                Phone: document.forms.resident.Phone.value,
                Supervisor: document.forms.resident.Supervisor.value,
                Start_date: document.forms.resident.Startdate.value,
                End_date: document.forms.resident.Enddate.value,
                part_Time: document.forms.resident.partTime.value,
                self_Employed: document.forms.resident.selfEmployed.value,
                temp: document.forms.resident.temp.value,
                seasonal: document.forms.resident.seasonal.value,
                high_School: document.forms.resident.highSchool.value,
                associates_Degree: document.forms.resident.associatesDegree.value,
                Marketing: document.forms.resident.Marketing.value,
                bachelors_Degree: document.forms.resident.bachelorsDegree.value,
                masters_Degree: document.forms.resident.mastersDegree.value,
                other: document.forms.resident.other.value,

              },
              
              disciplanary: {
                pilsen_Wellness: document.forms.resident.pilsenWellness.value,
                failure_Complete_do_Chore: document.forms.resident.failureCompletedoChore.value,
                comment: document.forms.resident.comment.value,
                date_Disciplinary: document.forms.resident.dateDisciplinary.value,
                no_Show_no_Call: document.forms.resident.noShownoCall.value,
                no_Show_program_Activities: document.forms.resident.noShowprogramActivities.value,
                lack_Hygiene_cleanliness: document.forms.resident.lackHygienecleanliness.value,
                failure_To_follow_Smoking_policy: document.forms.resident.failureTofollowSmokingpolicy.value,
                confrontational_Behavior: document.forms.resident.confrontationalBehavior.value,
                damage_To_sjom_Property: document.forms.resident.damageTosjomProperty.vaule,
                no_Show_for_Case_manager_App: document.forms.resident.noShowforCasemanagerApp.value,
                failure_To_meet_Behavioral_expectation: document.forms.resident.failureTomeetBehavioralexpectation.value,
                fighting: document.forms.resident.fighting.value,

             },
            
             
             requirementlist: {
                bottom_Bunk_requested: document.forms.resident.bottomBunkrequested.value,
                pilsen_Wellness_Req: document.forms.resident.pilsenWellnessReq.value,
                background_Check: document.forms.resident.backgroundCheck.value,
                previous_Part: document.forms.resident.previousPart.value,
                referral: document.forms.resident.referral.value,
                tb_Test: document.forms.resident.tbTest.value,

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
