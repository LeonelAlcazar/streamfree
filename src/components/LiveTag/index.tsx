import { Tag } from "antd";

export function LiveTag() {
	return (
		<Tag
			color={"error"}
			style={{ position: "absolute", top: "0.5rem", left: "0.5rem" }}
		>
			LIVE
		</Tag>
	);
}
