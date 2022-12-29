import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';



type BasicRatingType = {
    grade: number
}

export const BasicRating: FC<BasicRatingType> = ({grade})=> {
    const [value, setValue] = React.useState<number | null>(grade);

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    );
}