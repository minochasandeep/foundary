import React from 'react';

// material-ui imports
import MuiTooltip from '@mui/material/Tooltip';

// local imports
import { TooltipProps } from './types';


const Tooltip: React.FC<TooltipProps> = ({ children, title, ...restProps }) => {
    return (
        <MuiTooltip
          title={title}
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: 'common.black',
              },
            },
          }}
            {...restProps}
        >
          {children}
        </MuiTooltip>
    );
};

export default Tooltip;