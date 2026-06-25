const BASE_URL = "/";

const routes = {
  root: BASE_URL,
  posts: {
    index: `${BASE_URL}posts`,
    create: `${BASE_URL}posts/create`,
    show: `${BASE_URL}posts/:slug/show`,
  },
};

export { BASE_URL };
export default routes;
