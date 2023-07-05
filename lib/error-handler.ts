import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { AuthorizationError } from "@/lib/errors";

function handleError(err: any, res: NextApiResponse) {
    if(err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: err.message,
            errors: err.format()
        })
    }

    if(err instanceof AuthorizationError) {
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }

    if(err instanceof Error) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

function withErrorHandler(handler: NextApiHandler): NextApiHandler {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handler(req, res)
        } catch (err) {
            console.log(err)
            const message = handleError(err, res)
            return res.status(500).json({ message })
        }
    }
}

export default withErrorHandler;


