import server from "./axios.config";
const APIs = {};
APIs.getHome = async () => {
  const res = await server.get("/getUsers");
  return res?.data;
};
APIs.addNewUser = async (data) => {
  const res = await server.post("/addAddress", data);
  return res?.data;
};
APIs.getAddress = async (userId) => {
  const res = await server.get(`/getAddress?userId=${userId}`);
  return res?.data;
};
APIs.updateAddress = async (type, ids, isValid) => {
  const dataForUpadet = { type, ids, isValid };
  const res = await server.put(`/updateAddress`, dataForUpadet);
  return res?.data;
};
export default APIs;
