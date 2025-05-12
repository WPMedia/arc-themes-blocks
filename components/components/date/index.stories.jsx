import Date from ".";

export default {
	title: "Components/Date",
	component: Date,
};

export const DateAndTime = {
	render: () => (
		<p>
			The concert starts at{" "}
			<Date dateTime="2018-03-05T20:00:00" dateString="March 5 at 8 at night" />.
		</p>
	),

	name: "Date and Time",
};

export const DateAndTimeWithNoTimezone = {
	render: () => (
		<p>
			Last Christmas
			<Date dateTime="2018-12-25T07:00:00" dateString="December 25 at 7 am" />, presents were opened
			in many places across the world!
		</p>
	),

	name: "Date and Time with no timezone",
};

export const DateOnly = {
	render: () => <Date dateTime="2018-03-05" dateString="March 5" />,
	name: "Date",
};

export const TimeOnly = {
	render: () => (
		<p>
			Every day at
			<Date dateTime="20:00:00" dateString="8" />, the show will be on.
		</p>
	),
};
