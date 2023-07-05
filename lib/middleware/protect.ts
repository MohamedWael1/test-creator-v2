import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { AuthorizationError } from "../errors";

async function protect(req: NextApiRequest) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new AuthorizationError("Not authorized");
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        throw new AuthorizationError("Unauthorized")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: number };
        return  decoded.id ;
    } catch (error) {
        throw new AuthorizationError("Unauthorized")
    }
}

export default protect;