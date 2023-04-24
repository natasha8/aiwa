"use client";
import { Card, Text, Metric, Color } from "@tremor/react";

type Props = {
	title: string;
	metric: string;
	color?: Color;
};

const StatusCard = ({ title, metric, color }: Props) => {
	return (
		<Card decoration="top" decorationColor={color}>
			<Text>{title}</Text>
			<Metric>{metric}</Metric>
		</Card>
	);
};

export default StatusCard;
