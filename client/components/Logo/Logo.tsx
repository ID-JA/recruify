import { useMantineTheme } from '@mantine/core';

export function Logo() {
	const theme = useMantineTheme();
	return (
		<svg
			version='1.2'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1280 349'
			width='201'
			height='54'>
			<g id='LOGO'>
				<g id='pngegg'>
					<path
						id='Path 0'
						fillRule='evenodd'
						fill={theme.colorScheme === 'dark' ? '#ffff' : '#58595b'}
						d='m212.5 1.5c12.1 0.3 19.7 0.9 26.5 2.4 5.2 1.1 13.6 3.4 18.5 5.2 4.9 1.7 12.6 4.9 17 7.1 4.4 2.2 10.9 5.9 14.5 8.2 3.6 2.4 10.6 7.6 15.5 11.8 4.9 4.2 12 11.1 15.6 15.4 3.7 4.4 9.1 11.7 12.1 16.4 3.1 4.7 7 11.4 8.8 15 1.8 3.6 5 11.7 7.1 18 2.1 6.3 4.6 15.8 5.5 21 1.2 6.4 1.8 14.7 1.8 25.5 0 10.7-0.6 19.1-1.7 25.3-0.9 5-3.1 13.6-4.8 18.9-1.7 5.4-5.1 14.1-11.9 28.8l34.4 34.5c18.9 19 35.1 36 36 37.8 0.9 1.7 1.9 4.9 2.2 7 0.4 2 0.1 6.2-0.6 9.2-1.2 5.2-2.2 6.4-15.9 20.4-8.9 9-16.2 15.6-18.6 16.7-2.5 1.2-6.3 1.9-10 1.9-4 0-7.4-0.7-10-2-2.5-1.2-17.1-15-73-70.9l-7.5 3.9c-4.1 2.1-12.2 5.4-18 7.4-5.8 2.1-15.6 4.6-21.7 5.7q-11.3 1.9-25.3 1.9c-9.3 0-17.8-0.6-25.2-1.9-6.2-1.1-15.6-3.4-20.8-5.1-5.2-1.8-13.6-5.2-18.5-7.7-4.9-2.4-12.6-6.8-17-9.8-4.4-2.9-11.4-8.2-15.5-11.8-4.1-3.5-10.5-10-14.1-14.3-3.7-4.4-9.3-11.9-12.5-16.9-3.2-4.9-7.4-12.4-9.2-16.5-1.9-4.1-4.8-11.3-6.4-16-1.5-4.7-3.8-13.4-5-19.5-1.6-8.3-2.1-14.7-2.1-26.5 0-10.4 0.5-18.8 1.7-25.5 1-5.5 3.4-14.7 5.2-20.5 1.9-5.8 5.2-14.1 7.3-18.5 2.2-4.4 6.6-12 9.9-17 3.4-4.9 8.7-12 11.9-15.7 3.2-3.6 9-9.4 12.8-12.8 3.8-3.5 11.1-9 16-12.2 4.9-3.3 12.6-7.8 17-10 4.4-2.2 12.5-5.5 18-7.4 5.5-1.8 13.8-4 18.5-4.8 4.7-0.8 9.9-1.7 11.5-2 1.6-0.2 10.6-0.3 20-0.1zm-33.5 26.8c-5.2 1.3-13.3 4.1-18 6.1-4.7 2-11.4 5.4-15 7.5-3.6 2.1-10.3 7-15 10.8-4.7 3.8-11.2 10.1-14.4 13.9-3.2 3.8-7.6 9.4-9.6 12.4-2.1 3-5.6 9.3-8 14-2.3 4.7-5.5 12.3-7 17-1.5 4.7-3.4 11.7-4.1 15.5-0.9 4.3-1.4 13.1-1.3 23 0 12.8 0.5 17.9 2.3 25.5 1.2 5.2 3.8 13.6 5.8 18.5 1.9 4.9 5.4 12.1 7.6 16 2.2 3.9 5.7 9.3 7.7 12 2 2.8 6.5 8.1 10.1 11.9 3.5 3.8 10.2 9.7 14.9 13.2 4.7 3.6 12.3 8.4 17 10.8 4.7 2.4 12.3 5.8 17 7.4 4.7 1.7 12.6 3.8 17.5 4.8 5.9 1.1 13.6 1.8 22.5 1.8 8.5 0 16.7-0.7 22-1.7 4.7-0.9 12.6-3 17.5-4.7 4.9-1.7 13.1-5.2 18-7.8 4.9-2.6 11.7-6.8 15-9.2 3.3-2.5 9.1-7.4 12.9-11 3.7-3.6 9.2-9.6 12.2-13.5 2.9-3.9 7.4-10.6 9.9-15 2.5-4.4 5.9-11.8 7.6-16.5 1.7-4.7 4-12.3 5.2-17 1.8-7.2 2.1-11.3 2.1-27-0.1-16.5-0.3-19.5-2.6-28-1.4-5.2-4-13.1-5.7-17.5-1.8-4.4-5.1-11.1-7.3-15-2.3-3.8-5.9-9.5-8.1-12.5-2.2-3-7.9-9.3-12.6-14-4.7-4.7-12.4-11-17.1-14.1-4.7-3.1-11.3-7.1-14.7-8.8-3.5-1.7-10.2-4.4-15-6-4.9-1.6-12.6-3.6-17.3-4.5-4.7-0.8-12.1-1.6-16.5-1.9-4.4-0.2-12.1-0.1-17 0.4-4.9 0.4-13.3 1.9-18.5 3.2zm-118.5 41.8c2.8-0.1 5.2 0.1 5.5 0.3 0.3 0.3-1.1 4.1-3.1 8.3-2 4.3-5 11.9-6.7 16.8-1.7 4.9-4 13.3-5.1 18.5-1.1 5.2-2.5 14.9-3.1 21.5-0.7 8.2-0.7 15.7 0 23.5 0.5 6.3 1.6 15.1 2.5 19.5 0.8 4.4 2.7 11.8 4.1 16.5 1.4 4.7 4.6 13 7 18.5 2.4 5.5 4.4 10.4 4.4 11 0 0.6-3.5 0.8-9.7 0.3-7-0.4-12.7-1.6-19.8-3.9-6.9-2.3-12.6-5.1-18.5-9-4.7-3.1-11-8.3-14-11.6-3-3.4-6.2-7.2-7-8.7-1.5-2.6-1.4-2.8 3-7.2 2.5-2.6 7-6.3 10-8.3 3.1-2 10-5.4 15.3-7.6 5.3-2.2 9.7-4.3 9.7-4.7 0-0.5-1.5-1.6-3.2-2.7-1.8-1-5.5-4.3-8.2-7.2-2.7-3-6.4-8.5-8.2-12.4-2.3-4.6-3.7-9.5-4.3-14.5-0.6-4.5-0.6-10 0-13.7 0.5-3.5 1.7-8.4 2.7-11 1-2.7 3.8-7.7 6.2-11.1 2.5-3.5 6.8-8.1 9.5-10.2 2.8-2.1 7.6-5 10.8-6.4 3.1-1.4 7.8-3 10.4-3.5 2.7-0.5 7-0.9 9.8-1zm296.3-0.1c2.6 0 7.8 0.7 11.7 1.6 3.9 0.8 9.7 2.9 13 4.7 3.3 1.8 8.3 5.6 11.2 8.5 2.9 2.8 6.4 7.1 7.8 9.5 1.3 2.3 3.4 6.9 4.6 10.2 1.6 4.5 2.1 8.3 2.2 15.5 0 7.2-0.5 11-2.2 15.8-1.1 3.4-3.3 8.1-4.7 10.5-1.5 2.3-4.3 5.9-6.3 8.1-2 2.1-5.4 5.1-11.6 9.6l6 2.6c3.3 1.4 9.6 4.3 14 6.4q8 3.8 13.7 9.4c3.2 3.1 5.8 6.2 5.8 6.9 0 0.6-2 3.8-4.5 7-2.5 3.1-7.5 8.2-11.3 11.2-3.7 3.1-10.3 7.3-14.7 9.5-4.4 2.1-10.7 4.6-14 5.5-3.3 0.8-10.4 1.9-15.8 2.3-6.3 0.4-9.7 0.3-9.7-0.3 0-0.6 1.7-4.8 3.9-9.5 2.1-4.7 5.2-12.8 6.9-18 1.7-5.2 3.7-12.9 4.6-17 0.8-4.1 2-12.7 2.7-19 0.6-6.4 0.8-15.7 0.5-21-0.4-5.2-1.4-13.8-2.2-19-0.9-5.2-2.7-13.3-4.1-18-1.3-4.7-4.6-13.7-7.3-20-2.7-6.3-5-11.8-5-12.2 0-0.5 2.1-0.8 4.7-0.8z'
					/>
					<path
						id='Path 1'
						fill={theme.colors.blue[6]}
						d='m208.5 47c6 0 11.6 0.7 17 2 4.4 1.2 11.1 3.8 15 5.8 4.5 2.3 9.7 6.4 14.6 11.2 5.8 5.8 8.5 9.4 11.7 16 2.3 4.7 4.9 11.2 5.7 14.5 0.8 3.3 1.5 10.3 1.5 15.5 0 5.2-0.7 12.4-1.6 16-0.8 3.6-3.2 9.8-5.2 13.9-2.1 4.3-6.3 10.3-9.8 14-3.3 3.6-8.2 8.1-15.4 13.1l4.8 2.1c2.6 1.1 9 3.9 14.2 6.1 5.2 2.2 12 5.6 15 7.6 3 1.9 8.1 6.2 11.3 9.6 3.2 3.4 5.8 6.9 5.7 7.9 0 0.9-2.6 5-5.9 9-3.2 3.9-8.3 9.3-11.2 11.8-3 2.5-9 7-13.4 9.8-4.4 2.9-11.4 6.5-15.5 8.1-4.1 1.5-10.4 3.6-14 4.6-5.2 1.5-10 1.9-24.5 1.8-16.6 0-18.7-0.2-26.7-2.7-4.9-1.5-11.4-3.9-14.5-5.3-3.2-1.4-9.6-5.1-14.3-8.2-4.7-3.1-11.4-8.6-15-12.2-3.6-3.6-8-8.6-9.7-11.3-1.8-2.6-3.3-5.3-3.3-6 0.1-0.6 2-3.3 4.3-5.8 2.3-2.5 6.2-6.2 8.7-8.1 2.5-2 7.2-4.9 10.5-6.6 3.3-1.6 10.5-4.9 16-7.2 5.5-2.3 10.4-4.4 11-4.7 0.6-0.3-1.2-2-4-3.7-2.7-1.8-7.5-6-10.5-9.3-3-3.3-6.9-8.7-8.7-11.9-1.8-3.2-4.2-8.6-5.3-11.9-1.4-4-2.4-9.5-2.7-16.5-0.5-8.1-0.2-12.4 1.2-18.5 1-4.4 3.6-11.6 5.8-16 3-6 6-9.9 11.7-15.5 4.6-4.6 10.4-9 14.6-11.2 3.8-2.1 10.3-4.6 14.4-5.7 4.7-1.2 10.9-2 16.5-2.1z'
					/>
				</g>
				<path
					id='FastRecruiter'
					fill={theme.colorScheme === 'dark' ? '#ffff' : '#58595b'}
					aria-label='FastRecruiter'
					d='m442.8 209v-94.8h54.4v10.8h-41.6v28h37.6v10.7h-37.6v45.3zm106.2-35.7h-11.6q-14.1 0-19.6 3.2-5.4 3.2-5.4 11 0 6.3 4 9.9 4.1 3.7 11.2 3.7 9.7 0 15.5-6.9 5.9-6.9 5.9-18.3zm11.7-4.9v40.6h-11.7v-10.8q-4 6.5-9.9 9.6-6 3-14.6 3-10.9 0-17.4-6.1-6.4-6.1-6.4-16.4 0-12 8-18.1 8-6.1 24-6.1h16.3v-1.1q0-8.1-5.3-12.5-5.3-4.4-14.8-4.4-6.1 0-11.9 1.5-5.8 1.4-11.1 4.3v-10.8q6.4-2.4 12.4-3.6 6-1.3 11.8-1.3 15.4 0 23 8 7.6 8 7.6 24.2zm69.4-28.4v11q-5-2.5-10.3-3.8-5.3-1.2-11-1.2-8.7 0-13.1 2.6-4.3 2.7-4.3 8 0 4.1 3.1 6.4 3.1 2.3 12.5 4.4l4 0.9q12.4 2.7 17.6 7.6 5.3 4.8 5.3 13.5 0 9.9-7.9 15.7-7.8 5.7-21.5 5.7-5.7 0-11.9-1-6.2-1.2-13-3.4v-12.1q6.4 3.4 12.7 5.1 6.3 1.7 12.5 1.7 8.2 0 12.7-2.8 4.4-2.9 4.4-8 0-4.8-3.2-7.3-3.2-2.6-14.1-4.9l-4-1q-10.9-2.2-15.7-6.9-4.8-4.8-4.8-13.1 0-10 7.1-15.4 7.1-5.5 20.2-5.5 6.5 0 12.2 0.9 5.7 1 10.5 2.9zm22.2-22.3h11.8v20.2h24v9.1h-24v38.6q0 8.7 2.3 11.2 2.4 2.4 9.7 2.4h12v9.8h-12q-13.5 0-18.6-5-5.2-5.1-5.2-18.4v-38.6h-8.6v-9.1h8.6zm96.6 46.9q4.2 1.4 8 5.9 4 4.6 7.9 12.6l13 25.9h-13.8l-12.1-24.3q-4.7-9.5-9.1-12.7-4.4-3.1-12-3.1h-14v40.1h-12.8v-94.8h28.9q16.3 0 24.3 6.8 8 6.8 8 20.5 0 9-4.2 14.9-4.1 5.9-12.1 8.2zm-16-39.8h-16.1v33.6h16.1q9.3 0 14-4.3 4.8-4.3 4.8-12.6 0-8.3-4.8-12.5-4.7-4.2-14-4.2zm115.9 45.7v5.7h-53.7q0.7 12.1 7.2 18.4 6.6 6.3 18.2 6.3 6.7 0 13-1.6 6.3-1.7 12.5-5v11.1q-6.2 2.6-12.8 4-6.6 1.4-13.4 1.4-17 0-27-9.9-9.9-9.9-9.9-26.8 0-17.4 9.4-27.6 9.4-10.3 25.4-10.3 14.4 0 22.7 9.2 8.4 9.3 8.4 25.1zm-53.3-3.3l41.6-0.1q-0.1-9.6-5.4-15.3-5.2-5.7-13.8-5.7-9.8 0-15.7 5.5-5.9 5.5-6.7 15.6zm123.6-26.6v10.9q-4.9-2.7-10-4-4.9-1.4-10-1.4-11.3 0-17.6 7.2-6.3 7.2-6.3 20.2 0 13 6.3 20.3 6.3 7.1 17.6 7.1 5.1 0 10-1.3 5.1-1.4 10-4.1v10.8q-4.9 2.2-10.1 3.4-5.3 1.1-11.2 1.1-16 0-25.5-10.1-9.4-10.1-9.4-27.2 0-17.4 9.5-27.4 9.6-9.9 26.2-9.9 5.4 0 10.5 1.1 5.2 1.1 10 3.3zm61.5-3.8v12q-1.9-1.1-4.3-1.6-2.3-0.6-5.1-0.6-9.9 0-15.2 6.5-5.3 6.4-5.3 18.4v37.5h-11.7v-71.1h11.7v11q3.7-6.4 9.6-9.5 5.9-3.2 14.4-3.2 1.2 0 2.6 0.2 1.5 0.1 3.3 0.4zm11.1 44.1v-43h11.6v42.6q0 10.1 4 15.2 3.9 5 11.8 5 9.4 0 14.9-6.1 5.5-6 5.5-16.4v-40.3h11.7v71.1h-11.7v-10.9q-4.2 6.4-9.9 9.6-5.6 3.1-13 3.1-12.2 0-18.6-7.6-6.3-7.6-6.3-22.3zm29.4-44.7zm54.2 72.8v-71.1h11.6v71.1zm0-84v-14.8h11.7v14.8zm35.9-7.3h11.8v20.2h24v9.1h-24v38.6q0 8.7 2.3 11.1 2.5 2.5 9.8 2.5h11.9v9.8h-11.9q-13.6 0-18.7-5-5.2-5.1-5.2-18.4v-38.6h-8.5v-9.1h8.5zm112 52.8v5.7h-53.7q0.8 12.1 7.3 18.4 6.5 6.3 18.1 6.3 6.7 0 13-1.6 6.4-1.7 12.6-5v11.1q-6.3 2.6-12.9 4-6.6 1.4-13.4 1.4-17 0-27-9.9-9.9-9.9-9.9-26.8 0-17.4 9.4-27.7 9.5-10.2 25.5-10.2 14.3 0 22.6 9.2 8.4 9.2 8.4 25.1zm-53.3-3.4h41.6q-0.1-9.6-5.4-15.3-5.2-5.7-13.8-5.7-9.8 0-15.7 5.5-5.8 5.5-6.7 15.5zm113.6-30.3l0.1 12q-2-1.1-4.3-1.7-2.3-0.5-5.1-0.5-9.9 0-15.2 6.5-5.3 6.4-5.3 18.4v37.5h-11.8v-71.1h11.8v11q3.7-6.4 9.6-9.6 5.9-3.1 14.3-3.1 1.2 0 2.7 0.2 1.4 0.1 3.2 0.4z'
				/>
			</g>
		</svg>
	);
}