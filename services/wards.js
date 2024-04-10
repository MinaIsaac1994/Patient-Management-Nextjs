import axios, { simpleErrorHandling } from "@/config/network";
import { wardModel } from "@/datamapper/wardModel";

const add = async (data) => {
  try {
    await axios.post("/wards", data);
  } catch (err) {
    simpleErrorHandling(err, "Adding Ward Failed");
  }
};
const fetchAll = async () => {
  try {
    const { data } = await axios.get("/wards");
    return data;
  } catch (err) {
    simpleErrorHandling(err, "Loading Wards Failed");
  }
};

export const WardsServices = {
  add,
  fetchAll,
};
