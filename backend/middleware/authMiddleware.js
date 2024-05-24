import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const protect = async (req, res, next) => {
  let token;

  // if (req.headers.authorization){
  //   console.log("AUTHORIZATION:", req.headers.authorization)
  // }
  // else console.log("HEADERS:", req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded._id).select("-password");
    } catch (e) {
      console.error("AUTHORIZATION ERROR", e);
      res.status(401);
      throw new Error("No Authorization");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No Authorized");
  }
  next();
};

export { protect };
