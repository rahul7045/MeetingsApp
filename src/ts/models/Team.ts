import Users from "./Users";

// interface ITeams {
//   _id?: string;
//   name: string;
//   shortName: String;
//   description: String;
//   members: string[] | Users[];
// }

// export default ITeams;



//import IUsers from "./users";

interface ITeams {
  _id?: string;
  name: string;
  shortName: string;
  description: string;
  members: Users[];
}

export default ITeams;