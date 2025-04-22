'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { onboardingAtom } from '@/lib/atoms'
import { signOut } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { defineStepper } from '@stepperize/react'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { saveData } from '../action'
import { configureSchema, personalInfoSchema } from '../schemas'
import type { FormValues } from '../types'
import { ConfigurationForm } from './ConfigurationForm'
import { PersonalInformation } from './PersonalInformation'
import { SuccessScreen } from './SuccessScreen'

const { useStepper, steps, utils } = defineStepper(
	{
		id: 'personalInfo',
		label: 'Personal Info',
		schema: personalInfoSchema,
	},
	{
		id: 'configuration',
		label: 'Configuration',
		schema: configureSchema,
	},
)

const combinedSchema = z.discriminatedUnion('step', [
	personalInfoSchema.extend({ step: z.literal('personalInfo') }),
	configureSchema.extend({ step: z.literal('configuration') }),
])

export const Stepper = () => {
	const stepper = useStepper()
	const [savedData, setSavedData] = useAtom(onboardingAtom)
	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<FormValues>({
		mode: 'onTouched',
		defaultValues: {
			step: stepper.current.id,
			...savedData,
		},
		resolver: zodResolver(combinedSchema),
	})

	const values = form.watch()

	const currentIndex = utils.getIndex(stepper.current.id)

	const onSubmit = async () => {
		setSavedData(values)

		if (stepper.isLast) {
			await saveData(values)
			setSavedData(RESET)
			setIsSuccess(true)
		} else {
			stepper.next()
		}
	}

	if (isSuccess) {
		return <SuccessScreen />
	}

	return (
		<div className="relative min-h-screen w-full flex items-center justify-center">
			<Button
				onClick={() => {
					signOut({
						fetchOptions: {
							onSuccess: () => {
								redirect('/signUp')
							},
						},
					})
				}}
				className="absolute top-4 right-4"
			>
				Sign Out
			</Button>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 p-6 border rounded-lg w-[450px] h-full"
				>
					<div className="flex justify-between">
						<h2 className="text-lg font-medium">Onboarding </h2>
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								Step {currentIndex + 1} of {steps.length}
							</span>
						</div>
					</div>
					<div className="flex items-center justify-between my-4 gap-2">
						{stepper.all.map((step, index, array) => (
							<React.Fragment key={step.id}>
								<li className="flex items-center gap-4 flex-shrink-0">
									<Button
										type="button"
										role="tab"
										variant={index <= currentIndex ? 'default' : 'secondary'}
										className="flex size-10 items-center justify-center rounded-full"
										onClick={async () => {
											const valid = await form.trigger()
											//must be validated
											if (!valid) return
											//can't skip steps forwards but can go back anywhere if validated
											if (index - currentIndex > 1) return
											stepper.goTo(step.id)
										}}
									>
										{index + 1}
									</Button>
									<span className="text-sm font-medium">{step.label}</span>
								</li>
								{index < array.length - 1 && (
									<Separator
										className={cn(
											'flex-1',
											index < currentIndex ? 'bg-primary' : 'bg-muted',
										)}
									/>
								)}
							</React.Fragment>
						))}
					</div>
					<div className="space-y-4">
						{stepper.switch({
							personalInfo: () => <PersonalInformation />,
							configuration: () => <ConfigurationForm />,
						})}
						{!stepper.isLast ? (
							<div className="flex justify-end gap-4">
								<Button
									variant="secondary"
									onClick={stepper.prev}
									disabled={stepper.isFirst}
								>
									Back
								</Button>
								<Button type="submit">
									{stepper.isLast ? 'Complete' : 'Next'}
								</Button>
							</div>
						) : (
							<Button type="submit">Finish Onboarding</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	)
}
