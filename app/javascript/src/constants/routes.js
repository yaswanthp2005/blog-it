const BASE_URL = "/";

const routes = {
  root: BASE_URL,
  login: `${BASE_URL}login`,
  posts: {
    index: `${BASE_URL}posts`,
    create: `${BASE_URL}posts/create`,
    show: `${BASE_URL}posts/:slug/show`,
  },
  signup: `${BASE_URL}signup`,
};

export { BASE_URL };
export default routes;
