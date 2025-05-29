import { memo } from 'react';
import { useRouter } from 'next/navigation';

function Header({ ...props }) {
	const router = useRouter();

	return (
		<>
			<header className={`Header`}>
				Header
			</header>
		</>
	);
}

export default memo(Header);
