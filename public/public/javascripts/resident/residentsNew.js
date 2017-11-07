function submitResidentsForm() {
    var url = "http://localhost:3004/api/v1/residents";
    var data = {
        resident: {
              first_name: document.forms.residents.first_name.value,
              last_name: document.forms.residents.last_name.value,
              date: document.forms.residents.date.value,
              hmis_number: document.forms.residents.hmis_number.value,
              hmis_entry_date: document.forms.residents.hmis_entry_date.value,
              documented: document.forms.residents.documented.value,
              gender: document.forms.residents.gender.value,
              ethnicity: document.forms.residents.ethnicity.value,
              bed_id: document.forms.residents.bed_id.value,
              resident_race: document.forms.residents.resident_race.value,
              cause_of_homeslessness: document.forms.residents.cause_of_homelessness.value,
              length_of_homelessness: document.forms.residents.length_of_homelessness.value,
              prior_living_situation: document.forms.residents.prior_living_situation.value,
              number_of_shelters: document.forms.residents.number_of_shelters.value,
              chronically_homeless: document.forms.residents.chronically_homeless.value
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
