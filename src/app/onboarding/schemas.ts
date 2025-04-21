import { z } from 'zod'

export const personalInfoSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
	numberOfUnits: z.number().min(1, 'Number of units is required'),
})

export const configureSchema = z.object({
	message: z.string().min(1, 'Message is required'),
})
