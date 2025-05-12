import { render, screen } from "@testing-library/react";
import LazyLoad from "./index";

const TestComponent = () => <div data-testid="test-component">TEST</div>;

describe("LazyLoad Block", () => {
	it("renders only child components when no props provided", () => {
		render(
			<LazyLoad>
				<TestComponent />
			</LazyLoad>
		);
		expect(screen.getByTestId("test-component")).not.toBeNull();
	});

	it("renders only child components when disabled", () => {
		render(
			<LazyLoad enabled={false}>
				<TestComponent />
			</LazyLoad>
		);
		expect(screen.getByTestId("test-component")).not.toBeNull();
	});

	it("renders child components when enabled with default config", () => {
		render(
			<LazyLoad enabled>
				<TestComponent />
			</LazyLoad>
		);
		expect(screen.getByTestId("test-component")).not.toBeNull();
	});

	it("renders child components when enabled with custom config", () => {
		const config = {
			offsetTop: 400,
			offsetBottom: 200,
			offsetLeft: 20,
			offsetRight: 30,
			throttle: 50,
			renderPlaceholder: (ref) => <div ref={ref} />,
		};
		render(
			<LazyLoad enabled {...config}>
				<TestComponent />
			</LazyLoad>
		);
		expect(screen.getByTestId("test-component")).not.toBeNull();
	});
});
