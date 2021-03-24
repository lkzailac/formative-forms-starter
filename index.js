const express = require("express");
const cookieParser = require('cookie-parser');
const csrf = require("csurf");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie:true })

app.get("/", (req, res) => {
  res.render("index", { users });
});

app.get("/create", csrfProtection, (req, res) => {
  res.render("create", {csrfToken:req.csrfToken()})
})

app.get("/create-interesting", csrfProtection, (req, res) => {
  res.render("create-interesting", {
    csrfToken: req.csrfToken(),
  })
})

const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errors = [];

  if (!firstName) {
    errors.push("Please provide a first name.");
  }

  if (!lastName) {
    errors.push("Please provide a last name.");
  }

  if (!email) {
    errors.push("Please provide an email.");
  }

  if (!password) {
    errors.push("Please provide a password.");
  }

  if (password !== confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.");
  }

  req.errors = errors;
  next();
}

app.post("/create", csrfProtection, validateUser, (req, res) => {
  if (errors.length > 0) {
    res.render("create", {
      errors,
      csrfToken: req.csrfToken(),
      firstName,
      lastName,
      email,
      password
    })
    return;
  }

  const user = {
    id: users.length + 1,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  }

  users.push(user);
  res.redirect("/");
})

app.post("/create-interesting", csrfProtection, validateUser, (req, res) => {
  if (!age || 120 < age < 1) {
    errors.push("age is required");
    errors.push("age must be a valid age");
  }

  if (!favoriteBeatle || favoriteBeatle === "Scooby-Doo") {
    errors.push("favoriteBeatle is required");
    errors.push("favoriteBeatle must be a real Beatle member");
  }

  if (errors.length > 0) {
    res.render("create-interesting", {
      errors,
      csrfToken: req.csrfToken(),
      firstName,
      lastName,
      email,
      password
    })
    return;
  }

  const user = {
    id: users.length + 1,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  }

  users.push(user);
  res.redirect("/");
})

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
