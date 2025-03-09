import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "gatsby";
import * as styles from './SocialLinkIcon.module.css';

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
    <Box className={styles.socialLinkIcon}>
      <Link
        to={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <Box className={styles.icon} style={{ boxShadow: `0 5px 15px rgba(0, 0, 0, 0.1), 0 0 10px ${hoverColor}20` }}>
          {icon}
        </Box>
        {name && (
          <Text className={styles.name} style={{ color: hoverColor }}>
            {name}
          </Text>
        )}
      </Link>
    </Box>
  );
};

export default SocialLinkIcon;
