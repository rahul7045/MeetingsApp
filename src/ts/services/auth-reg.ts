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
      if (!response.ok) {
        
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(function (registerResponse) {
      
      return registerResponse; 
    });
}


export {
   register
};