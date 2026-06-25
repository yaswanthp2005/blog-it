import axios from "axios";

const fetch = params => axios.get("/posts.json", { params });

const show = slug => axios.get(`/posts/${slug}.json`);

const create = ({ categoryIds, status, ...payload }) =>
  axios.post("/posts.json", {
    post: {
      ...payload,
      category_ids: categoryIds,
      status,
    },
  });

const update = ({ slug, categoryIds, status, quiet = false, ...payload }) => {
  const path = quiet ? `/posts/${slug}.json?quiet` : `/posts/${slug}.json`;

  return axios.put(path, {
    post: {
      ...payload,
      category_ids: categoryIds,
      status,
    },
  });
};

const destroy = ({ slug, quiet = false }) => {
  const path = quiet ? `/posts/${slug}.json?quiet` : `/posts/${slug}.json`;

  return axios.delete(path);
};

const postsApi = {
  create,
  destroy,
  fetch,
  show,
  update,
};

export default postsApi;
