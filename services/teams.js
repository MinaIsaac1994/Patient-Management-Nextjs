import axios, { simpleErrorHandling } from "@/config/network";
import { TeamModel } from "@/datamapper/teamModel";

const add = async (data) => {
  try {
    const payload = TeamModel.addTeam(data);
    await axios.post("/teams", payload);
  } catch (err) {
    simpleErrorHandling(err, "Adding Team Failed");
  }
};
const fetchAll = async () => {
  try {
    const { data } = await axios.get("/teams");
    return data;
  } catch (err) {
    simpleErrorHandling(err, "Loading Teams Failed");
  }
};
const fetchById = async (id) => {
  try {
    const { data } = await axios.get("/teams/" + id);
    return data;
  } catch (err) {
    simpleErrorHandling(err, "Loading Team Deatils Failed");
  }
};

export const TeamServices = {
  add,
  fetchAll,
  fetchById,
};
