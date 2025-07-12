import React from "react";
import AppRoutes from "./routes/AppRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="relative min-h-screen bg-zinc-300 overflow-y-auto">
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
