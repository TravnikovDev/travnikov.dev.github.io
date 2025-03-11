import React, { useState } from "react";
import { Box, Text } from "@mantine/core";
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
  hoverColor = "#21E6C1" // Default to electric cyan
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Box className={styles.socialLinkIcon}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box 
          className={styles.icon} 
          style={{ 
            boxShadow: isHovered 
              ? `0 0 15px ${hoverColor}80, 0 0 30px ${hoverColor}40` 
              : `0 0 10px ${hoverColor}30`,
            backgroundColor: isHovered ? `${hoverColor}20` : 'transparent',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)'
          }}
        >
          {icon}
        </Box>
        {name && (
          <Text 
            className={styles.name} 
            style={{ 
              color: hoverColor,
              opacity: isHovered ? 1 : 0.8,
              textShadow: isHovered ? `0 0 8px ${hoverColor}60` : 'none'
            }}
          >
            {name}
          </Text>
        )}
      </a>
    </Box>
  );
};

export default SocialLinkIcon;
