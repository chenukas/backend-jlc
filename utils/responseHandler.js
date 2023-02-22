const { HttpStatus } = require("../types/http");
const logger = require(".");

/**
 * Client error handler
 * @param {*} res Response object
 * @param {*} error Error message to be returned
 */
const handleBadRequest = (res, error) => {
    logger.error(`Bad request ${HttpStatus.BAD_REQUEST}: ${error}`);
    res.status(HttpStatus.BAD_REQUEST)
        .json({
            success: false, error
        });
}

/**
 * Unauthorized error handler
 * @param {*} res Response object
 * @param {*} error Error message to be returned
 */
const handleUnauthorizedRequest = (res, error) => {
    logger.error(`Unauthorized request ${HttpStatus.UNAUTHORIZED}: ${error}`);
    res.status(HttpStatus.UNAUTHORIZED)
        .json({
            success: false, error
        });
}

/**
 * Forbidden error handler
 * @param {*} res Response object
 * @param {*} error Error message to be returned
 */
const handleForbiddenRequest = (res, error) => {
    logger.error(`Forbidden request ${HttpStatus.FORBIDDEN}: ${error}`);
    res.status(HttpStatus.FORBIDDEN)
        .json({
            success: false, error
        });
}

/**
* Success scenario handler
* @param {*} res Response object
* @param {*} data Data object
*/
const handleSuccessResponse = (res, data, message = '') => {
    logger.info(`Success ${HttpStatus.OK}: ${message}`);
    res.status(HttpStatus.OK)
        .json({
            success: true, data, message
        });
}

/**
* Handle server side errors
* @param {*} res Response object
* @param {*} error Error message
*/
const handleError = (res, error) => {
    logger.error(`Internal server error ${HttpStatus.INTERNAL_SERVER_ERROR}: ${error}`);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
            success: false, error
        });
}

module.exports = {
    handleBadRequest,
    handleUnauthorizedRequest,
    handleForbiddenRequest,
    handleSuccessResponse,
    handleError
}