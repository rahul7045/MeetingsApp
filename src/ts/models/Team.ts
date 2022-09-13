import Users from "./Users";

interface ITeams {
  _id?: string;
  name: string;
  shortName: String;
  description: String;
  members: string[] | Users[];
}

export default ITeams;