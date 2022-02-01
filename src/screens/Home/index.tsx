import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExtendedVideo } from "../../components/ExtendedVideo";
import { LiveTag } from "../../components/LiveTag";
import { Video } from "../../components/Video";
import { useStreams } from "../../hooks/useStreams";
import "./style.css";

export function Home() {
	const [count, setCount] = useState([1, 2]);
	const [streams] = useStreams();

	if (streams.length === 0) {
		return (
			<div>
				<h1>Nothing here...</h1>
			</div>
		);
	}

	return (
		<div>
			<section className="big-video">
				<div className="big-video-wrapper">
					<ExtendedVideo stream={streams[0]} />
				</div>
			</section>
			<section className="videos">
				{streams.length > 0 &&
					streams.map((stream) => (
						<div className="video-list-wrapper">
							<div className="height-wrapper">
								<Video stream={stream} />
							</div>
						</div>
					))}
			</section>
		</div>
	);
}
