import React, {useState} from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

function Paginator({totalItemsCount, pageSize, currentPage, onPageChange, portionSize}) {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // portionCount - how many portions of pages we have
    // portionSize - how many pages in a portion, you can get it from state
    // lowerLimitOfCurrentPortion - a number of a page which is a lower bound of current portion of pages
    // upperLimitOfCurrentPortion - a number of a page which is an upper bound of current portion of pages
    // currentPortionNumber - a number of current portion of pages, used in useState
    // setCurrentPortionNumber - a function that can change a number of current portion of pages, used in useState
    // useState - a hook from react

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [currentPortionNumber, setCurrentPortionNumber] = useState(1);
    let lowerBoundOfCurrentPortion = (currentPortionNumber - 1) * portionSize + 1;
    let upperBoundOfCurrentPortion = currentPortionNumber * portionSize;

    return (
        <div className={styles.paginator}>

            {currentPortionNumber > 1 &&
            <button onClick={() => {setCurrentPortionNumber(currentPortionNumber - 1)}}>
                PREV
            </button>}

            {pages
                .filter(p => p >= lowerBoundOfCurrentPortion && p <= upperBoundOfCurrentPortion)
                .map(p => {
                    return (
                        <span className={cn({[styles.selectedPage] : currentPage === p}, styles.pageNumber)}
                              key={p}
                              onClick={(e) => {onPageChange(p)}}>
                            {p}
                        </span>
                    )
                })
            }

            {portionCount > currentPortionNumber &&
            <button onClick={() => {setCurrentPortionNumber(currentPortionNumber + 1)}}>
                NEXT
            </button>}
        </div>
    )
};

export default Paginator;