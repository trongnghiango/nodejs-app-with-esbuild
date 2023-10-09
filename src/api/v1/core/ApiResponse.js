/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @since   2020
 */

module.exports = {
  /**
   * @desc    Send any success response
   *
   * @param   {object} data
   */
  successHandler: ({ message = "OK", results, statusCode = 10000 }) => ({
    message,
    error: false,
    code: statusCode,
    results,
  }),

  /**
   * @desc    Send any error response
   *
   * @param {string} message
   * @param   {number | undefined} error
   */
  errorHandler: (message = "Error", statusCode = 500) => {
    /**
     * List of common HTTP request code
     * @note  You can add more http request code in here
     */
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    // Get matched code
    let findCode = codes.find((code) => code === statusCode);

    if (!findCode) findCode = 500;

    return {
      message,
      code: findCode,
      error: true,
    };
  },

  /**
   * @desc    Send any validation response
   *
   * @param   {object | array} errors
   */
  validation: (errors) => ({
    message: "Validation errors",
    error: true,
    code: 422,
    errors,
  }),
};
