function errorHandler(err, req, res, next) {
  console.log("Error:", err);

  let errCode = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      errCode = 400;
      message = err.errors[0].message;
      break;
    case "Name is required":
      errCode = 400;
      message = "Please provide a user name";
      break;
    case "Email is required":
      errCode = 400;
      message = "Please provide an email";
      break;
    case "Password is required":
      errCode = 400;
      message = "Please provide a password";
      break;
    case "Email must be unique":
      errCode = 400;
      message = "Email has already been taken";
      break;
    case "Invalid email/password":
      errCode = 401;
      message = "Invalid email/password";
      break;
    case "Invalid token":
    case "JsonWebTokenError":
      errCode = 401;
      message = "Invalid token";
      break;
    case "Unauthorized":
      errCode = 403;
      message = "Unauthorized activity";
      break;
  }

  res.status(errCode).json({ message });
}

module.exports = errorHandler;
