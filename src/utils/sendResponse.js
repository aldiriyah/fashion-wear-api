 const sendResponse = (res, data) => {
  res.status(res.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;