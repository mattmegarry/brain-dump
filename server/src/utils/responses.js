import send from "./send";

const success = data => {
  const response = {
    status: 200
  };

  if (data) {
    response.data = data;
  }

  return response;
};

const accessDenied = (req, res) => {
  res.locals = {
    status: 401,
    data: {
      message: "Access denied",
      token: "remove"
    }
  };

  send(req, res);
};

const emailNeedsVerification = () => {
  return {
    status: 401,
    data: {
      message: "Please verify your email address."
    }
  };
};

const loginRejected = () => {
  return {
    status: 401,
    data: {
      message: "Username password combination does not match."
    }
  };
};

const opaqueError = () => {
  return {
    status: 500,
    data: {
      message:
        "Something went wrong. If the problem persists, please contact support."
    }
  };
};

const notFound = () => {
  return {
    status: 404,
    data: {
      message: "Not found."
    }
  };
};

const Respond = {
  success,
  accessDenied,
  loginRejected,
  emailNeedsVerification,
  opaqueError,
  notFound
};

export default Respond;
