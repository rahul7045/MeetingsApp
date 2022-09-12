import {Meeting} from '../models/Meetings'

const Meetings = function (date : string) {
  return fetch(
    `https://mymeetingsapp.herokuapp.com/api/calendar?date=${date}`,
    {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(response);
    return response.json();
  });
};

export {Meetings}
 