import jwt from "jsonwebtoken";

const generateToken = (payload, secretSign, tokenLife) => {
  try {
    return jwt.sign({ payload }, secretSign, { expiresIn: tokenLife });
  } catch (err) {
    console.log(`Token generate fail ${err}`);
  }
};

const verifyToken = (token, secretSign) => {
  try {
    return jwt.verify(token, secretSign);
  } catch (err) {
    console.log(`Token verify fail ${err}`);
  }
};

export { generateToken, verifyToken };
