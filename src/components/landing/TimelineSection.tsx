import React, { useState, useRef, useEffect } from "react";
import { Container, Title, Text, Box, Group, Badge, ActionIcon, Button } from "@mantine/core";
import { FaBriefcase, FaLaptopCode, FaCode, FaServer } from "react-icons/fa";
import * as styles from './TimelineSection.module.css';

// Timeline item interface with extended properties
interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  skills: string[];
  color: "blue" | "violet" | "teal";
  icon: React.ReactNode;
}

// Enhanced timeline data
const timelineData: TimelineItem[] = [
  {
    date: "2020 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    description: "Leading the frontend development team in creating cutting-edge web applications with advanced 3D visualizations and interactive interfaces.",
    achievements: [
      "Architected and implemented a real-time 3D visualization platform that increased user engagement by 40%",
      "Led the migration from legacy codebase to modern React with TypeScript, improving performance by 60%",
      "Mentored junior developers and established coding standards across the team"
    ],
    skills: ["React", "TypeScript", "Three.js", "WebGL", "Node.js", "Performance Optimization"],
    color: "blue",
    icon: <FaLaptopCode size={24} />
  },
  {
    date: "2018 - 2020",
    title: "Frontend Developer",
    company: "Digital Frontiers Agency",
    description: "Developed interactive and responsive user interfaces for high-profile clients in the entertainment and e-commerce sectors.",
    achievements: [
      "Created interactive product visualizations that improved conversion rates by 25%",
      "Optimized critical rendering paths for mobile-first applications",
      "Implemented WebGL-based animations that became a signature feature for the agency"
    ],
    skills: ["React", "JavaScript", "CSS3", "WebGL", "GSAP", "Responsive Design"],
    color: "violet",
    icon: <FaCode size={24} />
  },
  {
    date: "2015 - 2018",
    title: "Full Stack Developer",
    company: "NextGen Startup",
    description: "Built complete web applications from concept to deployment, working across the entire technology stack.",
    achievements: [
      "Developed the company's core product from ground up, securing Series A funding",
      "Designed and implemented RESTful APIs used by over 10,000 daily active users",
      "Optimized database queries that reduced server load by 70%"
    ],
    skills: ["Node.js", "React", "MongoDB", "Express", "AWS", "Docker"],
    color: "teal",
    icon: <FaServer size={24} />
  }
];

// Card component with hover effect
const TimelineCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = {
    blue: {
      primary: "#3D7FFF",
      secondary: "#0D47A1",
      bg: "rgba(61, 127, 255, 0.1)",
      border: "rgba(61, 127, 255, 0.2)",
      glow: "rgba(61, 127, 255, 0.5)"
    },
    violet: {
      primary: "#A64DFF",
      secondary: "#6A1B9A",
      bg: "rgba(166, 77, 255, 0.1)",
      border: "rgba(166, 77, 255, 0.2)",
      glow: "rgba(166, 77, 255, 0.5)"
    },
    teal: {
      primary: "#00B8D9",
      secondary: "#00838F",
      bg: "rgba(0, 184, 217, 0.1)",
      border: "rgba(0, 184, 217, 0.2)",
      glow: "rgba(0, 184, 217, 0.5)"
    }
  };

  const color = colors[item.color];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className={styles.timelineCard}
    >
      <Box
        className={styles.timelineCardBox}
        style={{
          border: `2px solid ${isHovered ? color.primary : color.border}`,
          boxShadow: isHovered
            ? `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px ${color.glow}, 0 0 60px ${color.glow}40`
            : "0 8px 30px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Top date badge */}
        <Badge
          variant="filled"
          color={item.color}
          size="lg"
          radius="md"
          className={styles.timelineBadge}
          style={{
            background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
            border: `1px solid ${color.border}`,
            animation: isHovered ? `${styles.glowEffect} 2s infinite ease-in-out` : "none"
          }}
        >
          {item.date}
        </Badge>

        {/* Title and company section */}
        <Group align="flex-start" mb="md">
          <div
            className={styles.timelineIcon}
            style={{
              background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
              boxShadow: `0 5px 15px ${color.glow}`,
            }}
          >
            {item.icon}
          </div>

          <Box style={{ flex: 1 }}>
            <Title
              order={3}
              mb={5}
              className={styles.timelineItemTitle}
              style={{
                color: color.primary,
                textShadow: isHovered ? `0 0 8px ${color.glow}` : "none",
              }}
            >
              {item.title}
            </Title>

            <Text
              size="lg"
              fw={600}
              className={styles.timelineCompany}
            >
              {item.company}
            </Text>
          </Box>
        </Group>

        {/* Description */}
        <Text
          size="md"
          mb="md"
          className={styles.timelineDescription}
        >
          {item.description}
        </Text>

        {/* Achievements Section - Only shows when expanded */}
        <div
          className={styles.timelineAchievements}
          style={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <Box
            className={styles.timelineAchievementsBox}
          >
            <Title order={5} mb="sm" className={styles.timelineMainAchievementsTitle}>
              Key Achievements
            </Title>

            {item.achievements.map((achievement, i) => (
              <Group key={i} align="flex-start" mb="xs">
                <Box
                  className={styles.timelineAchievementDot}
                  style={{
                    background: color.primary,
                    boxShadow: `0 0 5px ${color.glow}`
                  }}
                />
                <Text size="sm" className={styles.timelineAchievementText}>
                  {achievement}
                </Text>
              </Group>
            ))}
          </Box>
        </div>

        {/* Skills */}
        <Box>
          {item.skills.map((skill, i) => (
            <div
              key={i}
              className={styles.timelineSkill}
              style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: `opacity 0.3s ${0.1 + (i * 0.05)}s, transform 0.3s ${0.1 + (i * 0.05)}s`
              }}
            >
              <Badge
                variant="dot"
                size="md"
                radius="sm"
                color={item.color}
                className={styles.timelineSkillBadge}
                style={{
                  background: color.bg,
                  borderColor: color.border,
                  color: color.primary,
                  animation: isHovered ? `${styles.float} ${2 + i * 0.5}s infinite ease-in-out` : "none",
                  boxShadow: isHovered ? `0 5px 15px ${color.glow}25` : "none"
                }}
              >
                {skill}
              </Badge>
            </div>
          ))}
        </Box>

        {/* Show more indicator */}
        <Box
          className={styles.timelineShowMore}
        >
          <ActionIcon
            variant="subtle"
            color={item.color}
            radius="xl"
            className={styles.timelineShowMoreIcon}
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              background: color.bg,
              border: `1px solid ${color.border}`,
              color: color.primary
            }}
          >
            {isExpanded ? "−" : "+"}
          </ActionIcon>
        </Box>
      </Box>
    </div>
  );
};

export function TimelineSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Card navigation handlers
  const nextCard = () => {
    setActiveCardIndex((prev) => (prev < timelineData.length - 1 ? prev + 1 : prev));
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Generate color based on item color
  const getColor = (colorName, opacity = 1) => {
    switch (colorName) {
      case "blue": return `rgba(61, 127, 255, ${opacity})`;
      case "violet": return `rgba(166, 77, 255, ${opacity})`;
      case "teal": return `rgba(0, 184, 217, ${opacity})`;
      default: return `rgba(61, 127, 255, ${opacity})`;
    }
  };

  return (
    <Container size="xl" className={styles.timelineSection}>
      <Box className={styles.timelineTitleContainer}>
        <Box className={styles.timelineTitleInner}>
          <Title order={2} className={styles.timelineTitleText}>
            Professional Journey
          </Title>
          <Box className={styles.timelineUnderline} />
        </Box>
        <Text className={styles.timelineDescriptionText}>
          Exploring my career path and key milestones in software development
        </Text>
      </Box>

      {/* Mobile-First Card Layout (used for all devices) */}
      <Box
        className={styles.timelineCardContainer}
      >
        {/* Mobile Timeline Nav */}
        {isMobile && (
          <Box className={styles.timelineMobileNav}>
            <Badge
              size="xl"
              className={styles.timelineMobileBadge}
            >
              {activeCardIndex + 1} of {timelineData.length}
            </Badge>

            <Group gap="md">
              <ActionIcon
                size="xl"
                variant="filled"
                color="blue"
                radius="xl"
                onClick={prevCard}
                disabled={activeCardIndex === 0}
                className={styles.timelineMobileNavIcon}
                style={{
                  background: activeCardIndex === 0 ? "rgba(30, 40, 60, 0.5)" : "rgba(61, 127, 255, 0.8)",
                  border: "1px solid rgba(61, 127, 255, 0.5)",
                  boxShadow: activeCardIndex === 0 ? "none" : "0 5px 15px rgba(61, 127, 255, 0.3)"
                }}
              >
                ←
              </ActionIcon>

              <ActionIcon
                size="xl"
                variant="filled"
                color="blue"
                radius="xl"
                onClick={nextCard}
                disabled={activeCardIndex === timelineData.length - 1}
                className={styles.timelineMobileNavIcon}
                style={{
                  background: activeCardIndex === timelineData.length - 1 ? "rgba(30, 40, 60, 0.5)" : "rgba(61, 127, 255, 0.8)",
                  border: "1px solid rgba(61, 127, 255, 0.5)",
                  boxShadow: activeCardIndex === timelineData.length - 1 ? "none" : "0 5px 15px rgba(61, 127, 255, 0.3)"
                }}
              >
                →
              </ActionIcon>
            </Group>
          </Box>
        )}

        {/* Desktop Timeline Stepper */}
        {!isMobile && (
          <Box
            className={styles.timelineDesktopStepper}
          >
            {/* Timeline Bar */}
            <Box
              className={styles.timelineBar}
            />

            {/* Active Timeline Progress */}
            <Box
              className={styles.timelineProgress}
              style={{
                width: `${(activeCardIndex / (timelineData.length - 1)) * 100}%`,
              }}
            />

            {/* Timeline Step Points */}
            {timelineData.map((item, idx) => (
              <Box
                key={idx}
                onClick={() => setActiveCardIndex(idx)}
                className={styles.timelineStepPoint}
              >
                <Box
                  className={styles.timelineStepPointInner}
                  style={{
                    background: idx <= activeCardIndex
                      ? `linear-gradient(135deg, ${getColor(item.color, 1)}, ${getColor(item.color, 0.7)})`
                      : "rgba(15, 20, 40, 0.8)",
                    border: `2px solid ${idx <= activeCardIndex ? getColor(item.color, 1) : "rgba(61, 127, 255, 0.3)"}`,
                    boxShadow: idx <= activeCardIndex ? `0 0 15px ${getColor(item.color, 0.5)}` : "none",
                  }}
                >
                  {idx + 1}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Main Card Container with Animation */}
        <div
          key={activeCardIndex}
          className={styles.timelineMainCard}
          style={{
            border: `3px solid ${getColor(timelineData[activeCardIndex].color, 0.4)}`,
            boxShadow: `0 20px 40px rgba(0, 0, 0, 0.25), 0 0 30px ${getColor(timelineData[activeCardIndex].color, 0.15)}`,
          }}
        >
          {/* Date badge with larger, more visible text */}
          <Badge
            variant="filled"
            color={timelineData[activeCardIndex].color}
            size="xl"
            radius="md"
            className={styles.timelineMainBadge}
            style={{
              background: `linear-gradient(135deg, 
                  ${getColor(timelineData[activeCardIndex].color, 1)},
                  ${getColor(timelineData[activeCardIndex].color, 0.7)})`,
              border: `1px solid ${getColor(timelineData[activeCardIndex].color, 0.5)}`,
              boxShadow: `0 5px 15px ${getColor(timelineData[activeCardIndex].color, 0.35)}`
            }}
          >
            {timelineData[activeCardIndex].date}
          </Badge>

          {/* Title and Company - Larger and more accessible */}
          <Group align="flex-start" mb="xl" wrap="nowrap">
            <Box
              className={styles.timelineMainIcon}
              style={{
                background: `linear-gradient(135deg, 
                    ${getColor(timelineData[activeCardIndex].color, 1)},
                    ${getColor(timelineData[activeCardIndex].color, 0.7)})`,
                boxShadow: `0 10px 25px ${getColor(timelineData[activeCardIndex].color, 0.5)}`,
              }}
            >
              {timelineData[activeCardIndex].icon}
            </Box>

            <Box style={{ flex: 1 }}>
              <Title
                order={2}
                mb={12}
                className={styles.timelineMainTitle}
                style={{
                  color: getColor(timelineData[activeCardIndex].color, 1),
                }}
              >
                {timelineData[activeCardIndex].title}
              </Title>

              <Text
                size="xl"
                fw={700}
                className={styles.timelineMainCompany}
              >
                {timelineData[activeCardIndex].company}
              </Text>
            </Box>
          </Group>

          {/* Description - Larger, more readable text with better spacing */}
          <Box
            mb="xl"
            className={styles.timelineMainDescriptionBox}
            style={{
              borderLeft: `4px solid ${getColor(timelineData[activeCardIndex].color, 0.8)}`,
            }}
          >
            <Text
              size="lg"
              className={styles.timelineMainDescriptionText}
            >
              {timelineData[activeCardIndex].description}
            </Text>
          </Box>

          {/* Achievements Section - Always visible */}
          <Box mb="xl">
            <Title
              order={4}
              mb="md"
              className={styles.timelineMainAchievementsTitle}
            >
              Key Achievements
            </Title>

            <Box
              className={styles.timelineMainAchievementsBox}
            >
              {timelineData[activeCardIndex].achievements.map((achievement, i) => (
                <Group key={i} align="flex-start" wrap="nowrap">
                  <Box
                    className={styles.timelineMainAchievementDot}
                    style={{
                      background: getColor(timelineData[activeCardIndex].color, 0.2),
                      border: `2px solid ${getColor(timelineData[activeCardIndex].color, 0.6)}`,
                      boxShadow: `0 0 10px ${getColor(timelineData[activeCardIndex].color, 0.3)}`
                    }}
                  >
                    <Box style={{ width: "8px", height: "8px", borderRadius: "50%", background: getColor(timelineData[activeCardIndex].color, 1) }} />
                  </Box>
                  <Text
                    size="md"
                    className={styles.timelineMainAchievementText}
                  >
                    {achievement}
                  </Text>
                </Group>
              ))}
            </Box>
          </Box>

          {/* Skills - Larger, more readable badges */}
          <Box>
            <Title
              order={4}
              mb="md"
              className={styles.timelineMainSkillsTitle}
            >
              Skills
            </Title>

            <Box
              className={styles.timelineMainSkillsBox}
            >
              {timelineData[activeCardIndex].skills.map((skill, i) => (
                <Badge
                  key={i}
                  variant="filled"
                  size="xl"
                  radius="md"
                  className={styles.timelineMainSkillBadge}
                  style={{
                    background: getColor(timelineData[activeCardIndex].color, 0.15),
                    border: `1px solid ${getColor(timelineData[activeCardIndex].color, 0.5)}`,
                    color: getColor(timelineData[activeCardIndex].color, 1),
                    boxShadow: `0 3px 10px ${getColor(timelineData[activeCardIndex].color, 0.1)}`
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </Box>
          </Box>
        </div>

        {/* Desktop Navigation Controls */}
        {!isMobile && (
          <Group justify="center" mt="xl" gap="xl">
            <Button
              size="lg"
              variant="outline"
              color="blue"
              onClick={prevCard}
              disabled={activeCardIndex === 0}
              leftSection={<span>←</span>}
              className={styles.timelineNavButton}
              style={{
                borderColor: activeCardIndex === 0 ? "rgba(61, 127, 255, 0.3)" : "rgba(61, 127, 255, 0.8)",
                color: activeCardIndex === 0 ? "rgba(61, 127, 255, 0.5)" : "rgba(61, 127, 255, 1)",
                boxShadow: activeCardIndex === 0 ? "none" : "0 5px 15px rgba(61, 127, 255, 0.2)",
                opacity: activeCardIndex === 0 ? 0.5 : 1
              }}
            >
              Previous Position
            </Button>

            <Button
              size="lg"
              variant="gradient"
              gradient={{ from: "#3D7FFF", to: "#A64DFF" }}
              onClick={nextCard}
              disabled={activeCardIndex === timelineData.length - 1}
              rightSection={<span>→</span>}
              className={styles.timelineNavButton}
              style={{
                opacity: activeCardIndex === timelineData.length - 1 ? 0.5 : 1,
                boxShadow: activeCardIndex === timelineData.length - 1 ? "none" : "0 5px 20px rgba(61, 127, 255, 0.4)",
              }}
            >
              Next Position
            </Button>
          </Group>
        )}
      </Box>
    </Container>
  );
}
