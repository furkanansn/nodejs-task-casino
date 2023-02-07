let jwt = require("jsonwebtoken");

const generateJwt = (user_id: number) => {
  const payLoad = {
    id: user_id,
  };

  return jwt.sign(payLoad, process.env.SECRET_KEY ?? "test", { expiresIn: "10 days" });
};

export default generateJwt;
