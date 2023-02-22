const socketio = require("socket.io");

const io = socketio(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

function storeSocket(userId, username, socketId) {
  let found = false;
  users.forEach((user) => {
    if (user.username == username) {
      found = true;
    }
  });

  if (!found) {
    users.push({ userId, username, socketId });
  }
}

function findSocketByUsername(username) {
  console.log(users);
  let user = users.find((user) => user.username == username);

  console.log(user);

  return user?.socketId;
}

io.on("connection", (socket) => {
  socket.on("openChat", (user) => {
    storeSocket(user.id, user.username, socket.id);

    io.emit("userAdded", users);
  });

  socket.on("sendMessage", (msg) => {
    console.log(msg);

    const socketId = findSocketByUsername(msg.username);

    if (socketId != null) {
      console.log("Messag Sent to " + socketId, " - " + msg.username);

      io.to(socketId).emit("messageSent", {
        msg: msg,
      });
    } else {
      console.log("Socket ID is NULL!");
    }
  });

  socket.on("user_disconnected", (userId) => {
    //console.log(userId, " Disconnected");
    //User.update({
    //    socketId: null,
    //}, {
    //    where: {
    //        id: userId,
    //    },
    //}).then((result) => {});
  });

  socket.on("disconnect", () => {
    //console.log(socket.id, "user disconnected!");
    //User.update(
    //  {
    //    socketId: null,
    //  },
    //  {
    //    where: {
    //      socketId: socket.id,
    //    },
    //  }
    //).then((result) => {
    //  //socket.broadcast('leavesocket', {user: "user"})
    //});
  });
});
