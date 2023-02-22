const { DataTypes } = require("sequelize");

const dbConnection = require("./index");

const User = dbConnection.define("User", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RegId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Student = dbConnection.define("Student", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Counselor = dbConnection.define("Counselor", {
  // id: {
  //   type: DataTypes.BIGINT,
  //   autoIncreament: true,
  //   primaryKey: true,
  // },
  counselorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Posts = dbConnection.define("Posts", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
const Chat = dbConnection.define("Chat", {
  Text: {
    type: DataTypes.STRING,
  },
  sender: {
    type: DataTypes.STRING,
  },
  receiver: {
    type: DataTypes.STRING,
  },
});
const Admin = dbConnection.define("Admin", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Appointment = dbConnection.define("Appointment", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});
const Case = dbConnection.define("Case", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Syptoms: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
const HUStudent = dbConnection.define("HUStudent", {
  // id: {
  //   type: DataTypes.BIGINT,
  //   autoIncreament: true,
  //   primaryKey: true,
  // },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entryYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const HUCounselor = dbConnection.define("HUCounselor", {
  // id: {
  //   type: DataTypes.BIGINT,
  //   autoIncreament: true,
  //   primaryKey: true,
  // },
  counselorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// HUCounselor.sync()
// HUStudent.sync()
// User.sync()
// Counselor.sync()
// Admin.sync()
// Student.sync()
HUStudent.hasMany(Chat);
Counselor.hasMany(Chat);

Chat.belongsTo(HUStudent);
Chat.belongsTo(Counselor);

User.hasMany(Case);
Case.belongsTo(User);

Counselor.hasMany(Posts);
Posts.belongsTo(Counselor);

Counselor.hasMany(Appointment);
HUStudent.hasMany(Appointment);
Appointment.belongsTo(Counselor);
Appointment.belongsTo(HUStudent);

Counselor.hasMany(Case);

HUStudent.belongsTo(Counselor);
Counselor.hasMany(HUStudent);

module.exports.User = User;
module.exports.Counselor = Counselor;
module.exports.Student = Student;
module.exports.Chat = Chat;
module.exports.Admin = Admin;
module.exports.Appointment = Appointment;
module.exports.Case = Case;
module.exports.Posts = Posts;
module.exports.HUStudent = HUStudent;
module.exports.HUCounselor = HUCounselor;

//dbConnection.sync({ force: true });
