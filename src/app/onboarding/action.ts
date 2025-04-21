'use server'

import { auth } from '@/server/auth'
import { prisma } from '@/server/client'
import { headers } from 'next/headers'
import { configureSchema, personalInfoSchema } from './schemas'
import type { FormValues } from './types'

export const saveData = async (data: FormValues) => {
	const headersList = await headers()

	const session = await auth.api.getSession({
		headers: headersList,
	})

	const parsedConfig = configureSchema.parse(data)

	const parsedPersonalInfo = personalInfoSchema.parse(data)

	const userId = session?.user.id

	if (!userId) {
		throw new Error('User not authenticated')
	}

	await prisma.$transaction(async (p) => {
		await p.user.update({
			where: {
				id: userId,
			},
			data: {
				...parsedPersonalInfo,
			},
		})

		await p.aIConfiguration.create({
			data: {
				userId,
				announcement: parsedConfig.message,
			},
		})
	})
}
