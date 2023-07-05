import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken"

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            password: true
        }
    })

    if (!user || !user.password || !await bcrypt.compare(password, user.password.hash)) {
        return res.status(401).json({
            message: "invalid email or password"
        })
    }
    // @ts-ignore
    delete user.password

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret);

    return res.status(200).json({ user, token });

}

export default getUser;