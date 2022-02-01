import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import { LiveTag } from "../LiveTag";
import "./styles.css";

export function ExtendedVideo(props: { stream?: any }) {
	return (
		<div className="pre-video">
			<div className="thumbnail">
				<img
					src={`${config.RTPM_HTTP_ENDPOINT}/thumbnails/${props.stream.user.username}.png`}
				/>
			</div>

			<div className="video-info">
				<div className="user-info">
					<div>
						<img
							src={`${config.RTPM_HTTP_ENDPOINT}/user_upload/${props.stream.user.photo}`}
						/>
					</div>
					<div className="user-text">
						<Link
							to={"/u/" + props.stream.user.username}
							className="username"
						>
							{props.stream.user.username}
						</Link>
						<span className="viewers">
							{props.stream.viewers} viewers
						</span>
					</div>
				</div>
				<p>{props.stream.user.about}</p>
			</div>
			<LiveTag />
		</div>
	);
}
