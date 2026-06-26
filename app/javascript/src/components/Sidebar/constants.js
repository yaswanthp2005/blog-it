import routes from "constants/routes";

import { Book, Edit, File } from "neetoicons";

const isBlogPostsActive = pathname =>
  pathname === routes.posts.index || pathname.includes("/show");

const isNewBlogPostActive = pathname =>
  pathname === routes.posts.create || pathname.includes("/edit");

const isMyBlogPostsActive = pathname => pathname === routes.posts.mine;

const NAV_ITEMS = [
  {
    labelKey: "sidebar.blogPosts",
    path: routes.posts.index,
    icon: Book,
    isActive: isBlogPostsActive,
  },
  {
    labelKey: "sidebar.newBlogPost",
    path: routes.posts.create,
    icon: Edit,
    isActive: isNewBlogPostActive,
  },
];

const MY_BLOG_POSTS_ITEM = {
  labelKey: "sidebar.myBlogPosts",
  path: routes.posts.mine,
  icon: File,
  isActive: isMyBlogPostsActive,
};

export { MY_BLOG_POSTS_ITEM, NAV_ITEMS };
