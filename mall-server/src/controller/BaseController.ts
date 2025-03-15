import jwt, { JwtPayload } from "jsonwebtoken";

class BaseController {
  static verifyToken(token: string) {
    let result: JwtPayload = jwt.verify(token, "aiaiai123456X") as JwtPayload;
    return result ? result.data : undefined;
  }
}

export const { verifyToken } = BaseController;
