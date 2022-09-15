import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Button,
	Container,
	createStyles,
	Divider,
	Group,
	Paper,
	SegmentedControl,
	SegmentedControlProps,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BrandGoogle } from 'tabler-icons-react';
import * as yup from 'yup';
import {} from 'yup/lib/types';

const useStyles = createStyles((theme) => ({
	paper: {
		margin: 'auto',
		maxWidth: '512px',
		boxShadow: '0 -1px 1px rgba(0,0,0,0.05),0 3px 6px rgba(0,0,0,0.1)',
		padding: '1.5rem',
	},
	link: {
		color: theme.colors.blue[6],
		textTransform: 'none',
	},
}));

const validationSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const defaultValues = {
	email: '',
	password: '',
};

// NOTE: Use `SegmentedControl` instead of Tabs to switch between "Candidate Form" & "Employer Form"to reduce sign up code

export function SignIn() {
	const [activeTab, setActiveTab] = useState<string | null>('job_seeker');
	const { classes } = useStyles();
	const methods = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const {
		handleSubmit,
		register,
		clearErrors,
		reset,
		formState: { errors },
	} = methods;

	const onSubmit = (values: typeof defaultValues) => {
		console.log(values);
	};

	const handleChange = (v: string) => {
		setActiveTab(v);
		reset();
	};

	return (
		<Container mt='30px'>
			<Paper className={classes.paper}>
				<Title align='center' weight='normal' mb='24px'>
					Sign in
				</Title>
				<StyledSegmentedControl
					mb='24px'
					onChange={(value) => handleChange(value)}
					data={[
						{
							label: 'I am an Employer',
							value: 'employer',
						},
						{
							label: 'Iam a job seeker',
							value: 'job_seeker',
						},
					]}
				/>
				{activeTab === 'job_seeker' && (
					<Box my='24px'>
						<Button
							leftIcon={<BrandGoogle strokeWidth={3} size={20} />}
							fullWidth
							radius='lg'>
							Sign in with google
						</Button>
						<Divider label='or' labelPosition='center' my='24px' />
					</Box>
				)}
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextInput
						label='Email address'
						mb='20px'
						error={errors.email && errors.email.message}
						{...register('email')}
					/>
					<TextInput
						label='password'
						mb='20px'
						error={errors.password && errors.password.message}
						{...register('password')}
					/>
					<Group position='right' mb='md'>
						<Text size='sm' weight={500} color='blue'>
							<a>Forgot Password ?</a>
						</Text>
					</Group>
					<Button fullWidth radius='lg' type='submit'>
						Sign in
					</Button>
				</form>

				<Text mt='lg' align='center' size='sm'>
					New to FastRecruiter{' '}
					<Link
						href={activeTab === 'job_seeker' ? 'signup' : '/employer-signup'}
						passHref>
						<Text color='blue' component='a' weight={500}>
							{activeTab === 'job_seeker' ? 'Create an account' : 'Post a job'}
						</Text>
					</Link>
				</Text>
			</Paper>
		</Container>
	);
}

const useSegmentedControlStyles = createStyles(() => ({
	root: {
		display: 'flex',
		backgroundColor: '#ffffffff',
		border: 'none',
		marginBottom: '15px',
		margin: '0 auto 15px',
		width: '100%',
		textAlign: 'center',
		maxWidth: '340px',
		padding: '0px',
	},
	label: {
		color: '#72777c',
		fontWeight: 'normal',
	},
	control: {
		padding: '10px 18px',
		margin: '0 2px',
		borderBottom: '2px solid transparent',
		boxShadow: 'none',
		'&:hover': { backgroundColor: '#f8f9fa', borderColor: '#dee2e6' },
	},
	labelActive: {
		fontWeight: 700,
	},

	active: {
		display: 'none',
	},
	controlActive: {
		boxShadow: 'none',
		'&:hover': { borderColor: 'transparent' },
		'&::before': {
			borderRadius: '4px 4px 0 0',
			content: '" "',
			display: 'block',
			height: '4px',
			left: '0',
			position: 'absolute',
			bottom: '0',
			width: '100%',
			transition: 'all .08s linear',
			backgroundColor: '#228be6',
		},
	},
}));

const StyledSegmentedControl = ({ data, ...props }: SegmentedControlProps) => {
	const { classes } = useSegmentedControlStyles();
	return (
		<SegmentedControl
			classNames={{
				...classes,
			}}
			data={data}
			{...props}
		/>
	);
};
