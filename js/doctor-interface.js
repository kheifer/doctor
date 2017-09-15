import {Doctor} from './../js/doctor.js';


$("#search").submit(function(event) {
   evt.preventDefault();
   let location = $('#location').val();
   let specialty = $('#issue').val();
   $("#results").html("");
   Doctor.getLocation(location, specialty)
     .then(Doctor.getDoctors)

     });
 });
