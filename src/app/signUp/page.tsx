import { Card } from '@/components/ui/card'
import { auth } from '@/server/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import CredentialsForm from './CredentialsForm'

export default async function SignInPage() {
	const headerList = await headers()

	const session = await auth.api.getSession({ headers: headerList })

	if (session) {
		redirect('onboarding')
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<Card className="w-full max-w-md p-6 space-y-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold">Welcome</h1>
					<p className="text-muted-foreground mt-2">Sign Up</p>
				</div>

				<div className="space-y-4">
					<CredentialsForm />
				</div>
			</Card>
		</div>
	)
}
