'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function CredentialsForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const confirmPassword = formData.get('confirmPassword') as string

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			setIsLoading(false)
			return
		}

		await authClient.signUp.email(
			{
				email,
				password,
				name: '',
			},
			{
				onError: ({ error }) => {
					if (error.code === 'PASSWORD_TOO_SHORT')
						setError('Password must be at least 8 characters long')
					setIsLoading(false)
				},
				onSuccess: () => {
					redirect('/onboarding')
				},
			},
		)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="john@example.com"
					required
					disabled={isLoading}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					required
					disabled={isLoading}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="confirmPassword">Confirm Password</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					required
					disabled={isLoading}
				/>
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? 'Signing up...' : 'Sign up'}
			</Button>
		</form>
	)
}
