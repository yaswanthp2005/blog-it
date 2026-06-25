import axios from "axios";

const fetch = () => axios.get("/categories.json");

const create = payload =>
  axios.post("/categories.json", {
    category: payload,
  });

const categoriesApi = {
  fetch,
  create,
};

export default categoriesApi;
