import React from 'react';
import Box from "@mui/material/Box";
import { Slider, Typography } from "@mui/material";
import { SliderBarProps } from './types';


const SliderBar: React.FC<SliderBarProps> = ({
    setPoint,
    handleChange,
    min,
    max,
    step = 1,
    title,
    lowerLimitLabel = "Lower Limit",
    setPointLabel = "Set point",
    upperLimitLabel = "Upper Limit",
    lowerLimitCount,
    sx,
}) => {
    return (
        <Box p={1} borderRadius={"8px"} mb={6} mt={2} sx={{ bgcolor: "grey.300", margin: "5px", ...sx }}>
            <Typography color={"grey.700"} fontSize={13}>{title}</Typography>
            <Box sx={{ height: 65 }} mb={4} mt={1}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    {[
                        { label: lowerLimitLabel, value: `${min} F`, sx: { transform: 'translateX(-80%)', } },
                        { label: setPointLabel, value: setPoint, sx: {} },
                        { label: upperLimitLabel, value: `${max} F`, sx: { transform: 'translateX(80%)' } },
                    ].map((item, index) => (
                        <Box key={index} display="flex" flexDirection="column" alignItems="center">
                            <Typography fontSize={"15px"} color={"text.secondary"}>{item.label} </Typography>
                            <Typography color={"text.primary"} fontWeight={"bold"} fontSize={"1rem"} sx={item.sx}>{item.value}</Typography>
                        </Box>
                    ))}
                </Box>
                <Slider
                    value={setPoint}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                    sx={{
                        '& .MuiSlider-thumb': {
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: '13px solid #FFFFFF',
                            borderRadius: '0px',
                            backgroundColor: 'unset',
                            transform: 'translate(-50%,-20px)',
                            boxShadow: 'none',
                            outline: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                            },
                        },
                        '& .MuiSlider-track': {
                            color: 'transparent',
                            height: '45px',
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.5,
                            height: '40px',
                            background: 'linear-gradient(to right, #00b2ff,#00b2ff,#00bfff,#2785ff,#9900b7,#ff00b7,#ff0029,#ff3b00, #ff2300,#ff2300)',
                            borderBottom: '12.5px solid #FFFFFF',
                            borderBottomColor:'linear-gradient(to right, #FFFFFF,red,red,#FFFFFF)1',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: '40px',
                                top: 0,
                                bottom: 0,
                                borderLeft: '2.5px dotted black',
                            },
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                right: '40px',
                                top: 0,
                                bottom: 0,
                                borderRight: '2.5px dotted black',
                            },
                        },                       
                        ...sx,
                    }}
                />
            </Box>
            <Typography fontSize={"14px"} mt={1} color={"grey.700"} > Lower limit passed {lowerLimitCount} times in the last 24 hours
            </Typography>
        </Box>
    );
};

export default SliderBar;