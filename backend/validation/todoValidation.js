import z from "zod"

export const todoScheme = z.object({
    todo:z.string().trim().min(3).max(255),
    // userId:z.string().trim()
})