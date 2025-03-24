/**
 * Authorization middleware module for role-based access control.
 * This module provides middleware for restricting access to routes based on user roles.
 */

import { ForbiddenError, UnauthorizedError } from "../utils/error.util.js";

/**
 * Creates a middleware function that checks if the authenticated user has one of the required roles.
 * @param {string[]} roles - Array of role names that are allowed to access the route
 * @returns {Function} Express middleware function
 * @throws {UnauthorizedError} If user is not authenticated
 * @throws {ForbiddenError} If user's role is not in the allowed roles list
 */
const roleBasedAuthorization = (roles) => {
    return async (req, _res, next) => {
        if (!req.isAuthenticated())
            throw new UnauthorizedError(
                "You must be logged in to access this resource."
            );
        if (!roles.includes(req.user.role)) {
            throw new ForbiddenError(
                "You are not authorized to access this resource."
            );
        }
        next();
    };
};

export default roleBasedAuthorization;
