import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js';

const authUser = async (req, resizeBy, next) => {
    const { token } = req.cokkies;

    if (!token) {
        throw new ApiError(400, "AccessToken Denied")
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decodedToken) {
            throw new ApiError(400, "Not Authorized.")
        }

        req.user = decodedToken;

        next()
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, error.message)
    }
}

export default authUser