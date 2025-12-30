import status from "http-status";

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
const notFound = (req, res) => {
  const error = new NotFoundError(req.originalUrl);
  res.status(status.NOT_FOUND).json({
    success: false,
    message: error.message,
    errorMessage: [
      {
        path: req.originalUrl,
        message: "Not Found",
      },
    ],
  });
};

export default notFound;