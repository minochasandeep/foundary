import React from 'react';

// material-ui imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// local imports
import { TitleProps } from './types';


const Title: React.FC<TitleProps> = ({ title, summary }) => {
    return (
        <Box>
            <Typography variant="h1">{title}</Typography>
            {summary && <Typography variant="body1">{summary}</Typography>}
        </Box>
    );
};

export default Title;