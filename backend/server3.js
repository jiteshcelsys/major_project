const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const jwtKey = 'secretKey';
app.use(express.json());
// app.use(cors());
app.use(cors({origin: true, credentials: true}));



const bcrypt = require('bcrypt');

app.post('/signup',async(req,res)=>{
  try {
    console.log(req.body.emp_num)
    const dispaly = await pool.query("INSERT INTO signup (emp_num, role_, first_name, last_name, email, password_ ) values($1, $2, $3, $4, $5, $6)",[req.body.emp_num, req.body.role_, req.body.first_name, req.body.last_name, req.body.email, req.body.password_]);
    res.json('Inserted successfully');
    
  } catch (err) {
    console.log(err.message)
    
  } 
})
app.post('/login',async(req,res)=>{
  try {
    const confirmEmail=req.body.email
    const confirmPassword=req.body.password_
    const Login = await pool.query("SELECT emp_num, email, password_, role_  from signup where email=$1 AND password_=$2 ",[confirmEmail ,confirmPassword]); 
    console.log(Login, 'li');
    const data = Login.rows;
    console.log(Login.rows, 'hkkhli');
   const LoginUser=Login.rows[0]?.email;
   console.log(LoginUser," ----LOGIN USER")
   const passwordUser =Login.rows[0]?.password_
  
   if(LoginUser==confirmEmail){
    res.status(200).json({ sucess: true, isLoggedIn: true ,data:data });
          console.log('login request');

   }
   else{
    return res.json({ sucess: false, message: 'password not valid' })

   }


  } catch (err) {
    console.log(err.message)
    
  }
})

app.post('/emp_login',async(req,res)=>{
  console.log(req.body);
  const InserEmpLogin = await pool.query(
    "INSERT INTO emp_login(emp_num,obj_no, indi_obj, perfor_obj, self_rating) VALUES ($1,$2, $3, $4, $5)",[]);

})

// app.post('/emp_login',async(req,res)=>{
//   try {
//     const Insert = await pool.query("INSERT INTO emp_login (emp_num, obj_no, indi_obj, perfor_obj, self_rating, Mgr_rating ) values($1, $2, $3, $4, $5, $6)",[req.body.emp_num, req.body.obj_no, req.body.indi_obj, req.body.perfor_obj, req.body.self_rating,  req.body.Mgr_rating]);

//     res.json('Inserted successfully in emp_login');
   
    
//   } catch (err) {
//     console.log(err.message)
    
//   }
// })


// app.post('/signup', async (req, res) => {
//   console.log(req.body);
//   try {

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     // const tokenS = undefined;
//     const Insert_user = req.body.email;
//     const Insert_Password = hashedPassword;
//     const NewLogin = await pool.query("INSERT INTO details(email,password) VALUES($1,$2 ) RETURNING *  ", [Insert_user, Insert_Password])
//     console.log(NewLogin);
//     res.status(201).send('Added')
//   } catch (err) {
//     console.log(err.message);
//   }
// });

app.post('/login', async (req, res) => {

  const userInfo = req.body.email;
  const userPassword = req.body.password;
  // console.log(userInfo)
  let accessToken;
  // const updateUser = await pool.query("UPDATE details  set token =$1 where email=$2  ", [true, userInfo]);
  const hash = await pool.query("SELECT email,password from DETAILS WHERE email = $1", [userInfo]);
  // console.log(hash.rows[0]?.email);
  const hashedUser = hash.rows[0]?.email
  const hashedPassword = hash?.rows[0]?.password;
  // console.log(hashedPassword);
  if (hashedPassword&&hashedUser) {
    bcrypt.compare(userPassword, hashedPassword, async (err, response) => {
      if (err) {
        console.log(err);
        return err;
      }
      if (response) {
        if (hashedUser === userInfo) {
          accessToken = jwt.sign(userInfo, jwtKey);
          res.status(200).json({ sucess: true, auth: accessToken, isLoggedIn: true });
          console.log('login request');
        }
      
      }
      else {
        return res.json({ sucess: false, message: 'password not valid' })
      }
    });
  }
  else{
    return res.json({ sucess: false, message: 'Email is not valid' })

  }
})

app.get('/auth', autheticateToken, async (req, res) => {
  console.log(req.authUser)
  try {
    const user = await pool.query("SELECT * FROM Details");
    const verifiedUser = user.rows.filter(value => value.email === req.authUser);
    if (verifiedUser[0].token === "false") {
      return res.status(200).json('Need To Login first');
    }
    else {
      res.status(200).json(verifiedUser);
    }
  } catch (err) {
    res.status(401).json('logout')
    console.log(err.message)
  }
})

app.post('/logout', async (req, res) => {
  try {
  //   const emailR = req.body.email;
  //   const user = await pool.query(`UPDATE details  set token=$1 where email=$2`, [false, emailR]);
    res.status(200).send('Logout successfull');

  } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send(err);
  }
})


function autheticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token === undefined || token === null) {
    return res.status(404);
  }
  const parsedToken = JSON.parse(token);
  jwt.verify(parsedToken, jwtKey, (err, data1) => {
    if (err) {
      return res.status(403).json('token tampered');

    }
    console.log(data1);
    req.authUser = data1;
    next();
  })
  // req.token = token;
}

app.listen(3000, () => {
  console.log('server is running at port 3000');
})