import '../../scss/pages/teams.scss';
import {getTeams , addTeamServices , excuseYourself , addMember} from "../services/teams";
import { getUserID } from "../services/get-id";
import Users from '../models/Users'
let membersArray: Users[] = [];
import ITeams from '../models/Team' ;
import init from './nav-menu';

function appendMembers(member: Users) {
  membersArray.push(member);
  const memberNode = document.createTextNode(`,${member}`);
  (document.querySelector(".member-list") as HTMLDivElement).append(memberNode);
}

class Teams {
  addTeamsList = document.querySelector(".members");
  allUsers: Users[] = [];

  showTeams = (teams: ITeams[]) => {
    const teamsList = document.querySelector(".card-collection");
    const cards = (teamsList as HTMLElement).innerHTML;

    let teamsListStr = "";
    let allUsersOptionsStr = "";
    this.allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });

    teams.forEach((team: ITeams, idx) => {
      const teamMembers = team.members.map(function (member) {
        console.log(team);
        return member.email;
      });
      const teamID = team._id;
      teamsListStr += `
              <div class="card">
                  <div class="team-name">${team.name}</div>
                  <div class="team-short-name">@${team.shortName}</div>
                  <div>${team.description}</div>
                  <div> 
                    <button type="button" 
                             id="${idx}"
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

    teams.forEach(function (team, idx) {
      const excuseYourselfBtn =
        document.querySelectorAll(`.excuse-yourself-btn`);
      (excuseYourselfBtn[idx] as HTMLButtonElement).addEventListener(
        "click",
        () => {
          let teamid :string=team._id!; 
          excuseYourself(teamid).then(function () {
            (
              (excuseYourselfBtn[idx] as HTMLButtonElement).closest(
                ".card"
              ) as HTMLDivElement
            ).remove();
          });
        }
      );

      const addMemberBtn = document.querySelectorAll(".add-btn");
      const selectInput = document.querySelectorAll(".select-input");
      const memberList = (
        (selectInput[idx] as HTMLInputElement).closest("div") as HTMLDivElement
      ).previousElementSibling;
      let userID: string;
      (selectInput[idx] as HTMLInputElement).addEventListener(
        "input",
        function () {
          userID = (selectInput[idx] as HTMLInputElement).value;
        }
      );

      (addMemberBtn[idx] as HTMLButtonElement).addEventListener("click", () => {
        addMember(team._id, userID).then(function () {
          const memberNode = document.createTextNode(`,${userID}`);
          (memberList as HTMLElement).appendChild(memberNode);
        });
      });
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
    (addTeamForm as HTMLElement).addEventListener("submit", (event) => {
      event.preventDefault();

      const selectInput = document.getElementById("add-member");
      // console.log(selectInput.innerHTML);

      const team: ITeams = {
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

      let allUsersOptionsStr = "";
      this.allUsers.forEach(function (user) {
        allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
      });
      function isvalid() {
        return true;
      }
      if (isvalid()) {
        addTeamServices(team).then(function (addedTeam) {
          console.log(addedTeam._id);

          const newTeamMembers = addedTeam.members.map(function (
            newMember: Users
          ) {
            return newMember.email;
          });

          // let newAllMembersOption = "";
          // allUsers.forEach(function (user) {
          //   newAllMembersOption += `<option value="${user.email}">${user.email}</option> `;
          // });

          const addedNewTeam = `
        <div id="new-team-card">
              <div class="team-name">${addedTeam.name}</div>
              <div class="team-short-name">@${addedTeam.shortName}</div>
              <div>${addedTeam.description}</div>
              <div> 
                <button type="button"  
                        class="excuse-yourself-btn-new"
                    >Excuse yourself
                </button>
              </div>
              <div class="aaron"><span style="font-weight:bold">Members:</span>${newTeamMembers}</div>
              <div>
                <span>
                  <label for="add-member"></label>
                  <select style="width:40%" id="add-member" class= "select-input-new">${allUsersOptionsStr}</select>
                </span>
                <button type="button" 
                        class="add-member-btn-new" 
                       
                    >add
                </button>
              </div>
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
          const excuseYourselfBtn = document.querySelector(
            ".excuse-yourself-btn-new"
          );
          const newTeam = document.getElementById("new-team-card");
          (excuseYourselfBtn as HTMLButtonElement).addEventListener(
            "click",
            () => {
              console.log(addedTeam._id);
              excuseYourself(addedTeam._id).then(function () {
                // (
                //   (excuseYourselfBtn as HTMLButtonElement).closest(
                //     ".new-team-card"
                //   ) as HTMLDivElement
                // ).remove();
                console.log(
                  (excuseYourselfBtn as HTMLButtonElement).closest(
                    ".card"
                  ) as HTMLDivElement
                );
                (newTeam as HTMLDivElement).remove();
                (
                  (excuseYourselfBtn as HTMLButtonElement).closest(
                    ".card"
                  ) as HTMLDivElement
                ).remove();
              });
            }
          );

          const addMemberBtn = document.querySelector(".add-btn-new");
          const selectInput = document.querySelector(".select-input-new");
          const memberList = (
            (selectInput as HTMLInputElement).closest("div") as HTMLDivElement
          ).previousElementSibling;
          let userID: string;
          (selectInput as HTMLInputElement).addEventListener(
            "input",
            function () {
              userID = (selectInput as HTMLInputElement).value;
            }
          );

          (addMemberBtn as HTMLButtonElement).addEventListener("click", () => {
            addMember(addedTeam._id, userID).then(function () {
              const memberNode = document.createTextNode(`,${userID}`);
              (memberList as HTMLElement).appendChild(memberNode);
            });
          });
        });
      }
    });
  };

  load = () => {
    init();
    const user = document.getElementById("user");
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
  };
}

export {Teams};
console.log(membersArray);