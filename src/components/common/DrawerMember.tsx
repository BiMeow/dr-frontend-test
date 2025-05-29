import { useStorage } from '@/components/context/StorageProvider';
import { Drawer, Select } from 'antd';
import { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

function DrawerMember({ ...props }) {
	const { openDrawerMember, setOpenDrawerMember, listMemberOrigin, setListMemberOrigin, activeDataMember } =
		useStorage();

	const onClose = () => {
		setOpenDrawerMember(false);
	};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<any>({ mode: 'all' });

	const onSubmitForm = async (dataForm: any) => {
		console.log('BiMeow log dataForm', dataForm);
		setListMemberOrigin([...listMemberOrigin, { ...dataForm, memId: 'BiMeow7998' }]);
		reset();
		onClose();
	};

	useEffect(() => {
		if (activeDataMember) {
			reset({
				name: activeDataMember.name,
				phone: activeDataMember.phone,
				email: activeDataMember.email,
				position: activeDataMember.position,
				status: activeDataMember.status,
				zone: activeDataMember.zone,
			});
		}
		return () => {};
	}, [activeDataMember]);

	return (
		<>
			<Drawer
				className={`cusDrawer DrawerMember`}
				title="Member"
				closable={{ 'aria-label': 'Close Button' }}
				onClose={onClose}
				open={openDrawerMember}
			>
				<form className="formMember space-y-[20px]" onSubmit={handleSubmit(onSubmitForm)}>
					<div className="itemForm relative">
						<label htmlFor="name" className="block">
							Họ tên
						</label>
						<input
							id="name"
							type="text"
							className="cusInputBorder"
							placeholder="Họ tên"
							{...register('name', { required: true })}
							disabled={activeDataMember}
						/>
						{errors?.email && <div className="errors">Vui lòng kiểm tra Họ tên!</div>}
					</div>
					<div className="itemForm relative">
						<label htmlFor="memId" className="block">
							Mã nhân viên
						</label>
						<input
							id="memId"
							type="text"
							defaultValue={activeDataMember?.memId}
							className="cusInputBorder"
							placeholder="Mã nhân viên"
							disabled
						/>
					</div>
					<div className="itemForm relative">
						<label htmlFor="phone" className="block">
							Số điện thoại
						</label>
						<input
							id="phone"
							type="tel"
							className="cusInputBorder"
							placeholder="Số điện thoại"
							{...register('phone', { required: true })}
							disabled={activeDataMember}
						/>
						{errors?.email && <div className="errors">Vui lòng kiểm tra Số điện thoại!</div>}
					</div>
					<div className="itemForm relative">
						<label htmlFor="email" className="block">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="cusInputBorder"
							placeholder="Email"
							{...register('email', { required: true })}
							disabled={activeDataMember}
						/>
						{errors?.email && <div className="errors">Vui lòng kiểm tra Email!</div>}
					</div>
					<div className="itemForm relative">
						<label htmlFor="position" className="block">
							Chức vụ
						</label>
						<input
							id="position"
							type="text"
							className="cusInputBorder"
							placeholder="Chức vụ"
							{...register('position', { required: true })}
							disabled={activeDataMember}
						/>
						{errors?.email && <div className="errors">Vui lòng kiểm tra Chức vụ!</div>}
					</div>
					<div className="itemForm relative">
						<label htmlFor="email" className="block">
							Trạng thái hợp lệ
						</label>
						<Controller
							name="status"
							control={control}
							rules={{
								required: true,
							}}
							render={({ field }) => (
								<Select
									{...field}
									options={[
										{ value: 'active', label: 'Đang hoạt động' },
										{ value: 'unactive', label: 'Chưa kích hoạt' },
										{ value: 'lock', label: 'Đã khóa tài khoản' },
									]}
									className="cusSelect w-full"
									placeholder="Trạng thái"
									onChange={(e: any) => {
										field.onChange(e);
									}}
									disabled={activeDataMember}
								/>
							)}
						/>
						{errors?.status && <p className="errors">Vui lòng kiểm tra Trạng thái hợp lệ!</p>}
					</div>
					<div className="itemForm relative">
						<label htmlFor="email" className="block">
							Vùng
						</label>
						<Controller
							name="zone"
							control={control}
							rules={{
								required: true,
							}}
							render={({ field }) => (
								<Select
									{...field}
									options={[
										{ value: 'Bình Tân', label: 'Bình Tân' },
										{ value: 'Quận 7', label: 'Quận 7' },
									]}
									className="cusSelect w-full"
									placeholder="Vùng"
									onChange={(e: any) => {
										field.onChange(e);
									}}
									disabled={activeDataMember}
								/>
							)}
						/>
						{errors?.status && <p className="errors">Vui lòng kiểm tra Vùng!</p>}
					</div>
					{!activeDataMember && (
						<button type="submit" className="btnMain w-full">
							Tạo
						</button>
					)}
				</form>
			</Drawer>
		</>
	);
}

export default memo(DrawerMember);
