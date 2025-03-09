import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "gatsby";
import * as styles from './Logo.module.css';

const Logo: React.FC = () => {
  return (
    <Box
      component={Link}
      to="/"
      className={styles.logo}
    >
      <Text
        className={styles.logoText}
      >
        R
      </Text>
    </Box>
  );
};

export default Logo;
