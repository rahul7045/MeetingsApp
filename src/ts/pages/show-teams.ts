import '../../scss/pages/teams.scss';

import {getTeams , addTeamServices , excuseYourself , addMember} from "../services/teams";
import { getUserID } from "../services/get-id";
import Users from '../models/Users'
let membersArray: Users[] = [];
import ITeam from '../models/Team' ;

function appendMembers(member: Users) {
  membersArray.push(member);
  const memberNode = document.createTextNode(`,${member}`);
  (document.querySelector(".member-list") as HTMLDivElement).append(memberNode);
}

class Teams {
  addTeamsList = document.querySelector(".members");
  allUsers: Users[] = [];

  showTeams = (teams: ITeam[]) => {
    let teamsList = document.querySelector(".card-collection");
    let cards = (teamsList as HTMLElement).innerHTML;

    let teamsListStr = "";
    let allUsersOptionsStr = "";
    this.allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });

    teams.forEach((team) => {
      let teamMembers = team.members.map( (member ) => {
        console.log(team);
        return (member as Users).email;
      });
      let teamID = team._id;
      teamsListStr += `
              <div class="card">
                  <div class="team-name">${team.name}</div>
                  <div class="team-short-name">@${team.shortName}</div>
                  <div>${team.description}</div>
                  <div> 
                    <button type="button" 
                             
                            class="excuse-yourself-btn"
                        >Excuse yourself
                    </button>
                  </div>
                  <div class ="member-list"><span style="font-weight:bold">Members:</span>${teamMembers}</div>
                  <div>
                    <span>
                      <label for="add-member"></label>
                      <select style="width:40%" id="add-member" class= "select-input"> <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
                    </span>
                    <button type="button" 
                            class="add-btn" 
                            
                        >add
                    </button>
                  </div>
                </div>
              </div>
              `;
    });

    (teamsList as HTMLDivElement).innerHTML = teamsListStr + cards;
    // excuse yourself event listener
    // const excuseYourselfBtn = document.querySelector("excuse-yourself-btn");
    // (excuseYourselfBtn as HTMLButtonElement).addEventListener("click", () => {
    //   excuseYourself(
    //     team._id,
    //     (excuseYourselfBtn as HTMLButtonElement).closest(
    //       ".card"
    //     ) as HTMLDivElement
    //   );
    // });

    const memberList = document.querySelector(".member-list");
    console.log(memberList);
    const selectInput = document.querySelector(".select-input");
    console.log(selectInput);

    const addMemberBtn = document.querySelector(".add-btn");
    console.log(addMemberBtn as HTMLElement);
    (addMemberBtn as HTMLElement).addEventListener("click", () => {
      console.log((selectInput as HTMLInputElement).value);
      const memberToBeAdded: Users | undefined = this.allUsers.find(() => {
        return (selectInput as HTMLInputElement).value;
      });

      if (memberToBeAdded) {
        appendMembers(memberToBeAdded);
      }
    });

    this.addNewTeam();
    const addTeamBtn = document.querySelector(".add-team");
    const addTeamForm = document.querySelector(".team-form");
    (addTeamBtn as HTMLButtonElement).addEventListener("click", function () {
      (addTeamForm as HTMLDivElement).classList.toggle("hide");
    });
  };
  showUsersDropdown = () => {
    let allUsersOptionsStr = "";
    let addTeamsListStr = "";
    this.allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });

    addTeamsListStr += `<div class="member-list"><span style="font-weight:bold">Members:</span></div>
        <div>
          <span>
            <label for="member"></label>
            <select style="width:40%" class= "select-input" id="member"> <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
          </span>
          <button type="button" 
                 
                  onclick="appendMembers(this.closest('div').querySelector('.select-input').value)">add
          </button>
        </div>
        `;

    (this.addTeamsList as HTMLDivElement).innerHTML = addTeamsListStr;

    return allUsersOptionsStr;
  };

  getAllUsers = () => {
    return getUserID()
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((users) => {
        this.allUsers = users;
      });
  };

   addNewTeam = () => {
     const addTeamForm = document.querySelector("#add-team");
     // var users; //;
     (addTeamForm as HTMLElement).addEventListener("submit", function (event) {
       event.preventDefault();

       let selectInput = document.getElementById("add-member");
       // console.log(selectInput.innerHTML);

       let team: ITeam = {
         name: (
           document.getElementById("team-name") as HTMLInputElement
         ).value.trim(),
         shortName: (
           document.getElementById("team-short-name") as HTMLInputElement
         ).value.trim(),
         description: (
           document.getElementById("team-description") as HTMLInputElement
         ).value.trim(),
        members: membersArray,
       };
       if (true) {
         addTeamServices(team).then(function (addedTeam) {
           console.log(addedTeam._id);

          let newTeamMembers = addedTeam.members.map(function (
            newMember: Users
          ) {
            return newMember.email;
           });

           // let newAllMembersOption = "";
           // allUsers.forEach(function (user) {
           //   newAllMembersOption += `<option value="${user.email}">${user.email}</option> `;
           // });

           let addedNewTeam = `
        
               <div class="team-name">${addedTeam.name}</div>
               <div class="team-short-name">@${addedTeam.shortName}</div>
               <div>${addedTeam.description}</div>
               <div> 
                 <button type="submit" 
                         onclick="excuseYourself('${
                           addedTeam._id
                         }',this.closest('.card'))" 
                         class="excuse-yourself-btn"
                     >Excuse yourself
                 </button>
               </div>
               <div class="aaron"><span style="font-weight:bold">Members:</span>${newTeamMembers}</div>
               <div>
                <span>
                   <label for="add-member"></label>
                   <select style="width:40%" id="add-member" class= "select-input">${
                     (selectInput as HTMLInputElement).innerHTML
                   }</select>
                </span>
                <button type="submit" 
                         class="add-member-btn" 
                       
                     >add
                 </button>
               </div>
             </div>
         
           `;

           const parentNode = document.querySelector(".card-collection");
           const childNode = document.createElement("div");
           childNode.innerHTML = addedNewTeam;
           (parentNode as HTMLDivElement).insertBefore(
             childNode,
             document.getElementById("add-team")
           );
           childNode.classList.add("card");
           (document.getElementById("add-team") as HTMLDivElement).classList.add(
             "hide"
           );
         });
       }
     });
   };

  load = () => {
    let user = document.getElementById("user");
    (user as HTMLElement).textContent = ` ${localStorage.getItem("email")}`;
    let allUsersOptionsStr = "";
    this.getAllUsers()
      .then(() => {
        this.showUsersDropdown();
      })
      .then(() => {
        getTeams()
          .then((response) => {
            this.showTeams(response);
          })
          .catch((error) => {
            alert(error.response);
          });
      });

    this.allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });
    this.addNewTeam();
    initNav();
  };
}

export {Teams} ;
console.log(membersArray);

function initNav() {
  throw new Error("Function not implemented.");
}
