import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "./components/CreateUsers";
import UpdateUser from "./components/Update";
// import Users from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
// import { Dialog } from "@mui/material";
// import Dialog from "./components/dialog/DialogDelete";
// import useDialog from "./hooks/useDialog";
import Index from "./pages/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            {" "}
          </Route>
          <Route path="/sign-up" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
