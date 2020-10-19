import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="test" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test");
    });

    test("having been created, span should be displayed", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after span creating, input should be displayed", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        expect(() => {
            const input = root.findByType("input");
        }).toThrow();
    });

    test("having been created, span should contain correct status", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("test");
    });

    test("after enabling editMode, input should be displayed instead of span", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        expect(input.props.value).toBe("test");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="test" updateUserStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});