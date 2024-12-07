import Box from "@mui/material/Box";
import { LinearProgress, Typography } from "@mui/material";
import { ProgressBarProps } from "./types";

const ProgressBar: React.FC<ProgressBarProps> = ({
    progressUptime,
    progressHealth,
    llMinutes,
    ulMinutes,
    title = "Safety Score",
    uptimeLabel = "Uptime",
    healthLabel = "Health",
    llMinutesLabel = "LL Minutes",
    ulMinutesLabel = "UL Minutes",
    sx = {}
}) => {
    return (
        <Box p={1} borderRadius={"8px"} mb={2} mt={2} sx={{ bgcolor: "grey.300", margin: "5px", ...sx }}>
            <Typography color={"grey.700"} mb={1} fontSize={14}>{title}</Typography>
            {[
                { value: progressUptime, label: uptimeLabel, color: "error.main" },
                { value: progressHealth, label: healthLabel, color: "success.main" }
            ].map((progress, index) => (
                <Box key={index} display="flex" alignItems="center" position="relative" mb={1}>
                    <LinearProgress
                        variant="determinate"
                        value={progress.value}
                        sx={{
                            height: 60,
                            bgcolor: "grey.400",
                            borderRadius: "4px",
                            flexGrow: 1,
                            '& .MuiLinearProgress-bar': { backgroundColor: progress.color },
                            ...sx
                        }}
                    />
                    <Typography
                        color={"#FDFFFF"}
                        top={"35%"}
                        left={"5%"}
                        position="absolute"
                        sx={{ fontWeight: "bold", transform: "translate(-50%, -50%)",...sx }}
                    >
                        {`${progress.value}%`}
                    </Typography>
                    <Typography
                        top={"70%"}
                        left={"5%"}
                        fontSize={13}
                        position="absolute"
                        color={"#F0EAD6"}
                        sx={{ 
                            transform: "translate(-50%, -50%)",
                            filter: "blur(0.3px)",
                            ...sx 
                        }}
                    >
                        {progress.label}
                    </Typography>
                </Box>
            ))}
            <Box display="flex" justifyContent="space-between" width="100%">
                {[
                    { label: llMinutesLabel, value: llMinutes },
                    { label: ulMinutesLabel, value: ulMinutes }
                ].map((item, index) => (
                    <Box key={index} display="flex" flexDirection="column">
                        <Typography marginLeft={index === 0 ? "15px" : "0"} marginRight={index === 1 ? "350px" : "0"} color={"text.secondary"}>
                            {item.label}
                        </Typography>
                        <Typography marginLeft={index === 0 ? "15px" : "0"} marginRight={index === 1 ? "375px" : "0"} color={"text.primary"} fontWeight={"bold"}>
                            {item.value}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ProgressBar;