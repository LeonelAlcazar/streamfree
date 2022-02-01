import { Button, Tag, Input, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserByUsername } from "../../hooks/useUserByUsername";
import "./styles.css";
import videojs from "video.js";
import Cookies from "js-cookie";
import socketIOClient from "socket.io-client";
import { MessageOutlined } from "@ant-design/icons";
import config from "../../config";

const WS_ENDPOINT = config.WS_ENDPOINT;

function OnlineStream(props: { user: any }) {
	const videoNode: any = useRef(null);
	const [player, setPlayer]: [any, any] = useState(null);
	useEffect(() => {
		if (props.user) {
			let p = videojs(
				videoNode.current,
				{
					autoplay: false,
					controls: true,
					sources: [
						{
							src:
								config.RTPM_HTTP_ENDPOINT +
								"/live/" +
								props.user.username +
								"/index.m3u8",
							type: "application/x-mpegURL",
						},
					],
					fluid: true,
				},
				() => {
					console.log("Player ready");
				}
			);
			setPlayer(p);
		}

		return () => {
			if (player) {
				player.dispose();
			}
		};
	}, [props.user]);

	return (
		<div className="stream online">
			<video
				ref={videoNode}
				className="video-js vjs-big-play-centered streaming-video"
			/>
		</div>
	);
}

function OfflineStream(props: { user: any }) {
	const videoNode: any = useRef(null);
	const [player, setPlayer]: [any, any] = useState(null);

	return (
		<div className="stream">
			<div className="text-container">
				<Tag>OFFLINE</Tag>
				<h1>
					{props.user?.fullname} is not online.
					<br />
					You can see other creators :)
				</h1>
			</div>
		</div>
	);
}

function Message(props: { message: any }) {
	return (
		<div className="message">
			<div>
				<img
					src={`${config.RTPM_HTTP_ENDPOINT}/user_upload/${props.message.from.photo}`}
				/>
			</div>
			<div className="message-text">
				<Link
					className="username"
					to={`/u/${props.message.from.username}`}
				>
					{props.message.from.username}
				</Link>
				<p>{props.message.message}</p>
			</div>
		</div>
	);
}

export function User(props: any) {
	const { username } = useParams();
	const [user] = useUserByUsername(username || "");
	const [message, setMessage] = useState("");
	const [messages, setMessages]: [any[], any] = useState([]);
	const [Socket, setSocket]: [any, any] = useState(null);
	const [isChatActive, setIsChatActive] = useState(false);

	const [viewers, setViewers] = useState(0);

	useEffect(() => {
		const socket = socketIOClient(WS_ENDPOINT);
		socket.emit("stream:suscribe", { streamID: username });
		socket.on("stream:info", (info) => {
			setViewers(info.viewers);
		});
		socket.on("stream:connection", (data) => {
			console.log("connection");
			setViewers((viewers) => viewers + 1);
		});
		socket.on("stream:disconnection", (data) => {
			setViewers((viewers) => viewers - 1);
		});
		socket.on("stream:message", (data: any) => {
			console.log("new");
			console.log(data, messages);
			setMessages((prev: any[]) => [data, ...prev]);
		});
		setSocket(socket);
		return () => {
			socket?.close();
		};
	}, [username]);

	const sendMessage = () => {
		if (message.trim() === "") {
			return;
		}
		const token = Cookies.get("sessionToken");
		console.log("TOKEN", token);
		Socket.emit("stream:message", {
			token: token,
			message,
		});

		setMessage("");
	};

	return (
		<div className="userpage">
			<div
				className={
					"chat-button " + (isChatActive ? "active" : "desactive")
				}
				onClick={() => setIsChatActive(!isChatActive)}
			>
				<MessageOutlined />
			</div>
			<section className="usersection">
				{user?.status == "online" ? (
					<OnlineStream user={user} />
				) : (
					<OfflineStream user={user} />
				)}
				<div className="user">
					<div>
						<img
							src={`${config.RTPM_HTTP_ENDPOINT}/user_upload/${user?.photo}`}
						/>
					</div>
					<div className="user-right">
						<div className="user-info">
							<h1>{user?.fullname}</h1>
							<span>{user?.username}</span>
						</div>
						<div className="user-actions">
							<span>{viewers} viewers</span>
						</div>
					</div>
				</div>
				<div className="description">
					<p>{user?.about}</p>
				</div>
			</section>
			<section
				className={
					"chat-section " + (isChatActive ? "active" : "desactive")
				}
			>
				<header>
					<h2>Live chat</h2>
				</header>
				<div className="message-list">
					{messages.length > 0 &&
						messages.map((msg) => <Message message={msg} />)}
				</div>
				<footer>
					<Form
						className="chat-form"
						onFinish={(values) => sendMessage()}
					>
						<Input
							placeholder="message"
							name="message"
							value={message}
							onChange={(e) => {
								setMessage(e.currentTarget.value);
							}}
						/>
						<Button type="primary" htmlType="submit">
							SEND
						</Button>
					</Form>
				</footer>
			</section>
		</div>
	);
}
