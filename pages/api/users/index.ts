import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import nc from "next-connect";

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password, name } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: {
                    create: {
                        hash: await bcrypt.hash(password, 10)
                    }
                },
                name
            }
        })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret);

        return res.status(200).json({ user, token });



    }
    catch (err: any) {
        return res.status(500).json({
            err: err.message
        })
    }

}





const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, name, password } = req.body;
    try {
        const user = prisma.user.update({
            where: {
                email
            },
            data: {
                name,
                password: {
                    update: {
                        hash: await bcrypt.hash(password, 10)
                    }
                }
            }
        })
    }
    catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}


const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    const user = await prisma.user.delete({
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

    return res.status(200).json({ message: "user deleted successfully" })

}


const createUserHandler = nc({ attachParams: true }).post(createUser)
const updateUserHandler = nc({ attachParams: true }).put(updateUser)
const deleteUserHandler = nc({ attachParams: true }).delete(deleteUser)

export default nc().use(createUserHandler).use(updateUserHandler).use(deleteUserHandler)