import  Register  from '../models/Register'

function register(user : Register) {
  return fetch(`https://mymeetingsapp.herokuapp.com/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        
        throw new Error(response.statusText);
      }
      //console.log("user added 1")
      return response.json();
    })
    .then(function (registerResponse) {
      //console.log("user added 2")
       alert("User Registered");
      return registerResponse; 
    });
}


export {
   register
};