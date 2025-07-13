import React from "react";
import AppRoutes from "./routes/AppRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
