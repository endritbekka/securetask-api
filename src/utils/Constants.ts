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
    auth_key: string;
    mail_key: string;
  };
  mail: {
    api_key: string;
    from_email: string;
  };
}

const configuration: configurationI = {
  server: {
    app_port: process.env.APP_PORT || "3000",
  },
  redis: {
    url: process.env.REDIS_URL || "",
  },
  jwt: {
    auth_key: process.env.AUTH_JWT_KEY as string,
    mail_key: process.env.JWT_MAIL_KEY as string,
  },
  mail: {
    api_key: process.env.SENDGRID_API_KEY as string,
    from_email: process.env.SENDGRID_SENDER_EMAIL as string,
  },
};

export default configuration;
