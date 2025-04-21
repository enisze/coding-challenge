import { Card } from '@/components/ui/card'
import CredentialsForm from './CredentialsForm'

export default function SignInPage() {

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
