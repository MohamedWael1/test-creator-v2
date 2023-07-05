import deleteTest from "@/features/tests/usecases/delete-test";
import getTest from "@/features/tests/usecases/get-test";
import updateTest from "@/features/tests/usecases/update-test";
import withErrorHandler from "@/lib/error-handler";
import protect from "@/lib/middleware/protect";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET": {
            const user = await protect(req)
            const test = await getTest(Number(req.query.id), user)
            return res.status(200).json(test)
        }

        case "DELETE": {
            const test = await deleteTest(Number(req.query.id))
            return res.status(200).json({ message: "Test deleted" })
        }

        case "PUT": {
            const test = await updateTest(Number(req.query.id), req.body)
            return res.status(200).json(test)
        }

        default:
            return res.status(405).json({ message: "Method not allowed" })
    }
}

export default withErrorHandler(handler)