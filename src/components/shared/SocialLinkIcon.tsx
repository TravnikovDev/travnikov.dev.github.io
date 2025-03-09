import React from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { Link } from "gatsby";

interface SocialLinkIconProps {
  icon: string;
  name?: string;
  url: string;
  hoverColor?: string;
}

const SocialLinkIcon: React.FC<SocialLinkIconProps> = ({ 
  icon, 
  name, 
  url,
  hoverColor = "#3D7FFF"
}) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: { duration: 0.2, type: "spring", stiffness: 500 },
      }}
    >
      <Link
        to={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Box
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.1), 0 0 10px ${hoverColor}20`,
            transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1), 0 0 20px ${hoverColor}40`,
            },
          }}
        >
          {icon}
        </Box>
        {name && (
          <Text
            size="sm"
            style={{
              fontWeight: 600,
              fontFamily: '"Cabinet Grotesk", sans-serif',
              color: hoverColor,
              transition: "color 0.2s ease",
            }}
          >
            {name}
          </Text>
        )}
      </Link>
    </motion.div>
  );
};

export default SocialLinkIcon;
