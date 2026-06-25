const BASE_URL = "/";

const routes = {
  root: BASE_URL,
  login: `${BASE_URL}login`,
  posts: {
    index: `${BASE_URL}posts`,
    create: `${BASE_URL}posts/create`,
    edit: `${BASE_URL}posts/:slug/edit`,
    mine: `${BASE_URL}posts/mine`,
    show: `${BASE_URL}posts/:slug/show`,
  },
  signup: `${BASE_URL}signup`,
};

export { BASE_URL };
export default routes;
