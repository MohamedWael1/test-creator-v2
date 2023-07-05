import { NextApiRequest, NextApiResponse } from "next";
import withErrorHandler from "@/lib/error-handler";
import protect from "@/lib/middleware/protect";
import getResponse from "@/features/responses/usecase/get-response";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET": {
            const response = await getResponse(Number(req.query.id));
            return res.status(200).json(response)
        }

        default:
            return res.status(405).json({ message: "Method not allowed" })
    }
}

export default withErrorHandler(handler);



