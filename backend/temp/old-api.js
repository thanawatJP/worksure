const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const multer = require("multer");
const path = require("path"); 
const { log } = require("console");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "worksure",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

db.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});
// 123456789
let loginId = "";

app.post("/login", (req, res) => {
  // console.log(req.body);
  let sql = "";
  if (req.body.roles === "user") {
    sql = "SELECT * FROM login JOIN profile USING (login_id) WHERE email = ? AND password = ?";
  } else {
    sql = "SELECT * FROM login JOIN company USING (login_id) WHERE email = ? AND password = ?";
  }
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      loginId = result[0].login_id;
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

// User
app.post("/check", (req, res) => {
  if (req.body.email === "" || req.body.password === "" || req.body.confirmPassword === "") {
    return res.json({ Status: "Error", Error: "ป้อนอีเมลหรือรหัสผ่าน" });
  } else if (req.body.password !== req.body.confirmPassword) {
    return res.json({ Status: "Error", Error: "รหัสผ่านไม่ตรงกัน" });
  } else {
    const sql = "SELECT email FROM login WHERE (email=?)";
    db.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ Status: "Error", Error: "Error in running query" });
      if (result.length > 0) {
        return res.json({ Error: "อีเมลถูกใช้แล้ว" });
      } else {
        return res.json({ Status: "Success" });
      }
    });
  }
});

app.post(
  "/signup",
  upload.fields([
    { name: "profImg", maxCount: 1 }, // maxCount 1 because you allow only one file
    { name: "idCardImg", maxCount: 1 }, // maxCount 1 because you allow only one file
    { name: "resumeImg", maxCount: 1 }, // maxCount 1 because you allow only one file
  ]),
  (req, res) => {
    if (
      req.body.firstName === "" ||
      req.body.lastName === "" ||
      req.body.nickName === "" ||
      req.body.sex === "" ||
      req.body.phone === "" ||
      req.body.idLine === "" ||
      req.body.birthDate === "" ||
      req.files.profImg[0].filename === "" ||
      req.files.idCardImg[0].filename === "" ||
      req.files.resumeImg[0].filename === ""
    ) {
      return res.json({ Status: "Error", Error: "กรุณาใส่ข้อมูลให้ครบ" });
    }

    const sql1 = "INSERT INTO login (`email`, `password`) VALUES (?)";
    const values = [req.body.email, req.body.password];
    db.query(sql1, [values], (err, result) => {
      if (err) {
        console.error("Error inserting data into 'login' table:", err);
        return;
      } else {
        const login_Id = result.insertId;
        loginId = login_Id;

        const sql2 =
          "INSERT INTO profile (`pro_firstname`, `pro_lastname`, `pro_nickname`, `sex`, `pro_phone`, `id_line`, `birthday`, `pro_image`, `idcard_image`, `protfolio`, `login_id`) VALUES (?)";
        const values2 = [
          req.body.firstName,
          req.body.lastName,
          req.body.nickName,
          req.body.sex,
          req.body.phone,
          req.body.idLine,
          req.body.birthDate,
          req.files.profImg[0].filename,
          req.files.idCardImg[0].filename,
          req.files.resumeImg[0].filename,
          login_Id,
        ];
        db.query(sql2, [values2], (err, result) => {
          if (err) {
            loginId = "";
            console.error("Error inserting data into 'login' table:", err);
            return;
          } else {
            console.log("Data inserted successfully into both tables.");
            // loginId = result[0].login_id;
            return res.json({ Status: "Success" });
          }
        });
      }
    });
  }
);

// company
app.post("/comCheck", (req, res) => {
  if (
    req.body.compName === "" ||
    req.body.busType === "" ||
    req.body.contName === "" ||
    req.body.contPhone === "" ||
    req.body.email === "" ||
    req.body.password === "" ||
    req.body.confirmPassword === ""
  ) {
    return res.json({ Status: "Error", Error: "กรุณากรอกข้อมูลให้ครบ" });
  } else if (req.body.password !== req.body.confirmPassword) {
    console.log("password");
    return res.json({ Status: "Error", Error: "รหัสผ่านไม่ตรงกัน" });
  } else {
    const sql = "SELECT email FROM login WHERE (email=?)";
    db.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ Status: "Error", Error: "Error in running query" });
      if (result.length > 0) {
        return res.json({ Error: "อีเมลถูกใช้แล้ว" });
      } else {
        return res.json({ Status: "Success" });
      }
    });
  }
});

app.post("/comSignup", upload.single("com_image"), (req, res) => {
  // console.log(req.file);
  // console.log(req.body);

  if (
    req.body.com_type === "" ||
    req.body.tax_no === "" ||
    req.body.com_facebook === "" ||
    req.body.com_line === "" ||
    req.body.address === "" ||
    req.body.tambon === "" ||
    req.body.amphur === "" ||
    req.body.city === "" ||
    req.body.postalcode === "" ||
    req.body.com_about === "" ||
    req.file.filename === ""
  ) {
    return res.json({ Status: "Error", Error: "กรุณาใส่ข้อมูลให้ครบ" });
  }

  const sql1 = "INSERT INTO login (`email`, `password`) VALUES (?)";
  const values = [req.body.email, req.body.password];

  db.query(sql1, [values], (err, result) => {
    if (err) {
      console.error("Error inserting data into 'login' table:", err);
      return;
    } else {
      const login_Id = result.insertId;
      loginId = login_Id;

      const sql2 = "INSERT INTO location (`address`, `city`, `amphur`, `tambon`, `postalcode`) VALUES (?)";
      const values2 = [req.body.address, req.body.city, req.body.amphur, req.body.tambon, req.body.postalcode];
      db.query(sql2, [values2], (err, result) => {
        if (err) {
          loginId = "";
          console.error("Error inserting data into 'location' table:", err);
          return;
        } else {
          const location_Id = result.insertId;

          const sql3 =
            "INSERT INTO company (`com_name`, `business_type`, `contact_name`, `contact_phone`, `com_image`, `tax_no`, `com_type`, `com_about`, `com_facebook`, `com_line`, `login_id`, `location_id`) VALUES (?)";
          const values3 = [
            req.body.com_name,
            req.body.business_type,
            req.body.contact_name,
            req.body.contact_phone,
            req.file.filename,
            req.body.tax_no,
            req.body.com_type,
            req.body.com_about,
            req.body.com_facebook,
            req.body.com_line,
            login_Id,
            location_Id,
          ];
          db.query(sql3, [values3], (err, result) => {
            if (err) {
              loginId = "";
              console.error("Error inserting data into 'company' table:", err);
              return;
            } else {
              console.log("Data inserted successfully into 3 tables.");
              return res.json({ Status: "Success" });
            }
          });
        }
      });
    }
  });
});

app.post("/logout", (req, res) => {
  loginId = "";
  return res.json({ Status: "Success" });
});

app.get("/getMyprofile", (req, res) => {
  // console.log(loginId)
  const sql = "SELECT * FROM profile JOIN login USING (login_id) WHERE login_id = (?)";
  db.query(sql, [loginId], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(result);
    return res.json({ Status: "Success", Result: result[0] });
  });
});

// app.get('/job', (req, res) => {
//     db.query("SELECT * FROM job JOIN branch b USING (bran_id) JOIN company c USING (com_id) JOIN location l ON (b.location_id=l.location_id)", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

app.listen(3001, () => {
  console.log("Sever is running on port 3001");
});
