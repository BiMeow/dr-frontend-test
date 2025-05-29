import { IconView } from '@/components/common/Icon';
import TagStatus from '@/components/common/TagStatus';
import { useStorage } from '@/components/context/StorageProvider';
import { memo } from 'react';

function ListItemMember({ listMemberFilter, paginatedData, startIndex, ...props }: any) {
	const { setActiveDataMember, setOpenDrawerMember } = useStorage();
	return (
		<>
			<div className={`ListItemMember h-full`}>
				{listMemberFilter?.length ? (
					<div className="tableItem">
						<div className="tableHeading grid grid-cols-[4%_15%_14%_14%_8%_8%_16%_13%_8%] bg-[#f9fafb]">
							<p className="itemTableHeading">STT</p>
							<p className="itemTableHeading !text-left">Họ tên</p>
							<p className="itemTableHeading">Mã nhân viên</p>
							<p className="itemTableHeading">Số điện thoại</p>
							<p className="itemTableHeading">Vùng</p>
							<p className="itemTableHeading">Chức vụ</p>
							<p className="itemTableHeading">Email</p>
							<p className="itemTableHeading">Trạng thái hợp lệ</p>
							<p className="itemTableHeading">Hành động</p>
						</div>
						{paginatedData?.map((item: any, index: number) => (
							<div
								className={`
											tableContent grid grid-cols-[4%_15%_14%_14%_8%_8%_16%_13%_8%] 
											${index % 2 == 0 ? 'bg-white' : 'bg-[#f9fafb]'}
											`}
								key={index}
							>
								<p className="itemTableContent">{startIndex + index + 1}</p>
								<p className="itemTableContent !text-left">{item.name}</p>
								<p className="itemTableContent">{item.memId}</p>
								<p className="itemTableContent">{item.phone}</p>
								<p className="itemTableContent">{item.zone}</p>
								<p className="itemTableContent">{item.position}</p>
								<p className="itemTableContent">{item.email}</p>
								<p className="itemTableContent">
									<TagStatus status={item.status} />
								</p>
								<div className="itemTableContent">
									<div
										className="cursor-pointer text-[24px] !text-primary6 duration-300 hover:!text-primary2"
										onClick={() => {
											setActiveDataMember(item);
											setOpenDrawerMember(true);
										}}
									>
										<IconView />
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="nodata absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<img
							src="/images/nodata.png"
							alt="DR Frontend Test No Data"
							className={`mx-auto w-[140px]`}
							width={0}
							height={0}
							sizes="100vw"
						/>
						<p className="text-center text-[24px] text-gray4">Danh sách trống</p>
					</div>
				)}
			</div>
		</>
	);
}

export default memo(ListItemMember);
