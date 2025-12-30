import status from "http-status";

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = status.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
  let errorSource = [
    {
      path: "",
      message: "Internal Server Error",
    },
  ];

  if (err.code === 11000) {
    statusCode = status.CONFLICT;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
    errorSource = [
      {
        path: field,
        message: `${field} already exists`,
      },
    ];
  } else if (err.name === "CastError") {
    statusCode = status.BAD_REQUEST;
    message = `Invalid value for ${err.path}`;
    errorSource = [
      {
        path: err.path,
        message: `Invalid ${err.path}: ${err.value}`,
      },
    ];
  } else if (err.name === "ValidationError") {
    statusCode = status.BAD_REQUEST;
    const fieldsWithErrors = Object.values(err.errors)
      .map((el) => `${el.path}: ${el.message}`)
      .join("; ");
    message = ` ${fieldsWithErrors}`;
    errorSource = Object.values(err.errors).map((el) => ({
      path: el.path,
      message: el.message,
    }));
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage: errorSource,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;