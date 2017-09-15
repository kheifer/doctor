var apiKey = require('./../.env').apiKey;

export let Doctor = {
  getLocation: (location, issue) => {
  return new Promise( function(resolve, reject) {
    try {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode( { address: location }, function(results) {
        if (results.length == 0) {
          throw new Error("Unable to show location");
        }
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        let coordinates = `${lat},${lng},25`;
        resolve(newLocation, issue);
        });
    } catch (e) {
      console.log(e.message);
    }
  });
},
  getDoctors: (newLocation, issue) => {
    return new Promise( function(resolve, reject) {
      $.ajax( {
        url: `https://api.betterdoctor.com/2016-03-01/doctors`,
        method: "GET",
        data: {
          query: issue,
          location: newLocation,
          sort: 'full-name-desc',
          skip: 0,
          limit: '20',
          user_key: apiKey
        },
        dataType: 'json',
        success: function(response) {
          try {
            let doctorBio = response.data.map( function(doctor) {
              return {
                first: doctor.profile.first_name,
                last: doctor.profile.last_name,
                title: doctor.profile.title,
                phone: doctor.phones[0].number,
                address: doctor.practices[0].visit_address.street,
                speciality: doctor.specialties[0].name,
                accepting: doctor.practices[0].accepts_new_patients,
                picture: doctor.profile.image_url,
                website: doctor.practices[0].website,
                bio: doctor.profile.bio,
                uid: doctor.uid
              };
            });
            resolve(doctorBio);
          } catch (e) {
            console.log(e.message);
          }
        },
      });
    });
  },
};
