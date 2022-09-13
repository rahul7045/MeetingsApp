import { getTeams, addTeamServices } from "../services/teams";
import { getUserID } from "../services/get-id";
let membersArray = [];
function appendMembers(member) {
    membersArray.push(member);
    const memberNode = document.createTextNode(`,${member}`);
    document.querySelector(".member-list").append(memberNode);
}
class Teams {
    constructor() {
        this.addTeamsList = document.querySelector(".members");
        this.allUsers = [];
        this.showTeams = (teams) => {
            let teamsList = document.querySelector(".card-collection");
            let cards = teamsList.innerHTML;
            let teamsListStr = "";
            let allUsersOptionsStr = "";
            this.allUsers.forEach(function (user) {
                allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
            });
            teams.forEach((team) => {
                let teamMembers = team.members.map((member) => {
                    console.log(team);
                    return member.email;
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
            teamsList.innerHTML = teamsListStr + cards;
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
            console.log(addMemberBtn);
            addMemberBtn.addEventListener("click", () => {
                console.log(selectInput.value);
                const memberToBeAdded = this.allUsers.find(() => {
                    return selectInput.value;
                });
                if (memberToBeAdded) {
                    appendMembers(memberToBeAdded);
                }
            });
            this.addNewTeam();
            const addTeamBtn = document.querySelector(".add-team");
            const addTeamForm = document.querySelector(".team-form");
            addTeamBtn.addEventListener("click", function () {
                addTeamForm.classList.toggle("hide");
            });
        };
        this.showUsersDropdown = () => {
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
            this.addTeamsList.innerHTML = addTeamsListStr;
            return allUsersOptionsStr;
        };
        this.getAllUsers = () => {
            return getUserID()
                .then((response) => {
                console.log(response);
                return response;
            })
                .then((users) => {
                this.allUsers = users;
            });
        };
        this.addNewTeam = () => {
            const addTeamForm = document.querySelector("#add-team");
            // var users; //;
            addTeamForm.addEventListener("submit", function (event) {
                event.preventDefault();
                let selectInput = document.getElementById("add-member");
                // console.log(selectInput.innerHTML);
                let team = {
                    name: document.getElementById("team-name").value.trim(),
                    shortName: document.getElementById("team-short-name").value.trim(),
                    description: document.getElementById("team-description").value.trim(),
                    members: membersArray,
                };
                if (true) {
                    addTeamServices(team).then(function (addedTeam) {
                        console.log(addedTeam._id);
                        let newTeamMembers = addedTeam.members.map(function (newMember) {
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
                         onclick="excuseYourself('${addedTeam._id}',this.closest('.card'))" 
                         class="excuse-yourself-btn"
                     >Excuse yourself
                 </button>
               </div>
               <div class="aaron"><span style="font-weight:bold">Members:</span>${newTeamMembers}</div>
               <div>
                <span>
                   <label for="add-member"></label>
                   <select style="width:40%" id="add-member" class= "select-input">${selectInput.innerHTML}</select>
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
                        parentNode.insertBefore(childNode, document.getElementById("add-team"));
                        childNode.classList.add("card");
                        document.getElementById("add-team").classList.add("hide");
                    });
                }
            });
        };
        this.load = () => {
            let user = document.getElementById("user");
            user.textContent = ` ${localStorage.getItem("email")}`;
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
}
export { Teams };
console.log(membersArray);
function initNav() {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=show-teams.js.map