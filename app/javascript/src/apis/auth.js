import axios from "axios";

const login = payload =>
  axios.post("/session.json", {
    login: payload,
  });

const logout = () => axios.delete("/session.json?quiet");

const signup = payload =>
  axios.post("/users.json", {
    user: payload,
  });

const authApi = { login, logout, signup };

export default authApi;
