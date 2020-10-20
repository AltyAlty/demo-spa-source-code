import React from 'react';
import {create} from 'react-test-renderer';
import Paginator from './Paginator';

describe("Paginator component tests", () => {
    test("correct quantity of pages per a portion", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let spans = root.findAllByType("span");
        expect(spans.length).toBe(10);
    });

    test("if quantity of pages is more than 10, then the NEXT button should be displayed", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let button = root.findAllByType("button");
        expect(button.length).toBe(1);
    });
});