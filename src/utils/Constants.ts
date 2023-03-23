import * as dotenv from "dotenv";
dotenv.config();

interface configurationI {
  server: {
    app_port: string;
  };
  redis: {
    url: string;
  };
  jwt: {
    auth_key: string
  }
}

const configuration: configurationI = {
  server: {
    app_port: process.env.APP_PORT || "3000",
  },
  redis: {
    url: process.env.REDIS_URL || "",
  },
  jwt: {
    auth_key: process.env.AUTH_JWT_KEY as string
  },
};

export default configuration;
