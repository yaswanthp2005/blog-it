import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  images: path.resolve(process.cwd(), "app/assets/images"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
  stream: require.resolve("stream-browserify"),
  apis: absolutePath("src/apis"),
  common: absolutePath("src/common"),
  components: absolutePath("src/components"),
  constants: absolutePath("src/constants"),
  hooks: absolutePath("src/hooks"),
  stores: absolutePath("src/stores"),
  routes: absolutePath("src/routes.js"),
  assets: absolutePath("../assets"),
  utils: absolutePath("src/utils"),
  neetoui: path.resolve(process.cwd(), "node_modules/@bigbinary/neetoui/dist"),
  neetoicons: path.resolve(
    process.cwd(),
    "node_modules/@bigbinary/neeto-icons/dist/icons/index.js"
  ),
  neetocist: path.resolve(process.cwd(), "node_modules/@bigbinary/neeto-cist"),
};

export { alias };
