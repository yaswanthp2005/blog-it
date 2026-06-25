import axios from "axios";

const fetch = params => axios.get("/posts.json", { params });

const show = slug => axios.get(`/posts/${slug}.json`);

const create = ({ categoryIds, ...payload }) =>
  axios.post("/posts.json", {
    post: {
      ...payload,
      category_ids: categoryIds,
    },
  });

const postsApi = {
  fetch,
  show,
  create,
};

export default postsApi;
