import type { FormValues } from '@/app/onboarding/types'
import { onboardingAtom } from '@/lib/atoms'
import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

export const useSaveData = (step: 'personalInfo' | 'configuration') => {
	const { watch } = useFormContext()
	const setSavedData = useSetAtom(onboardingAtom)

	const vals = watch()

	const saveData = useCallback(() => {
		setSavedData(
			(prev) =>
				({
					...prev,
					...vals,
					step,
				}) as FormValues,
		)
	}, [setSavedData, vals, step])

	return saveData
}
