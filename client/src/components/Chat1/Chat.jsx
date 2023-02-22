import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
//import api from "../../../utils/api_call";
import { useNavigate } from "react-router";
import { userRequest as api } from "../../requestmethods";
import "./chat1.css";
import { LeftMessage, RightMessage } from "./Messege";
let socket;

function Chat1(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [Counselor, setCounselor] = useState({});
  const [OnlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    getCounselors();
  }, []);

  const navigate = useNavigate();
  function getCounselors() {
    if (!currentUser.Counselor) {
      alert("Please select a Counselor");
      navigate("/selecttype");
    }
  }

  let messagesEnd = useRef(null);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  //const { user } = props;

  const user = {};

  useEffect(() => {
    loadChats();
  }, [chats]);

  useEffect(() => {
    //scrollToBottom();
  }, [chats]);

  useEffect(() => {
    socket = io("http://localhost:8000");
    socketOperation();
  }, [currentUser.Counselor]);

  function socketOperation() {
    const myInfo = {
      id: currentUser?.id,
      username: currentUser.studentId,
    };
    socket.emit("openChat", myInfo);

    socket.on("userAdded", (users) => {
      setOnlineUsers(users);
    });

    socket.on("disconnect", () => {
      socket.emit("user_disconnected", myInfo.id);
    });

    socket.on("messageSent", ({ msg }) => {});
  }

  function loadChats() {
    scrollToBottom();
    api
      .post("/chat/get-chats", {
        sId: currentUser.id,
        cId: currentUser.Counselor.id,
      })
      .then(({ data }) => {
        data.success && setChats(data.chats);
      });
  }

  function sendMessage(ev) {
    const newChat = {
      Text: text,
      sender: "s",
      receiver: "c",
      username: currentUser.Counselor.email,
      HUStudentId: currentUser.id,
      CounselorId: currentUser.Counselor.id,
    };

    socket.emit("sendMessage", newChat);

    api.post("/chat/send", newChat).then(({ data }) => {
      //loadChats();
    });

    setChats((oldArray) => [...oldArray, newChat]);

    setText("");
  }
  function EnterPressed(ev) {
    if (ev.key == "Enter") {
      sendMessage();
      setText("");
    }
  }

  function scrollToBottom() {
    const chatBox = document.querySelector(".chat-panel");
    chatBox.scrollTop = chatBox.scrollHeight;
    //setTimeout(() => {
    //	chatBox.scrollTop = chatBox.scrollHeight;
    //}, 1);
    //messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  function parsedTime(time) {
    let parsed = moment(time).format("LT");
    return parsed;
  }
  function sendAppointmentRequest() {
    const newChat = {
      Text: `Appointment Request from  from ${currentUser.fullname}`,
      sender: "s",
      receiver: "appointment",
      username: currentUser.Counselor.email,
      HUStudentId: currentUser.id,
      CounselorId: currentUser.Counselor.id,
    };

    socket.emit("sendMessage", newChat);

    api.post("/chat/send", newChat).then(({ data }) => {
      //loadChats();
    });

    setChats((oldArray) => [...oldArray, newChat]);
  }

  function checkOnline() {
    const found = OnlineUsers.find(
      (user) => user.username === currentUser.Counselor.email
    );

    if (found?.socketId) return true;
    else return false;
  }
  return (
    <div className="row">
      <div className="col-lg-6">
        <div
          className="mt-3 card"
          style={{ background: "white", padding: "0" }}
        >
          <div className="row no-gutters" style={{ margin: 0 }}>
            <div className="settings-tray">
              <div className="friend-drawer no-gutters friend-drawer--grey">
                <div style={{ position: "relative" }}>
                  <img
                    className="profile-image"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rwiSuPjI_7JJhXWqBXv6rnxiDcOEeAsBdaiAwVYn&s"
                    alt=""
                  />
                  {/* #4caf50 */}
                  <span
                    style={{
                      backgroundColor: "#7e7e7e",
                      bottom: "1.5rem",
                      left: "2.8rem !important",
                    }}
                    class="position-absolute start-100 translate-middle p-2  border border-light rounded-circle"
                  >
                    <span class="visually-hidden">New alerts</span>
                  </span>
                </div>

                <div className="text">
                  <h6>{currentUser.Counselor?.fullName}</h6>
                  <p className="text-muted">
                    {checkOnline() ? "Online" : "Offline"} <br />
                    {currentUser.Counselor?.category} issue Counselor
                  </p>
                </div>
                <span className="settings-tray--right">
                  <button
                    onClick={sendAppointmentRequest}
                    className="btn btn-success btn-sm"
                  >
                    Appointement
                  </button>
                </span>
              </div>
            </div>
            <div className="chat-panel">
              {chats.map((chat, i) => (
                <div key={i}>
                  {chat.sender == "s" && chat.HUStudentId == currentUser.id ? (
                    <RightMessage
                      key={chat.receiver_id}
                      text={chat.Text}
                      name={
                        chat.sender == "s"
                          ? currentUser.fullname
                          : currentUser.Counselor.fullName
                      }
                      time={parsedTime(chat.createdAt)}
                    />
                  ) : (
                    <LeftMessage
                      key={chat.sender_id}
                      text={chat.Text}
                      name={
                        chat.sender == "s"
                          ? currentUser.fullname
                          : currentUser.Counselor.fullName
                      }
                      time={parsedTime(chat.createdAt)}
                    />
                  )}
                </div>
              ))}
              <div
                ref={(el) => {
                  messagesEnd = el;
                }}
              ></div>
            </div>
            <div className="row" style={{ margin: "0", padding: "0" }}>
              <div className="col-12" style={{ padding: "0" }}>
                <div className="chat-box-tray">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Send message..."
                      aria-describedby="button-addon2"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyPress={EnterPressed}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      onClick={sendMessage}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat1;
