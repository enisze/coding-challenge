'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import type { PersonalinfoFormValues } from '../types'

export function PersonalInformation() {
	const {
		register,
		formState: { errors },
	} = useFormContext<PersonalinfoFormValues>()

	return (
		<div className="space-y-4 text-start">
			<div className="space-y-2">
				<Label htmlFor={register('name').name}>Name</Label>
				<Input {...register('name')} />
				{errors.name && (
					<span className="text-sm text-destructive">
						{errors.name.message}
					</span>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor={register('phoneNumber').name}>Phone Number</Label>
				<Input {...register('phoneNumber')} />
				{errors.phoneNumber && (
					<span className="text-sm text-destructive">
						{errors.phoneNumber.message}
					</span>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor={register('numberOfUnits').name}>Number of Units</Label>
				<Input {...register('numberOfUnits')} />
				{errors.numberOfUnits && (
					<span className="text-sm text-destructive">
						{errors.numberOfUnits.message}
					</span>
				)}
			</div>
		</div>
	)
}
