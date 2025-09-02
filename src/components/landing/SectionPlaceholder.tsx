import React from "react";
import { Box, Title, Text } from "@mantine/core";
import * as styles from "./TimelineSection.module.css";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export default function SectionPlaceholder({ title, subtitle }: Props) {
  return (
    <Box style={{ marginBottom: "2.5rem", textAlign: "center" }}>
      <Title order={3} className={styles.verticalTimelineTitle}>
        {title}
      </Title>
      {subtitle ? (
        <Text className={styles.timelineDescriptionText}>{subtitle}</Text>
      ) : null}
    </Box>
  );
}
