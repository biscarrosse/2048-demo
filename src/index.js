import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Game from "./components/Game";
import Layout from "./Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Layout>
      <Game />
    </Layout>
  </React.StrictMode>
);
