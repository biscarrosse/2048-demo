import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Game from "./components/Game/Game";
import Layout from "./components/Layout/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout>
      <Game />
    </Layout>
  </React.StrictMode>
);
