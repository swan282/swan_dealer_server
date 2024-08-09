import jwt from "jsonwebtoken";
import DistributorModel from "../models/distributorModel.js";

const VerifyToken = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {

      token = authorization.split(" ")[1];
      const {dealerId} = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await DistributorModel.findById(dealerId);
      next();
    } else {
      res
        .status(400)
        .send({ status: "fail", message: "Token is not authenticated" });
    }
  } catch (error) {
    res.status(400).send({ status: "fail", message: "Some thing went wrong!" });
  }
};

export default VerifyToken;