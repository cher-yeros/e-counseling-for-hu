import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Auth from "./Auth";
import AddCounselor from "./components/Admin/AddCounselor";
import Case from "./components/Admin/Case";
import Counselors from "./components/Admin/Counselors";
import Layout from "./components/Admin/Layout";
import Posts from "./components/Admin/Posts";
//import Chat from "./components/Counselors/Chat";
import Chat from "./components/Student/Chat";

import Messages from "./components/Counselors/Messages";
import Post from "./components/Counselors/Post";
import Profile from "./components/Counselors/Profile";
import HomePage from "./components/Student/HomePage";
import Login from "./components/Student/Login";
import RegisterPage from "./components/Student/RegisterPage";
import SelectType from "./components/Student/SelectType";
import StudentHome from "./components/Student/Student";
import Appointments from "./components/Counselors/Appointments";
import ChooseCounselor from "./components/Student/ChooseCounselor";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Auth only={["admin"]} />}>
          <Route path="/admin" element={<Layout />} />
          <Route path="/posts" element={<Posts />} />{" "}
          <Route path="/counselors" element={<Counselors />} />{" "}
          <Route path="/case" element={<Case />} />{" "}
          <Route path="/counselors/add-counselor" element={<AddCounselor />} />
        </Route>

        <Route path="/counselor" element={<Profile />} />

        <Route element={<Auth only={["counselor"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-post" element={<Post />} />
          <Route path="/post" element={<Post />} />
          <Route path="/appointments" element={<Appointments />} />
        </Route>

        <Route element={<Auth only={["student"]} />}>
          <Route path="/student" element={<StudentHome />} />
          <Route path="/selecttype" element={<SelectType />} />
          <Route path="/choose-counselor" element={<ChooseCounselor />} />
          <Route path="/chat" element={<Chat />} />
        </Route>

        <Route element={<Auth only={["student", "counselor"]} />}>
          <Route path="/message" element={<Messages />} />
        </Route>

        <Route
          path="*"
          element={<h1 style={{ textAlign: "center" }}>Page not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
