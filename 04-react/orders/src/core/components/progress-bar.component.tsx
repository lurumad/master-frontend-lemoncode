import { Box, LinearProgress, Typography } from "@mui/material";

interface ProgressBarProps {
  value: number;
  width?: number;
}

export const ProgressBar = ({ value, width }: ProgressBarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: width ?? "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            width: "100%",
            height: 20,
            borderRadius: 5,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              backgroundColor: calculateColor(value),
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {`${value.toFixed(1)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const calculateColor = (validPercentage: number): string => {
  if (validPercentage <= 20) return "#D32F2F";
  if (validPercentage <= 40) return "#F57C00";
  if (validPercentage <= 60) return "#FBC02D";
  if (validPercentage <= 80) return "#7CB342";
  return "#2E7D32";
};
