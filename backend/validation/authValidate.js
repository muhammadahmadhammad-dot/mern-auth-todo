import z from "zod"

export const registerScheme = z.object({
    fname: z.string().trim().min(3).max(100),
    lname: z.string().trim().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6),
})
export const loginScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})