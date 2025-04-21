import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import type { FormValues } from '../app/onboarding/types'

const storage = createJSONStorage<FormValues | null>(() => {
	if (typeof window !== 'undefined') {
		return window.localStorage
	}
	return {
		getItem: () => null,
		setItem: () => {},
		removeItem: () => {},
	}
})

export const onboardingAtom = atomWithStorage<FormValues | null>(
	'onboarding-data',
	null,
	storage,
	{ getOnInit: true },
)
