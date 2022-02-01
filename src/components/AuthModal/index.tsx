import { Form, Input, Modal, ModalProps, Tabs } from "antd";
import React, { useState } from "react";
import { GetUser } from "../../actions/get-user-action";
import { RegisterUser } from "../../actions/register-user-action";
import { useAuth } from "../../providers/AuthProvider";
import { useModals } from "../../providers/ModalsProvider";

const { TabPane } = Tabs;

export function AuthModal(props: ModalProps & { mode: "login" | "signup" }) {
	const [loading, setLoading] = useState(false);
	const [loginForm] = Form.useForm();
	const [registerForm] = Form.useForm();

	const [error, setError] = useState("");

	const contextModals = useModals();
	const contextAuth = useAuth();

	const closeModal = () => {
		contextModals?.dispatch({
			type: "set",
			newState: { auth: { visible: false, mode: props.mode } },
		});
	};

	const changeMode = (mode: string) => {
		contextModals?.dispatch({
			type: "set",
			newState: { auth: { visible: true, mode: mode } },
		});
	};

	const login = (values: any) => {
		setLoading(true);
		contextAuth?.state
			.Authenticate(values.email, values.password)
			.then((data: any) => closeModal())
			.catch((e: any) => {
				setError(e.response.data.body);
			})
			.finally(() => setLoading(false));
	};
	const register = (values: any) => {
		setLoading(true);
		RegisterUser(values)
			.then((data) => {
				setError("User registered!");
				contextModals?.dispatch({
					type: "set",
					newState: { auth: { visible: true, mode: "login" } },
				});
				registerForm.resetFields();
			})
			.catch((e: any) => {
				setError(e.response.data.body);
			})
			.finally(() => setLoading(false));
	};

	return (
		<Modal
			{...props}
			title={
				props.mode == "login"
					? "Access to StreamFree"
					: "Join to StreamFree"
			}
			onCancel={closeModal}
			onOk={
				props.mode == "login"
					? () => loginForm.submit()
					: () => registerForm.submit()
			}
			confirmLoading={loading}
		>
			<Tabs
				activeKey={props.mode}
				onChange={console.log}
				onTabClick={(key) => {
					changeMode(key);
				}}
			>
				<TabPane tab="Log in" key="login">
					<Form form={loginForm} onFinish={login}>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your email!",
								},
							]}
						>
							<Input type="email" />
						</Form.Item>
						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input type="password" />
						</Form.Item>
					</Form>
					<p>{error}</p>
				</TabPane>
				<TabPane tab="Sign up" key="signup">
					<Form form={registerForm} onFinish={register}>
						<Form.Item
							label="Full name"
							name="fullname"
							rules={[
								{
									required: true,
									message: "Please input your name!",
								},
							]}
						>
							<Input type="email" />
						</Form.Item>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your email!",
								},
							]}
						>
							<Input type="email" />
						</Form.Item>
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
								{
									pattern:
										/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
									message: "Invalid username",
								},
							]}
						>
							<Input type="email" />
						</Form.Item>
						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input type="password" />
						</Form.Item>
					</Form>
				</TabPane>
			</Tabs>
		</Modal>
	);
}
