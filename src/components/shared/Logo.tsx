import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "gatsby";

const Logo: React.FC = () => {
  return (
    <Box
      component={Link}
      to="/"
      className="logo"
      style={{
        background: "var(--mantine-primary-gradient)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 8s ease infinite",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        transition: "all 0.3s ease",
        transform: "scale(1) translateZ(0)",
        boxShadow: "0 0 20px rgba(61, 127, 255, 0.2)",
        "&:hover": {
          transform: "scale(1.1) translateZ(0)",
          boxShadow: "0 0 30px rgba(61, 127, 255, 0.3)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -2,
          background: "var(--mantine-primary-gradient)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 8s ease infinite",
          borderRadius: "50%",
          zIndex: -1,
          opacity: 0.5,
          filter: "blur(8px)",
        }
      }}
    >
      <Text
        className="logo-text"
        style={{
          color: "white",
          fontWeight: 900,
          fontSize: "1.5rem",
          textShadow: "0 2px 10px rgba(61, 127, 255, 0.3)",
        }}
      >
        R
      </Text>
    </Box>
  );
};

export default Logo;
