'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export function SuccessScreen() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<Card className="w-[450px] p-6 space-y-6">
				<h2 className="text-lg font-medium text-center">
					Dein Onboarding Prozess war erfolgreich.
				</h2>
				<div className="flex justify-center">
					<Button asChild>
						<Link href="/">Zum Dashboard</Link>
					</Button>
				</div>
			</Card>
		</div>
	)
}
