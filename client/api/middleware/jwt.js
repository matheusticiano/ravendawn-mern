import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401,"You are not authenticated!"))


  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403,"Token is not valid!"))
    req.userId = payload.id;

    res.cookie("accessToken", token, {
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias em milissegundos
      httpOnly: true,
      domain: "https://ravendawn.onrender.com",
      path: "/api",
      secure: true,
    });
    
    next()
  });
};