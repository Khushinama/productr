import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import React from "react";

const App = () => {
  return (
    <>
      <Toaster position="bottom-center"
       toastOptions={{
          duration: 3000,
        }} />
      <AppRoutes />
    </>
  );
};

export default App;
