'use client';

import Preloader from '@/components/common/Preloader';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';

export default function DefaultLayout({ children, locale }: { children?: React.ReactNode; locale?: any }) {
	return (
		<>
			<Preloader />

			<div className="mainPage relative flex h-dvh w-screen">
				<Header />
				<div className="pageContent w-[calc(100dvh-92px)]">{children}</div>
				{/* <Footer /> */}
			</div>
		</>
	);
}
