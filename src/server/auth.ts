import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './client'

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'sqlite',
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: false,
		minPasswordLength: 2,
	},
	secret: process.env.JWT_SECRET,
	databaseHooks: {
		user: {
			create: {},
		},
	},
	user: {
		additionalFields: {
			phoneNumber: {
				type: 'string',
				fieldName: 'phoneNumber',
			},
			numberOfUnits: {
				type: 'number',
				fieldName: 'numberOfUnits',
				nullable: true,
			},
		},
	},
})
