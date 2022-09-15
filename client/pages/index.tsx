import type { NextPage } from 'next';
import Link from 'next/link';

// TODO: Simple Navbar for navigation

const Home: NextPage = () => {
	return (
		<nav
			style={{
				display: 'flex',
				gap: 52,
			}}>
			<Link passHref href='/signin'>
				<a>Sign in</a>
			</Link>
			<Link passHref href='/signup'>
				<a>Sign up</a>
			</Link>
			<Link passHref href='/forget-password'>
				<a>Forget password</a>
			</Link>
			<Link passHref href='/reset-password'>
				<a>Reset password</a>
			</Link>
		</nav>
	);
};

export default Home;
