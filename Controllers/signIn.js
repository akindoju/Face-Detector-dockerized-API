const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("Incorret form submission");
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => user[0])
          .catch((err) => Promise.reject("Something went wrong"));
      } else {
        Promise.reject("Incorrect details");
      }
    })
    .catch((err) => Promise.reject("Incorrect details"));
};

const getAuthTokenId = () => {
  console.log("auth token");
};

const signInAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId
    : handleSignIn(req, res, db, bcrypt)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  signInAuthentication: signInAuthentication,
};
