import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv"; // Import dotenv

export default defineConfig({
  plugins: [
    vue(),
    {
      name: "dotenv",
      config() {
        return {
          // Load environment variables from .env file
          ...dotenv.config().parsed,
        };
      },
    },
  ],
});
