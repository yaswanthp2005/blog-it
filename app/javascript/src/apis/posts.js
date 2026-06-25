import axios from "axios";

const fetch = params => axios.get("/posts", { params });

const show = slug => axios.get(`/posts/${slug}`);

const create = ({ categoryIds, ...payload }) =>
  axios.post("/posts", {
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
