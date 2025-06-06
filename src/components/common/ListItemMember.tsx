import { IconView } from '@/components/common/Icon';
import TagStatus from '@/components/common/TagStatus';
import { useStorage } from '@/components/context/StorageProvider';
import { memo } from 'react';

function ListItemMember({ listMemberFilter, paginatedData, startIndex, ...props }: any) {
	const { setActiveDataMember, setOpenDrawerMember } = useStorage();
	return (
		<>
			<div className={`ListItemMember h-fit`}>
				{listMemberFilter?.length ? (
					<table className="tableItem w-full">
						<tr className="tableHeading bg-[#f9fafb]">
							<th className="itemTableHeading w-[4%]">STT</th>
							<th className="itemTableHeading w-[15%] !text-left">Họ tên</th>
							<th className="itemTableHeading w-[14%]">Mã nhân viên</th>
							<th className="itemTableHeading w-[14%]">Số điện thoại</th>
							<th className="itemTableHeading w-[8%]">Vùng</th>
							<th className="itemTableHeading w-[8%]">Chức vụ</th>
							<th className="itemTableHeading w-[16%]">Email</th>
							<th className="itemTableHeading w-[13%]">Trạng thái hợp lệ</th>
							<th className="itemTableHeading w-[8%]">Hành động</th>
						</tr>
						{paginatedData?.map((item: any, index: number) => (
							<tr
								className={`
								tableContent
								${index % 2 == 0 ? 'bg-white' : 'bg-[#f9fafb]'}
								`}
								key={index}
							>
								<td className="itemTableContent">{startIndex + index + 1}</td>
								<td className="itemTableContent !text-left">{item.name}</td>
								<td className="itemTableContent">{item.memId}</td>
								<td className="itemTableContent">{item.phone}</td>
								<td className="itemTableContent">{item.zone}</td>
								<td className="itemTableContent">{item.position}</td>
								<td className="itemTableContent">{item.email}</td>
								<td className="itemTableContent">
									<TagStatus status={item.status} />
								</td>
								<td className="itemTableContent">
									<div
										className="cursor-pointer text-[24px] !text-primary6 duration-300 hover:!text-primary2"
										onClick={() => {
											setActiveDataMember(item);
											setOpenDrawerMember(true);
										}}
									>
										<IconView />
									</div>
								</td>
							</tr>
						))}
					</table>
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
