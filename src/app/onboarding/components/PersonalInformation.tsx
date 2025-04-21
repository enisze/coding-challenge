'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSaveData } from '@/hooks/useSaveData'
import { useFormContext } from 'react-hook-form'
import type { PersonalinfoFormValues } from '../types'

export function PersonalInformation() {
	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext<PersonalinfoFormValues>()

	const saveData = useSaveData('personalInfo')

	return (
		<div className="space-y-4 text-start">
			<div className="space-y-2">
				<Label htmlFor={register('name').name}>Name</Label>
				<Input {...register('name')} onBlur={saveData} />
				{errors.name && (
					<span className="text-sm text-destructive">
						{errors.name.message}
					</span>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor={register('phoneNumber').name}>Phone Number</Label>
				<Input {...register('phoneNumber')} onBlur={saveData} />
				{errors.phoneNumber && (
					<span className="text-sm text-destructive">
						{errors.phoneNumber.message}
					</span>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor={register('numberOfUnits').name}>Number of Units</Label>
				<Input
					{...register('numberOfUnits')}
					type="number"
					onChange={(e) => {
						const val = Number(e.target.value)
						if (!Number.isNaN(val)) {
							setValue('numberOfUnits', val)
						}
					}}
					onBlur={saveData}
				/>
				{errors.numberOfUnits && (
					<span className="text-sm text-destructive">
						{errors.numberOfUnits.message}
					</span>
				)}
			</div>
		</div>
	)
}
