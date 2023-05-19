import { UNAUTHORIZED } from "./statusCodes";

const TOKEN_EXPIRED = {
  status: UNAUTHORIZED,
  message: "Token expired"
};

export { TOKEN_EXPIRED };