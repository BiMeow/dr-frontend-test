'use client';
import LayoutPageListManagement from '@/components/common/LayoutPageListManagement';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

function PageProject({ ...props }) {
	const router = useRouter();

	return (
		<>
			<LayoutPageListManagement title="Quản lý danh sách Project" />
		</>
	);
}

export default memo(PageProject);
