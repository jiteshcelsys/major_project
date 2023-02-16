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
 
  const backend =await pool.query('select * from emp_login where emp_num=$1 ',[req.body.emp_num])
  // console.log(backend.rows.perfor_obj);
  
  res.json(backend.rows);
});

//Employee component (SubmitFunction)
app.post("/emp_loginupdate", async (req, res) => {
  // console.log(req.body);
  const sqlData= await pool.query("update emp_login set indi_obj=$1,perfor_obj=$2 ,self_rating=$3 where emp_num=$4" ,[req.body.indi_obj,req.body.perfor_obj, req.body.self_rating,req.body.emp_num] )
//  const managerData=('Select * from managertable')
 
});

//Employee component (UpdateEmpLogin)
app.post('/update_emp_login',async(req,res)=>{
  // console.log(req.body);
  const response =await pool.query('update emp_login set perfor_obj=$1 , self_rating=$2  where emp_num=$3 and indi_obj=$4',[req.body.perfor_obj, req.body.self_rating, req.body.emp_num, req.body.indi_obj])
  res.json({message:true})
})

//defaultManager
app.post("/InsertIndividual", async (req, res) => {
  const emp_num=req.body.emp_num
  const indi_obj=req.body.indi_obj
  const InsertData =await pool.query('Insert into emp_login (emp_num,indi_obj) values($1,$2)',[emp_num,indi_obj])
  // console.log('Inserted')
  // console.log(req.body);
 
    
  
  res.json("Inserted successfully");
});



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
      // console.log("login request");
    } else {
      return res.json({ sucess: false, message: "password not valid" });
    }
  } catch (err) {
    // console.log(err.message);
  }
});

//user details based on given emp_num

/*
select e.emp_num ,u.first_name from emp_login e inner join userdetails u on e.emp_num =u.emp_num
group by (e.emp_num, u.first_name)	 order by emp_num*/
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

app.get('/managertable',async(req, res)=>{
  const response = await pool.query("select u.emp_num , e.first_name,e.last_name ,u.role_ from userdetails u inner join userdetails e on u.emp_num=e.emp_num group by (u.emp_num,e.first_name,e.last_name) ");
  // console.log(response.rows)
  res.json(response.rows);
})
//delete cashcading we have to implement before delteting the row from the managertable

app.post('/managertable/insert',async(req, res)=>{
  // console.log(req.body)
  const response =await pool.query('Insert into  managertable values($1)',[req.body.indi_obj])
  res.json('successfully deleted');
})
// app.post("/login", async (req, res) => {
//   const userInfo = req.body.email;
//   const userPassword = req.body.password;
  // console.log(userInfo)
//   let accessToken;
//   // const updateUser = await pool.query("UPDATE details  set token =$1 where email=$2  ", [true, userInfo]);
//   const hash = await pool.query(
//     "SELECT email,password from DETAILS WHERE email = $1",
//     [userInfo]
//   );
  // console.log(hash.rows[0]?.email);
//   const hashedUser = hash.rows[0]?.email;
//   const hashedPassword = hash?.rows[0]?.password;
  // console.log(hashedPassword);
//   if (hashedPassword && hashedUser) {
//     bcrypt.compare(userPassword, hashedPassword, async (err, response) => {
//       if (err) {
        // console.log(err);
//         return err;
//       }
//       if (response) {
//         if (hashedUser === userInfo) {
//           accessToken = jwt.sign(userInfo, jwtKey);
//           res
//             .status(200)
//             .json({ sucess: true, auth: accessToken, isLoggedIn: true });
          // console.log("login request");
//         }
//       } else {
//         return res.json({ sucess: false, message: "password not valid" });
//       }
//     });
//   } else {
//     return res.json({ sucess: false, message: "Email is not valid" });
//   }
// });

app.get("/auth", autheticateToken, async (req, res) => {
  // console.log(req.authUser);
  try {
    const user = await pool.query("SELECT * FROM Details");
    const verifiedUser = user.rows.filter(
      (value) => value.email === req.authUser
    );
    if (verifiedUser[0].token === "false") {
      return res.status(200).json("Need To Login first");
    } else {
      res.status(200).json(verifiedUser);
    }
  } catch (err) {
    res.status(401).json("logout");
    // console.log(err.message);
  }
});

app.post("/logout", async (req, res) => {
  try {
    //   const emailR = req.body.email;
    //   const user = await pool.query(`UPDATE details  set token=$1 where email=$2`, [false, emailR]);
    res.status(200).send("Logout successfull");
  } catch (err) {
    //   console.log(err.message);
    //   res.status(500).send(err);
  }
});

function autheticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === undefined || token === null) {
    return res.status(404);
  }
  const parsedToken = JSON.parse(token);
  jwt.verify(parsedToken, jwtKey, (err, data1) => {
    if (err) {
      return res.status(403).json("token tampered");
    }
    console.log(data1);
    req.authUser = data1;
    next();
  });
  // req.token = token;
}

app.listen(4000, () => {
  console.log("server is running at port 3000");
});
