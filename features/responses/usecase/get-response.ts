import prisma from "@/lib/prisma"

const getResponse = async (id: number) => {
    const response = await prisma.testResponse.findUnique({
        where: {
            id: id
        },
        include: {
            responseQuestion: {
                include: {
                    responseAnswer: true
                }
            }
        }
    })

    return response;
}

export default getResponse;