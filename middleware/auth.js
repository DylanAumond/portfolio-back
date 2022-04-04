import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.cookies["access_token"];
  if (token != undefined) {
    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      const xsrfToken = req.headers["x-xsrf-token"];
      if (decoded.xsrfToken != xsrfToken) {
        res.status("403").json({ messsage: "attack CSRF decteted" });
      } else {
        console.log("ras");
        next();
      }
    });
  } else {
    res.status(403).json({ messsage: "Invalid JWT Token" });
  }
};
