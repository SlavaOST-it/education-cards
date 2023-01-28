import React, {FC} from 'react';
import Rating from '@mui/material/Rating';


type BasicRatingType = {
    grade: number
}

export const BasicRating: FC<BasicRatingType> = ({grade}) => {

    return (
        <Rating
            name="simple-controlled"
            value={grade}
        />
    );
}