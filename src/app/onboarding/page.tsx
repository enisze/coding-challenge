'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { defineStepper } from '@stepperize/react'
import * as React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'

const personalInfoSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
	numberOfUnits: z.string().min(1, 'Number of units is required'),
})

const configureSchema = z.object({
	message: z.string().min(1, 'Message is required'),
})

type PersonalinfoFormValues = z.infer<typeof personalInfoSchema>

type ConfigurationFormValues = z.infer<typeof configureSchema>

type FormValues =
	| ({ step: 'personalInfo' } & PersonalinfoFormValues)
	| ({ step: 'configuration' } & ConfigurationFormValues)

const { useStepper, steps, utils } = defineStepper(
	{ id: 'personalInfo', label: 'Personal Info', schema: personalInfoSchema },
	{ id: 'configuration', label: 'Configuration', schema: configureSchema },
)

export default function Onboarding() {
	const stepper = useStepper()
	const form = useForm<FormValues>({
		mode: 'onTouched',
		defaultValues: {
			step: stepper.current.id,
		},
	})

	const currentIndex = utils.getIndex(stepper.current.id)

	const onSubmit = async (values: FormValues) => {
		if (values.step === 'personalInfo') {
			stepper.next()
		} else {
			stepper.next()
		}
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 p-6 border rounded-lg w-[450px] h-[450px]"
				>
					<div className="flex justify-between">
						<h2 className="text-lg font-medium">Onboarding</h2>
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
							<Button
								onClick={() => {
									//TODO:
								}}
							>
								Finish Onboarding
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	)
}

function PersonalInformation() {
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

function ConfigurationForm() {
	const {
		register,
		formState: { errors },
	} = useFormContext<ConfigurationFormValues>()

	return (
		<div className="space-y-4 text-start">
			<div className="space-y-2">
				<Label htmlFor={register('message').name}>Message</Label>
				<Input {...register('message')} />
				{errors.message && (
					<span className="text-sm text-destructive">
						{errors.message.message}
					</span>
				)}
			</div>
		</div>
	)
}
