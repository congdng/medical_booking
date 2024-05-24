const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("You are not an admin");
  }
};

const doctor = (req, res, next) => {
  if (req.user && req.user.role === "doctor") {
    next();
  } else {
    res.status(401);
    throw new Error("You are not an doctor");
  }
};

export { admin, doctor };
