import { Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import { LiveTag } from "../LiveTag";
import "./styles.css";

export function Video(props: { stream?: any }) {
	return (
		<article className="video">
			<div className="thumbnail-wrapper">
				<img
					className="thumbnail"
					src={`${config.RTPM_HTTP_ENDPOINT}/thumbnails/${props.stream.user.username}.png`}
				/>
				<LiveTag />
				<Tag
					style={{
						position: "absolute",
						left: "0.5rem",
						bottom: "0.5rem",
					}}
				>
					{props.stream.viewers} viewers
				</Tag>
			</div>
			<div className="info">
				<img
					src={`${config.RTPM_HTTP_ENDPOINT}/user_upload/${props.stream.user.photo}`}
				/>
				<div className="info-text">
					<Link
						to={`/u/${props.stream.user.username}`}
						className="title"
					>
						{props.stream.user.title}
					</Link>
					<Link
						to={`/u/${props.stream.user.username}`}
						className="username"
					>
						{props.stream.user.username}
					</Link>
				</div>
			</div>
		</article>
	);
}
