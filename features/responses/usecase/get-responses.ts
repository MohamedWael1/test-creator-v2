import prisma from "@/lib/prisma"

const getResponses = async (userId : number) => {
    const responses = await prisma.testResponse.findMany({
        where: {
            userId: userId
        },
        include: {
            responseQuestion: {
                include: {
                    responseAnswer: true
                }
            }
        }
    })

    return responses;
}

export default getResponses;