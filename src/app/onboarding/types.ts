import type { z } from 'zod'
import type { configureSchema, personalInfoSchema } from './schemas'

export type PersonalinfoFormValues = z.infer<typeof personalInfoSchema>
export type ConfigurationFormValues = z.infer<typeof configureSchema>

export type FormValues =
	| ({ step: 'personalInfo' } & PersonalinfoFormValues)
	| ({ step: 'configuration' } & ConfigurationFormValues)
