class AppError extends Error {
  constructor(message, statuscode) {
    super(message);
  }
}
