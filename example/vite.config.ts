import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import PrefetchPlugin from "vite-plugin-prefetch-api";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    PrefetchPlugin({
      // minify: false,
      // api: "fetch",
      api: "xhr",
      list: [
        {
          url: "/api/task",
          method: "post",
          adapter: function (data) {
            return {
              body: { username: data.cookie.username },
            };
          },
        },
        {
          url: "/api/msg",
          method: "get",
          adapter: function (data) {
            return {
              query: { uid: data.cookie.uid },
            };
          },
          trigger: function (data) {
            return data.hash === "inbox";
          },
        },
      ],
    }),
  ],
});
