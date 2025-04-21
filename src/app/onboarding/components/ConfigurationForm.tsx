'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import type { ConfigurationFormValues } from '../types'

export function ConfigurationForm() {
	const {
		register,
		formState: { errors },
	} = useFormContext<ConfigurationFormValues>()

	return (
		<div className="space-y-4 text-start">
			<div className="space-y-2">
				<Label htmlFor={register('message').name}>Message</Label>
				<Input {...register('message')} />
				{errors.message && (
					<span className="text-sm text-destructive">
						{errors.message.message}
					</span>
				)}
			</div>
		</div>
	)
}
