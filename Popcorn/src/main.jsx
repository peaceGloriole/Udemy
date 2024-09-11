import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Star from "./Star.jsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <Star maxRating={5} />
    <Star
      maxRating={5}
      size={24}
      color="red"
      message={[`Bad`, `Okay`, `Good`, `Great`, `Awesome`]}
    />
  </React.StrictMode>
);
