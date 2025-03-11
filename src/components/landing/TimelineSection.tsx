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
  isCurrent?: boolean;
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
    icon: <FaLaptopCode size={24} />,
    isCurrent: true
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

// Individual Timeline Card component for vertical layout
const VerticalTimelineCard = ({ item, index, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
  const isEven = index % 2 === 0;
  
  return (
    <Box 
      className={styles.verticalTimelineItem} 
      data-active={isActive}
      style={{
        opacity: isActive ? 1 : 0.8,
        marginBottom: "4rem", // Increased spacing between timeline items
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Timeline line */}
      <div className={styles.verticalTimelineLine}>
        <div 
          className={styles.verticalTimelineLineInner} 
          style={{ 
            background: isActive || item.isCurrent ? 
              `linear-gradient(to bottom, ${color.primary}, ${color.secondary})` : 
              "rgba(255, 255, 255, 0.3)",
            width: isActive || item.isCurrent ? "4px" : "3px", // Thicker line for better visibility
          }} 
        />
      </div>
      
      {/* Timeline dot */}
      <div 
        className={styles.verticalTimelineDot}
        style={{
          background: isActive || item.isCurrent ? 
            `linear-gradient(135deg, ${color.primary}, ${color.secondary})` : 
            "rgba(30, 40, 60, 0.7)",
          boxShadow: (isActive || item.isCurrent) ? 
            `0 0 25px ${color.glow}` : 
            "0 0 15px rgba(255, 255, 255, 0.15)",
          borderColor: (isActive || item.isCurrent) ? color.primary : "rgba(255, 255, 255, 0.4)",
          transform: `scale(${isHovered || isActive || item.isCurrent ? 1.2 : 1})`,
          // Make current role dot larger with a neon glow effect
          width: item.isCurrent ? "56px" : "48px", 
          height: item.isCurrent ? "56px" : "48px",
        }}
      >
        <div className={styles.verticalTimelineDotInner}
          style={{
            filter: item.isCurrent ? `drop-shadow(0 0 8px ${color.primary})` : "none",
          }}
        >
          {item.icon}
        </div>
      </div>
      
      {/* Timeline card content - alternate sides for visual interest */}
      <div 
        className={`${styles.verticalTimelineCard} ${isEven ? styles.cardRight : styles.cardLeft}`}
        style={{
          borderColor: isActive ? color.primary : "rgba(255, 255, 255, 0.15)",
          boxShadow: isActive ? 
            `0 15px 35px rgba(0, 0, 0, 0.25), 0 0 25px ${color.glow}` : 
            "0 8px 20px rgba(0, 0, 0, 0.15)",
          transform: isHovered ? 
            `translateY(-5px) scale(${isActive ? 1.01 : 1})` : 
            `translateY(0) scale(${isActive ? 1 : 0.98})`,
          background: `rgba(20, 27, 65, ${isActive ? 0.7 : 0.4})`,
          padding: "1.8rem", // Increased internal padding for better readability
        }}
      >
        {/* Date badge */}
        <Badge
          variant="filled"
          color={item.color}
          size="lg"
          radius="md"
          className={styles.verticalTimelineDate}
          style={{
            background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
            boxShadow: isActive ? `0 0 15px ${color.glow}` : "none"
          }}
        >
          {item.date}
        </Badge>
        
        {/* Title & Company */}
        <div className={styles.verticalTimelineHeader}>
          <Title
            order={3}
            className={styles.verticalTimelineTitle}
            style={{
              color: color.primary,
              textShadow: isActive ? `0 0 10px ${color.glow}` : "none",
              fontSize: item.isCurrent ? "1.9rem" : "clamp(1.3rem, 3vw, 1.8rem)"
            }}
          >
            {item.title}
          </Title>
          <Text
            size="lg"
            fw={600}
            className={styles.verticalTimelineCompany}
          >
            {item.company}
          </Text>
        </div>
        
        {/* Description */}
        <Text
          size="md"
          className={styles.verticalTimelineDescription}
        >
          {item.description}
        </Text>
        
        {/* Achievements - visible when active */}
        {isActive && (
          <Box className={styles.verticalTimelineAchievements}>
            <Title order={5} mb="sm" className={styles.verticalTimelineAchievementsTitle}>
              Key Achievements
            </Title>
            {item.achievements.map((achievement, i) => (
              <Group key={i} align="flex-start" mb="sm" gap="md">
                <Box
                  className={styles.verticalTimelineAchievementDot}
                  style={{
                    background: color.bg,
                    borderColor: color.border
                  }}
                />
                <Text size="sm" className={styles.verticalTimelineAchievementText}>
                  {achievement}
                </Text>
              </Group>
            ))}
          </Box>
        )}
        
        {/* Skills */}
        <Box className={styles.verticalTimelineSkills}>
          {item.skills.map((skill, i) => (
            <Badge
              key={i}
              variant="dot"
              size="md"
              radius="sm"
              color={item.color}
              className={styles.verticalTimelineSkillBadge}
              style={{
                background: color.bg,
                borderColor: isActive ? color.primary : color.border,
                color: color.primary,
                animation: isActive ? `${styles.float} ${2 + i * 0.5}s infinite ease-in-out` : "none",
                opacity: isActive ? 1 : 0.8,
                padding: "0.5rem 0.7rem",
                fontSize: "0.9rem",
                boxShadow: isActive ? `0 0 10px ${color.glow}30` : "none",
              }}
            >
              {skill}
            </Badge>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export function TimelineSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Handle scroll to set active card based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Activate the timeline card the user clicks on
  const handleCardClick = (index) => {
    setActiveCardIndex(index);
  };

  return (
    <Container size="xl" className={styles.timelineSection} ref={sectionRef}>
      {/* Section Title */}
      <Box className={styles.timelineTitleContainer}>
        <Box className={styles.timelineTitleInner}>
          <Title order={2} className={styles.timelineTitleText}>
            Professional Journey
          </Title>
          <Box className={styles.timelineUnderline} />
        </Box>
        <Text className={styles.timelineDescriptionText} mb={40}>
          Exploring my career path and key milestones in software development
        </Text>
      </Box>
      
      {/* Vertical Timeline Layout */}
      <div className={styles.verticalTimelineContainer}>
        {timelineData.map((item, index) => (
          <VerticalTimelineCard
            key={index}
            item={item}
            index={index}
            isActive={activeCardIndex === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </Container>
  );
}
