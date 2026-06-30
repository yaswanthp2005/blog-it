import axios from "axios";

const fetch = params => axios.get("/posts", { params });

const show = slug => axios.get(`/posts/${slug}`);

const generatePdf = slug => axios.post(`/posts/${slug}/report`, {});

const download = slug =>
  axios.get(`/posts/${slug}/report/download`, { responseType: "blob" });

const bulkUpdate = ({ slugs, status }) =>
  axios.patch("/bulk_update", {
    bulk_update: { slugs, status },
  });

const bulkDestroy = ({ slugs }) =>
  axios.delete("/bulk_update", {
    data: { bulk_update: { slugs } },
  });

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
  bulkDestroy,
  bulkUpdate,
  create,
  destroy,
  download,
  fetch,
  generatePdf,
  show,
  update,
  vote,
};

export default postsApi;
