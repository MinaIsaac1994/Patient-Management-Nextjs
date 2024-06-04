import axios, { simpleErrorHandling } from "@/config/network";

const add = async (data) => {
  try {
    await axios.post("/patients", data);
    return true;
  } catch (err) {
    simpleErrorHandling(err, "Adding Patient Failed");
  }
};
const remove = async (id) => {
  try {
    await axios.delete("/patients/" + id);
  } catch (err) {
    simpleErrorHandling(err, "Deleting Patient Failed");
  }
};
const edit = async (id, data) => {
  try {
    await axios.put("/patients/" + id, data);
    return true;
  } catch (err) {
    simpleErrorHandling(err, "Editing Failed");
  }
};
const fetchById = async (id) => {
  try {
    const { data } = await axios.get("/patients/" + id);
    return data;
  } catch (err) {
    simpleErrorHandling(err, "Failed to Load Patient Data");
  }
};
const fetchAll = async () => {
  try {
    const { data } = await axios.get("/patients");
    return data;
  } catch (err) {
    simpleErrorHandling(err, "Loading Therapists Failed");
  }
};

export const PatientServices = {
  add,
  edit,
  remove,
  fetchAll,
  fetchById,
};
