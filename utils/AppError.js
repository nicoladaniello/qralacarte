// Error codes.
const appErrorCodes = {
  NOT_FOUND: "not-found",
  INTERNAL: "internal",
};

/**
 * Generic application error class.
 *
 * Bases on code from:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
 */
class AppError extends Error {
  constructor(code, message) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.name = "AppError";
    this.code = code;
  }
}

AppError.codes = appErrorCodes;

export default AppError;
