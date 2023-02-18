const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const jwtKey = "secretKey";
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));

//signup Component
app.post("/userDetails", async (req, res) => {
  try {
    // console.log(req.body);
    const dispaly = await pool.query(
      "INSERT INTO userDetails (emp_num, role_, first_name, last_name, email, password_ ) values($1, $2, $3, $4, $5, $6)",
      [
        req.body.emp_num,
        req.body.role_,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.password_,
      ]
    );
    res.json("Inserted successfully");
  } catch (err) {
    // console.log(err.message);
  }
});
//Employee component
app.post("/PreviousFormClick", async (req, res) => {
  const backend = await pool.query(
    "select * from emp_login where emp_num=$1 ",
    [req.body.emp_num]
  );
  // console.log(backend.rows.perfor_obj);

  res.json(backend.rows);
});

//Employee component (SubmitFunction)
app.post("/emp_loginupdate", async (req, res) => {
  // console.log(req.body);
  const sqlData = await pool.query(
    "update emp_login set indi_obj=$1,perfor_obj=$2 ,self_rating=$3 where emp_num=$4",
    [
      req.body.indi_obj,
      req.body.perfor_obj,
      req.body.self_rating,
      req.body.emp_num,
    ]
  );
});

//Employee component (UpdateEmpLogin)
app.post("/update_emp_login", async (req, res) => {
  // console.log(req.body);
  const response = await pool.query(
    "update emp_login set perfor_obj=$1 , self_rating=$2  where emp_num=$3 and indi_obj=$4",
    [
      req.body.perfor_obj,
      req.body.self_rating,
      req.body.emp_num,
      req.body.indi_obj,
    ]
  );
  res.json({ message: true });
});

//defaultManager
app.post("/InsertIndividual", async (req, res) => {
  const emp_num = req.body.emp_num;
  const indi_obj = req.body.indi_obj;
  const InsertData = await pool.query(
    "Insert into emp_login (emp_num,indi_obj) values($1,$2)",
    [emp_num, indi_obj]
  );
  res.json("Inserted successfully");
});
//behaviour component
app.post("/emp/addbehave", async (req, res) => {
  const Insert = await pool.query(
    "Insert into  behaviourEmp  values($1,$2,$3,$4)",
    [
      req.body.emp_num,
      req.body.behaviour_attr,
      req.body.description,
      req.body.mgr_rating,
    ]
  );
  const response = await pool.query(
    "select * from behaviourEmp where emp_num=$1",
    [req.body.emp_num]
  );
  res.json(response.rows);
});

app.post("/getbehave", async(req, res)=>{
  console.log(req.body);
  const response = await pool.query(
    "select * from behaviourEmp where emp_num=$1",
    [req.body.emp_num]
  );
  res.json(response.rows);
  
})
app.post("/getcomment",async(req, res)=>{
  const response=await pool.query('Select * from commentEmp where emp_num=$1',[req.body.emp_num])
  res.json(response.rows);
  console.log(req.body);
})

app.post("/login", async (req, res) => {
  try {
    const confirmEmail = req.body.email;
    const confirmPassword = req.body.password_;
    const Login = await pool.query(
      "SELECT emp_num, email, password_, role_ ,first_name from userDetails where email=$1 AND password_=$2 ",
      [confirmEmail, confirmPassword]
    );
    const data = Login.rows;
    const LoginUser = Login.rows[0]?.email;
    const passwordUser = Login.rows[0]?.password_;

    if (LoginUser == confirmEmail) {
      res.status(200).json({ sucess: true, isLoggedIn: true, data: data });
    } else {
      return res.json({ sucess: false, message: "password not valid" });
    }
  } catch (err) {
  }
});

app.get("/manager", async (req, res) => {
  // console.log(req.body);

  const manager = await pool.query(
    "select e.emp_num, u.first_name from emp_login e inner join userdetails u on e.emp_num=u.emp_num  and e.self_rating>2 group by (e.emp_num, u.first_name) order by emp_num"
  );
  res.json(manager.rows);
});

app.post("/manager/add", async (req, res) => {
  console.log(req.body.emp_num);
  const managerAdd = await pool.query(
    "select* from emp_login where emp_num=$1",
    [req.body.emp_num]
  );

  res.json(managerAdd.rows);
});
app.post("/fetch/indi_obj", async (req, res) => {
  console.log(req.body);
  const responsedata = await pool.query(
    "select indi_obj from emp_login where emp_num =$1",
    [req.body.emp_num]
  );
  res.json(responsedata.rows);

});

app.post("/manager/update", async (req, res) => {
  // console.log(req.body);
  const InsertData = await pool.query(
    "update emp_login set mgr_rating=$1  where emp_num=$2 and indi_obj=$3",
    [req.body.mgr_rating, req.body.emp_num, req.body.indi_obj]
  );
  const data = await pool.query(
    "select* from emp_login where emp_num =$1 and  indi_obj=$2",
    [req.body.emp_num, req.body.indi_obj]
  );
  res.json(data.rows);
});

app.get("/managertable", async (req, res) => {
  const response = await pool.query("select* from userdetails ");

  res.json(response.rows);
});

app.post("/managertable/insert", async (req, res) => {
  // console.log(req.body)
  const response = await pool.query("Insert into  managertable values($1)", [
    req.body.indi_obj,
  ]);
  res.json("successfully deleted");
});


app.post("/comment/insert", async (req, res) => {
  const InsertComment = await pool.query(
    "Insert into  commentEmp  values($1,$2,$3,$4)",
    [req.body.emp_num, req.body.keepDoing, req.body.start, req.body.stop]
  );
  const fetchComment = await pool.query(
    "select * from commentEmp where emp_num=$1",
    [req.body.emp_num]
  );
  res.json(fetchComment.rows);
});

app.listen(4000, () => {
  console.log("server is running at port 4000");
});
