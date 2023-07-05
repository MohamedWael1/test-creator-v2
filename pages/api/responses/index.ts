import { NextApiRequest, NextApiResponse } from "next";
import withErrorHandler from "@/lib/error-handler";
import { createResponse } from "@/features/responses/usecase/create-response";
import getResponses from "@/features/responses/usecase/get-responses";
import protect from "@/lib/middleware/protect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST": {
            let userId = await protect(req);
            const response = await createResponse({
                userId: userId,
                ...req.body
            });
            return res.status(200).json({ message: "response created successfully", response })
        };
        case "GET": {
            const userId = await protect(req);
            const responses = await getResponses(userId);
            console.log(responses);
            return res.status(200).json(responses)
        }
        default:
            return res.status(405).json({ message: "Method not allowed" })
    }
}

export default withErrorHandler(handler);



