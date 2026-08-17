import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "gatsby";
import BrandMark from "./BrandMark";
import * as styles from './Logo.module.css';

const Logo: React.FC = () => {
  return (
    <Box
      component={Link}
      to="/"
      className={styles.logo}
    >
      <span className={styles.mark} aria-hidden="true">
        <BrandMark />
      </span>
      <Text className={styles.logoText}>Roman&nbsp;Travnikov</Text>
    </Box>
  );
};

export default Logo;
