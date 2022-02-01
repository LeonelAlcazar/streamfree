import React from "react";
import { PageHeader, Button, Descriptions, Dropdown, Menu } from "antd";
import { useModals } from "../../providers/ModalsProvider";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import "./styles.css";
import config from "../../config";

function UserRender(props: { user: any; onLogout: CallableFunction }) {
	const menu = (
		<Menu>
			<Menu.Item>
				<Link to={`/u/${props.user.username}`}>My profile</Link>
			</Menu.Item>
			<Menu.Item disabled>
				<Link to="/stream">Start streaming</Link>
			</Menu.Item>
			<Menu.Item
				danger
				onClick={() => {
					props.onLogout();
				}}
			>
				Log out
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu}>
			<div className="user">
				<div className="user-info">
					<Link className="username" to={`/u/${props.user.username}`}>
						{props.user.fullname}
					</Link>
					<span>{props.user.username}</span>
				</div>
				<img
					src={`${config.RTPM_HTTP_ENDPOINT}/user_upload/${props.user.photo}`}
				/>
			</div>
		</Dropdown>
	);
}

export function Header() {
	const modalsContext = useModals();
	const AuthContext = useAuth();

	const openAuthModal = (mode: "login" | "signup") => {
		modalsContext?.dispatch({
			type: "set",
			newState: { auth: { visible: true, mode } },
		});
	};

	return (
		<PageHeader
			className="header"
			ghost={false}
			title="StreamFree"
			subTitle="The open source streaming platform"
			extra={
				AuthContext?.state.user ? (
					<UserRender
						user={AuthContext.state.user}
						onLogout={() => {
							AuthContext.state.LogOut();
						}}
					/>
				) : (
					[
						<Button
							key="2"
							onClick={() => {
								openAuthModal("login");
							}}
						>
							Log in
						</Button>,
						<Button
							key="1"
							type="primary"
							onClick={() => {
								openAuthModal("signup");
							}}
						>
							Sign up
						</Button>,
					]
				)
			}
		></PageHeader>
	);
}
