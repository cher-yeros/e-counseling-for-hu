const { HUStudent, Admin, Counselor } = require("./models/schema");
const bcrypt = require("bcrypt");

const data = [
  {
    studentId: 06,
    fullname: "Mekonen Adenew",
    department: "Computer Science",
    entryYear: "2014",
    gender: "male",
    phoneNumber: "09654235295",
    password: "password",
  },
  {
    studentId: 10,
    fullname: "Aelat Ali",
    department: "Law and Governance",
    entryYear: "2014",
    gender: "female",
    phoneNumber: "09876545673",
    password: "crate",
  },
  {
    studentId: 05,
    fullname: "Asrat Assefa",
    department: "Information System",
    entryYear: "2014",
    gender: "male",
    phoneNumber: "09123454325",
    password: "password",
  },
  {
    studentId: 09,
    fullname: "Mercy Getaneh",
    department: "Agricultur",
    entryYear: "2010",
    gender: "femal",
    phoneNumber: "095687235643",
    password: "password",
  },
  {
    studentId: 07,
    fullname: "Yegetansh Haji",
    department: "Language",
    entryYear: "2010",
    gender: "femal",
    phoneNumber: "09890765848",
    password: "password",
  },
  {
    studentId: 02,
    fullname: "Dawit Belay",
    department: "Textile Engineering",
    entryYear: "2011",
    gender: "male",
    phoneNumber: "09185473542",
    password: "create",
  },
  {
    studentId: 22,
    fullname: "Belete Cherent",
    department: "Medicine",
    entryYear: "2009",
    gender: "male",
    phoneNumber: "09099889098",
    password: "password",
  },
  {
    studentId: 21,
    fullname: "Caleb Bahiru",
    department: "Garment",
    entryYear: "2013",
    gender: "male",
    phoneNumber: "09999876789",
    password: "password",
  },
  {
    studentId: 04,
    fullname: "Beteab Ayele",
    department: "Water Supply",
    entryYear: "2011",
    gender: "male",
    phoneNumber: "09223344556",
    password: "create",
  },
  {
    studentId: 08,
    fullname: "Daniel Elias",
    department: "Computer Science",
    entryYear: "2007",
    gender: "male",
    phoneNumber: "09897887654",
    password: "password",
  },
  {
    studentId: 11,
    fullname: "Endale Fasil",
    department: "Chemical Engineering",
    entryYear: "2012",
    gender: "male",
    phoneNumber: "09987655667",
    password: "create",
  },
  {
    studentId: 17,
    fullname: "Gedion Haile",
    department: "Biomedical Engineering",
    entryYear: "2008",
    gender: "male",
    phoneNumber: "0989900998",
    password: "password",
  },
  {
    studentId: 01,
    fullname: "Henok Endrias",
    department: "Informatin Technology",
    entryYear: "2011",
    gender: "male",
    phoneNumber: "09786574345",
    password: "password",
  },
  {
    studentId: 18,
    fullname: "Eyasu Fikru",
    department: "Civil Engineering",
    entryYear: "2011",
    gender: "male",
    phoneNumber: "0987654343",
    password: "password",
  },
  {
    studentId: 03,
    fullname: "Girum Israel",
    department: "Textile Engineering",
    entryYear: "2011",
    gender: "male",
    phoneNumber: "09786756453",
    password: "create",
  },
  {
    studentId: 13,
    fullname: "Fasika Bereket",
    department: "Biosystem",
    entryYear: "2009",
    gender: "male",
    phoneNumber: "09564783321",
    password: "password",
  },
  {
    studentId: 16,
    fullname: "Abenet Belete",
    department: "Mechanical Engineering",
    entryYear: "2010",
    gender: "male",
    phoneNumber: "098765432",
    password: "create",
  },
  {
    studentId: 12,
    fullname: "Bilen Akililu",
    department: "Infoemation System",
    entryYear: "2013",
    gender: "femal",
    phoneNumber: "090876987",
    password: "password",
  },
  {
    studentId: 25,
    fullname: "Eyerus Bahiru",
    department: "Chemical Engineering",
    entryYear: "2012",
    gender: "femal",
    phoneNumber: "0987675654",
    password: "create",
  },
  {
    studentId: 15,
    fullname: "Feven Binyam",
    department: "Law and Governance",
    entryYear: "2009",
    gender: "femal",
    phoneNumber: "098789099",
    password: "password",
  },
  {
    studentId: 20,
    fullname: "Bement Ayele",
    department: "Medicin",
    entryYear: "2010",
    gender: "femal",
    phoneNumber: "098756764",
    password: "password",
  },
  {
    studentId: 14,
    fullname: "Natan Teshome",
    department: "Computer Science",
    entryYear: "2011",
    gender: "male",
    phoneNumber: "0978654309",
    password: "create",
  },
  {
    studentId: 23,
    fullname: "Bereket Teshome",
    department: "Biosystem",
    entryYear: "2007",
    gender: "male",
    phoneNumber: "09788742309",
    password: "create",
  },
  {
    studentId: 90,
    fullname: "jemal maru",
    department: "computer science",
    entryYear: "2011",
    gender: "male",
    phoneNumber: "0949822309",
    password: "password",
  },
  {
    studentId: 24,
    fullname: "Feven Ayele",
    department: "Information System",
    entryYear: "2014",
    gender: "femal",
    phoneNumber: "0949822309",
    password: "password",
  },
  {
    studentId: 19,
    fullname: "Liul Tagese",
    department: "Mechancal Engineering",
    entryYear: "2013",
    gender: "femal",
    phoneNumber: "0949822309",
    password: "password",
  },
];

data.forEach(async (s, i) => {
  s.studentId = `coscr/001${i}/11`;
  const salt = await bcrypt.genSalt(10);
  s.password = await bcrypt.hash(s.password, salt);

  HUStudent.create(s).then(({ data }) => {console.log(data)}).catch((e)=>{console.log(e)});
});

let admin = {
  name: "Jemal Maru",
  email: "jemal@gmail.com",
  phone: "0953704992",
  password: "$2b$10$DV3OUsBCYjLg.IQyFVC4m.78Om8fcRkEbObvzD6yAJak7Z8c6RTSy", //password
};

Admin.create(admin).then((res) => console.log("Admin Seeded"));

let counselor = {
  fullName: "Mintewab Teshome",
  email: "minte@gmail.com",
  counselorId: "Haji/2014/11",
  category: "economical",
  phone: "0927038324",
  gender: "female",
  password: "$2b$10$DV3OUsBCYjLg.IQyFVC4m.78Om8fcRkEbObvzD6yAJak7Z8c6RTSy", //password
};

Counselor.create(counselor).then((res) => console.log("Counselor Seeded"));