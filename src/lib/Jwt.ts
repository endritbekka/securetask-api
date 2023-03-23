import jwt from "jsonwebtoken";
import { JWTSign, JWTVerify } from "../lib/types";

class Jwt {
  public sign(config: JWTSign) {
    return jwt.sign(config.payload, config.secretOrPrivateKey, config.options);
  }

  public verify(config: JWTVerify) {
    return jwt.verify(config.token, config.secretOrPrivateKey);
  }
}

export default new Jwt();
