import React from 'react';
import s from "./Filters.module.css"
import {SearchInput} from "./search/SearchInput";
import {SelectAllOrMyPacks} from "./selectAllMy/SelectAllOrMyPacks";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import {ResetFilters} from "./resetFilters/ResetFilters";

export const Filters = () => {
    return (
        <div className={s.filters}>
            <div className={s.inputSearch}>
                Search
                <SearchInput type={'pack'}/>
            </div>

            <div className={s.selectMyOrAll}>
                Show packs cards
                <SelectAllOrMyPacks/>
            </div>

            <div className={s.range}>
                Number of cards
                <RangeSlider type={'pack'}/>
            </div>

            <div>
                <ResetFilters type={'pack'}/>
            </div>
        </div>
    );
};
