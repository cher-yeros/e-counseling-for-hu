import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./chat1.css";
import { LeftMessage, RightMessage } from "./Messege";
import { userRequest as api } from "../../requestmethods";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
let socket;

function Chat1({ Student }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [ShowForm, setShowForm] = useState(false);
  const [OnlineUsers, setOnlineUsers] = useState([]);

  const navigate = useNavigate();

  let messagesEnd = useRef(null);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadChats();
  }, [chats]);

  useEffect(() => {
    socket = io("http://localhost:8000");
    socketOperation();
  }, []);

  function socketOperation() {
    const myInfo = {
      id: currentUser?.id,
      username: currentUser.email,
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
    api
      .post("/chat/get-chats", {
        sId: Student.id,
        cId: currentUser.id,
      })
      .then(({ data }) => {
        data.success && setChats(data.chats);
        scrollToBottom();
      });
  }

  function sendMessage(ev) {
    const newChat = {
      Text: text,
      sender: "c",
      receiver: "s",
      username: Student.studentId,
      HUStudentId: Student.id,
      CounselorId: currentUser.id,
    };

    socket.emit("sendMessage", newChat);

    api.post("/chat/send", newChat).then(({ data }) => {});

    setText("");
  }

  function notifyAppointement(App) {
    console.log(App);

    const d = new Date(App.date).toDateString();

    const txt = `Your appointment with your counselor is set on date ${d} at ${App.time}`;
    const newChat = {
      Text: txt,
      sender: "c",
      receiver: "s",
      username: Student.studentId,
      HUStudentId: Student.id,
      CounselorId: currentUser.id,
    };

    socket.emit("sendMessage", newChat);

    api.post("/chat/send", newChat).then(({ data }) => {});
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

  function checkOnline() {
    const found = OnlineUsers.find(
      (user) => user.username === Student.studentId
    );

    if (found?.socketId) return true;
    else return false;
  }
  return (
    <>
      <div className="mt-3 card" style={{ background: "white", padding: "0" }}>
        <div className="row no-gutters" style={{ margin: 0 }}>
          <div className="settings-tray">
            <div className="friend-drawer no-gutters friend-drawer--grey">
              <img
                className="profile-image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rwiSuPjI_7JJhXWqBXv6rnxiDcOEeAsBdaiAwVYn&s"
                alt=""
              />
              <div className="text">
                <h6>{Student.fullname}</h6>
                <p className="text-muted">
                  {checkOnline() ? "Online" : "Offline"} <br />
                  Student
                </p>
              </div>
              <span className="settings-tray--right"></span>
            </div>
          </div>
          <div className="chat-panel">
            {chats.map((chat) => (
              <div key={chat.id}>
                {chat.sender == "c" && chat.CounselorId == currentUser.id ? (
                  <RightMessage
                    key={chat.receiver_id}
                    text={chat.Text}
                    name={
                      chat.sender == "s"
                        ? Student.fullname
                        : currentUser.fullName
                    }
                    time={parsedTime(chat.createdAt)}
                  />
                ) : (
                  <LeftMessage
                    key={chat.sender_id}
                    text={
                      chat.receiver == "appointment" ? (
                        <>
                          {chat.Text}
                          <button
                            onClick={() => setShowForm(true)}
                            className="mr-2 btn btn-success btn-sm"
                          >
                            Schedule
                          </button>
                        </>
                      ) : (
                        `${chat.Text}`
                      )
                    }
                    name={
                      chat.sender == "s"
                        ? Student.fullname
                        : currentUser.fullName
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
      <SetAppointment
        Student={Student}
        show={ShowForm}
        onHide={() => setShowForm(false)}
        onNotifyAppointmnet={notifyAppointement}
      />
    </>
  );
}

export default Chat1;

function SetAppointment(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [Appointment, setAppointment] = useState({
    date: "",
    day: "",
    time: "",
    CounselorId: currentUser?.id,
    HUStudentId: props.Student.id,
  });

  const handleInputs = (e) => {
    e.preventDefault();
    setAppointment((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(Appointment);
    api.post("/student/setAppointment", Appointment).then(({ data }) => {
      data.success
        ? alert("Appointment successfully set")
        : alert("Server Error");
      props.onHide();
      props.onNotifyAppointmnet(Appointment);
    });
  };

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="add-product-modal"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="card border-0">
          <div
            style={{ background: "#2483c7 !important" }}
            className="card-header bg-secondary text-center p-4"
          >
            <h3 className="text-white m-0">Set Appointment</h3>

            <button
              onClick={() => props.onHide()}
              style={{
                position: "absolute",
                right: "1rem",
                top: ".8rem",
                fontSize: "2rem",
              }}
              type="button"
              className="close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            style={{ background: " #d5d5d5 !important" }}
            className="card-body rounded-bottom bg-success p-3"
          >
            <form>
              <div className="form-group">
                <strong className="form-label">Title</strong>
                <input
                  name="day"
                  value={Appointment.day}
                  onChange={handleInputs}
                  type="text"
                  className="form-control border-0 p-4"
                  placeholder="Title"
                  required="required"
                />
              </div>
              <div className="form-group">
                <strong className="form-label">Date</strong>
                <input
                  name="date"
                  value={Appointment.date}
                  onChange={handleInputs}
                  type="date"
                  className="form-control border-0 p-4"
                  placeholder="Date"
                  required="required"
                />
              </div>

              <div className="form-group">
                <strong className="form-label">Time</strong>
                <input
                  name="time"
                  value={Appointment.time}
                  onChange={handleInputs}
                  type="time"
                  className="form-control border-0 p-4"
                  placeholder="Title"
                  required="required"
                />
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="btn btn-secondary btn-block border-0 py-3"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
