import { auth } from '@/server/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Stepper } from './components/Stepper'

export default async function Onboarding() {
	const headersList = await headers()
	const session = await auth.api.getSession({
		headers: headersList,
	})

	if (!session) {
		redirect('/signUp')
	}

	return <Stepper />
}
