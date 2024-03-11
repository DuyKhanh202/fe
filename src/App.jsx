import Login from "./modules/Auth/pages/Login";
import Signup from "./modules/Auth/pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/Home";
import MainLayout from "./layout/MainLayout";
import Pitch from "./modules/Pitch";
import Detail from "./modules/Detail";
import Profile from "./modules/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pitch" element={<Pitch />} />
          <Route path="pitch/:type" element={<Pitch />} />
          <Route path="detail/:idD" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* TRANG ĐĂNG KÝ */}
        <Route path="/sign-up" element={<Signup />} />
        {/* TRANG ĐĂNG NHẬP */}
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
