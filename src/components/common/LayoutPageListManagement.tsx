import DrawerMember from '@/components/common/DrawerMember';
import { IconArrow, IconPlus, IconSearch, IconUpload } from '@/components/common/Icon';
import ListItemMember from '@/components/common/ListItemMember';
import { useStorage } from '@/components/context/StorageProvider';
import useDebounce from '@/plugins/hooks/useDebounce';
import { Pagination, Select } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

let demoList = [
	{
		name: 'Olivia Rhye',
		memId: '#465462',
		phone: '0947211201',
		zone: 'Bình Tân',
		position: 'Nhân viên',
		email: 'abe@gmail.com',
		status: 'active',
	},
	{
		name: 'Phoenix Baker',
		memId: '#465462',
		phone: '0947211201',
		zone: 'Bình Tân',
		position: 'Giám sát',
		email: 'abe@gmail.com',
		status: 'unactive',
	},
	{
		name: 'Lana Steiner',
		memId: '#465462',
		phone: '0947211201',
		zone: 'Bình Tân',
		position: 'Giám sát',
		email: 'abe@gmail.com',
		status: 'lock',
	},
	{
		name: 'Demi Wilkinson',
		memId: '#465462',
		phone: '0947211201',
		zone: 'Bình Tân',
		position: 'Nhân viên',
		email: 'abe@gmail.com',
		status: 'lock',
	},
	{
		name: 'Candice Wu',
		memId: '#465462',
		phone: '0947211201',
		zone: 'Bình Tân',
		position: 'Giám sát',
		email: 'abe@gmail.com',
		status: 'lock',
	},
];

const ITEMS_PER_PAGE = 10;

function LayoutPageListManagement({ title, ...props }: any) {
	const router = useRouter();

	const { width, height } = useWindowSize();

	const { listMemberOrigin, setListMemberOrigin, listMemberFilter, setListMemberFilter, setOpenDrawerMember } =
		useStorage();

	const [heightTitle, setHeightTitle] = useState(0);
	const [heightFilter, setHeightFilter] = useState(0);
	const [heightPagin, setHeightPagin] = useState(0);
	const [curPage, setCurPage] = useState(1);
	const [filterText, setFilterText] = useState<any>();
	const [filterStatus, setFilterStatus] = useState<any>();
	const [filterZone, setFilterZone] = useState<any>();

	const debounceScreenWidth = useDebounce(width, 500);
	const debounceScreenHeight = useDebounce(height, 500);
	const debounceFilterText = useDebounce(filterText, 500);

	useEffect(() => {
		let title: any = document.querySelector('.LayoutPageListManagement h1');
		let filter: any = document.querySelector('.LayoutPageListManagement .wrapFilter');
		let pagin: any = document.querySelector('.LayoutPageListManagement .wrapPagin');

		if (title) {
			setHeightTitle(title.offsetHeight);
		}
		if (filter) {
			setHeightFilter(filter.offsetHeight);
		}
		if (pagin) {
			setHeightPagin(pagin.offsetHeight);
		}
	}, [debounceScreenWidth, debounceScreenHeight, listMemberOrigin]);

	const handleChangeStatus = (value: string) => {
		setFilterStatus(value);
	};

	const handleChangeZone = (value: string) => {
		setFilterZone(value);
	};

	useEffect(() => {
		let listFiltered = listMemberOrigin;

		if (filterText) {
			listFiltered = listFiltered.filter((item: any) =>
				item?.name?.toLowerCase().includes(filterText.toLowerCase())
			);
		}

		if (filterStatus) {
			listFiltered = listFiltered.filter((item: any) => item.status === filterStatus);
		}

		if (filterZone) {
			listFiltered = listFiltered.filter((item: any) => item.zone === filterZone);
		}

		setListMemberFilter(listFiltered);

		return () => {};
	}, [listMemberOrigin, filterText, filterStatus, filterZone]);

	const startIndex = (curPage - 1) * ITEMS_PER_PAGE;
	const paginatedData = listMemberFilter.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	return (
		<>
			<motion.div
				className={`LayoutPageListManagement relative h-full`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<h1 className="p-[16px] text-[24px] font-bold">{title}</h1>

				<div className="wrapContent bg-[#f6f7f9] p-[16px]" style={{ height: `calc(100% - ${heightTitle}px` }}>
					<div className="content size-full rounded-[10px] bg-white">
						<div className="wrapFilter border-b border-gray2 px-[24px] py-[16px]">
							<div className="flex items-center justify-end gap-[16px]">
								{!!listMemberOrigin?.length && (
									<>
										<div className="search flex w-full items-center gap-[8px] rounded-[8px] border border-gray3 px-[12px] py-[8px]">
											<IconSearch className="text-[20px] text-gray6" />
											<input
												value={filterText}
												type="text"
												className="cusInput"
												placeholder="Tìm kiếm"
												onChange={(e) => setFilterText(e.target.value)}
											/>
										</div>
										<div className="h-[24px] w-[1px] bg-gray3"></div>
									</>
								)}

								{!!listMemberOrigin?.length && (
									<>
										<div className="btnOutline flexCenter gap-[8px]">
											<p>Tải lên nhân viên</p>
											<IconUpload className="text-[20px]" />
										</div>
										<div className="btnOutline flexCenter gap-[8px]">
											<p>Xuất danh sách tài khoản</p>
											<IconUpload className="text-[20px]" />
										</div>
									</>
								)}
								<div className="btnMain flexCenter gap-[8px]" onClick={() => setOpenDrawerMember(true)}>
									<p>Tạo mới</p>
									<IconPlus className="text-[20px]" />
								</div>
							</div>
							{!!listMemberOrigin?.length && (
								<div className="mt-[12px] flex items-center gap-[12px]">
									<p className="font-semibold">Bộ lọc:</p>
									<Select
										className="cusSelect h-auto w-[120px]"
										placeholder="Trạng thái"
										value={filterStatus}
										onChange={handleChangeStatus}
										options={[
											{ value: 'active', label: 'Đang hoạt động' },
											{ value: 'unactive', label: 'Chưa kích hoạt' },
											{ value: 'lock', label: 'Đã khóa tài khoản' },
										]}
										suffixIcon={<IconArrow className="-rotate-90 text-[16px]" />}
									/>
									<Select
										className="cusSelect h-auto w-[120px]"
										placeholder="Vùng"
										value={filterZone}
										onChange={handleChangeZone}
										options={[
											{ value: 'Bình Tân', label: 'Bình Tân' },
											{ value: 'Quận 7', label: 'Quận 7' },
										]}
										suffixIcon={<IconArrow className="-rotate-90 text-[16px]" />}
									/>
									<div
										className="btnOutline ml-auto"
										onClick={() => {
											setFilterText(null);
											setFilterStatus(null);
											setFilterZone(null);
										}}
									>
										Clear
									</div>
								</div>
							)}
						</div>

						<div
							className="listItem overflow-auto"
							style={{ height: `calc(100% - ${heightFilter}px - ${heightPagin}px` }}
							data-lenis-prevent
						>
							<ListItemMember
								listMemberFilter={listMemberFilter}
								paginatedData={paginatedData}
								startIndex={startIndex}
							/>
						</div>

						<div className="wrapPagin flex items-center justify-between border-t border-gray2 px-[24px] py-[18px]">
							<p>
								Hiển thị <span className="font-semibold text-primary6">10</span> nhân viên
							</p>

							{!!listMemberFilter.length && (
								<Pagination
									className="cusPagin"
									current={curPage}
									pageSize={ITEMS_PER_PAGE}
									total={listMemberFilter.length}
									prevIcon={<IconArrow className="text-[20px]" />}
									nextIcon={<IconArrow className="rotate-180 text-[20px]" />}
									showSizeChanger={false}
									onChange={(e) => setCurPage(e)}
								/>
							)}
						</div>
					</div>
				</div>

				<div
					className="btnMain absolute bottom-0 left-1/2 -translate-x-1/2"
					onClick={() => setListMemberOrigin([...listMemberOrigin, ...demoList])}
				>
					Add 5 items
				</div>
			</motion.div>

			<DrawerMember />
		</>
	);
}

export default memo(LayoutPageListManagement);
