import Sidebar from "./Sidebar";
import ChatBox from "../Chat1/Chat";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { userRequest } from "../../requestmethods";
import { updateStudentCounselor } from "../../redux/userRedux";
import { Link } from "react-router-dom";
function Chat() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyCounselor();
    //if (currentUser?.Counselor) {
    //  alert("Please select Counselor First!");
    //  navigate("/selecttype");
    //}
    userRequest
      .get("/student/my-counselor/" + currentUser.id)
      .then(({ data }) => {
        if (!data.success) {
          //alert("Please select a Counselor First!");
          //navigate("/selecttype");
        } else {
          dispatch(updateStudentCounselor(data.counselor));
        }
      });
  }, []);

  function getMyCounselor() {}

  return (
    <>
      <Sidebar />
      <main
        style={{ overflow: "hidden" }}
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
      >
        {currentUser.Counselor?.id ? (
          <ChatBox />
        ) : (
          <h1> Please Select Counselor First </h1>
        )}
      </main>
    </>
  );
}

export default Chat;
