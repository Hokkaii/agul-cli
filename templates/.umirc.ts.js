module.exports = `
  import { defineConfig } from "umi";
  import CompressionPlugin from "compression-webpack-plugin";
  import TerserPlugin from "terser-webpack-plugin";

  export default defineConfig({
    routes: [
      { path: "/demo", component: "@/pages/demo" },
    ],
    npmClient: "npm",
    <%-data%>
  });
` 