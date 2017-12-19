function getResident(residentId) {
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
      var nameAge = data.full_name + ' ' +  data.age + ' yo | ' + data.gender;
      document.querySelector('#name-age').innerHTML = nameAge;
      document.querySelector('#personal-information').innerHTML = personalInformation(data);
    })
    .catch(function(error) {
      console.log(JSON.stringify(error));
    });
}

var id = location.pathname.split('/')[2]
getResident(id)

function personalInformation(resident) {
  return  '<div class="personal-info-container">' +
              '<span>Full Name:</span> ' + '<span>' + resident.full_name + '</span><br />' +
              '<span>Ethnicity:</span> ' + '<span>' + resident.ethnicity + '</span><br />' + 
          '</div>';
}
