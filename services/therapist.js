import axios, { simpleErrorHandling } from "@/config/network";

const add = async (data) => {
  try {
    await axios.post("/users", data);
  } catch (err) {
    simpleErrorHandling(err, "Adding Therapist Failed");
  }
};
const remove = async (id) => {
  try {
    await axios.delete("/users/" + id);
  } catch (err) {
    simpleErrorHandling(err, "Adding Therapist Failed");
  }
};
const edit = async (id, data) => {
  try {
    await axios.put("/users/" + id, data);
  } catch (err) {
    simpleErrorHandling(err, "Editing Failed");
  }
};
const fetchById = async (id) => {
  try {
    const { data } = await axios.get("/users/" + id);
    return data;
  } catch (err) {
    simpleErrorHandling(err, "Failed to Load Therapist Data");
  }
};
const fetchAll = async () => {
  try {
    const { data } = await axios.get("/users");
    return data;
  } catch (err) {
    simpleErrorHandling(err, "Loading Therapists Failed");
  }
};

export const TherapistServices = {
  add,
  edit,
  remove,
  fetchAll,
  fetchById,
};
