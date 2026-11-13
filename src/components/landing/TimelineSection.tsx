import React from "react";
import { Container, Title, Text, Box } from "@mantine/core";
import * as styles from "./TimelineSection.module.css";

export type LandingSectionProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  containerSize?: number | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
};

export const LandingSection = React.forwardRef<
  HTMLDivElement,
  LandingSectionProps
>(function LandingSection(
  {
    title,
    description,
    children,
    containerSize = "xl",
    className,
  }: LandingSectionProps,
  ref
) {
  return (
    <Container
      size={containerSize}
      className={`${styles.timelineSection} ${className ?? ""}`}
      ref={ref}
    >
      {/* Title area */}
      <Box className={styles.timelineTitleContainer}>
        <Box className={styles.timelineTitleInner}>
          <Title order={2} className={styles.timelineTitleText}>
            {title}
          </Title>
          <Box className={styles.timelineUnderline} />
        </Box>
        {description ? (
          <Text className={styles.timelineDescriptionText}>{description}</Text>
        ) : null}
      </Box>

      {/* Content area */}
      {children ? <Box>{children}</Box> : null}
    </Container>
  );
});

// Temporary backward-compatible alias (deprecated). Remove after migrating imports.
export const TimelineSection = LandingSection;
