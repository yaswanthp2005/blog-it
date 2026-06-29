import axios from "axios";

const fetch = params => axios.get("/posts", { params });

const show = slug => axios.get(`/posts/${slug}`);

const create = ({ categoryIds, status, ...payload }) =>
  axios.post("/posts", {
    post: {
      ...payload,
      category_ids: categoryIds,
      status,
    },
  });

const update = ({ slug, categoryIds, status, quiet = false, ...payload }) => {
  const path = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.put(path, {
    post: {
      ...payload,
      category_ids: categoryIds,
      status,
    },
  });
};

const destroy = ({ slug, quiet = false }) => {
  const path = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.delete(path);
};

const vote = ({ slug, voteType }) =>
  axios.post(`/posts/${slug}/vote`, { vote: { vote_type: voteType } });

const postsApi = {
  create,
  destroy,
  fetch,
  show,
  update,
  vote,
};

export default postsApi;
