import protect from "@/lib/middleware/protect";
import { NextApiRequest, NextApiResponse } from "next";
import { createTest } from "../../../features/tests/usecases/create-test";
import withErrorHandler from "@/lib/error-handler";
import getTests from "@/features/tests/usecases/get-tests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST": {
            let userId = await protect(req);

            const test = await createTest({
                userId: userId,
                ...req.body
            });

            return res.status(200).json({ message: "test created successfully", test })
        };

        case "GET": {
            let userId = await protect(req);
            const tests = await getTests(userId);
            return res.status(200).json(tests)
        }
        default:
            return res.status(405).json({ message: "Method not allowed" })
    }
}

export default withErrorHandler(handler);



