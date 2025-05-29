'use client';

import { createContext, memo, useContext, useState } from 'react';

export const StorageContext = createContext<any>(null);

const StorageProvider = (props: any) => {
	const [isLoading, setIsLoading] = useState(true);

	//api call
	const [setting, setSetting] = useState();

	//drawer
	const [openDrawerMember, setOpenDrawerMember] = useState(false);
	const [activeDataMember, setActiveDataMember] = useState();

	//list member
	const [listMemberOrigin, setListMemberOrigin] = useState<any>([]);
	const [listMemberFilter, setListMemberFilter] = useState<any>([]);

	return (
		<StorageContext.Provider
			value={{
				isLoading,
				setIsLoading,
				//api call
				setting,
				setSetting,
				//drawer
				openDrawerMember,
				setOpenDrawerMember,
				activeDataMember,
				setActiveDataMember,
				//list member
				listMemberOrigin,
				setListMemberOrigin,
				listMemberFilter,
				setListMemberFilter,
			}}
			{...props}
		></StorageContext.Provider>
	);
};

export default memo(StorageProvider);

export const useStorage = () => {
	const context = useContext(StorageContext);
	if (!context) {
		throw new Error('useStorage has to be used within <StorageContext.Provider>');
	}
	return context;
};
