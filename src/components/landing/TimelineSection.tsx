import React, { useState, useRef, useEffect } from "react";
import { Container, Title, Text, Box, Group, Badge, ActionIcon, Button } from "@mantine/core";
import { keyframes } from "@emotion/react";
import { FaBriefcase, FaLaptopCode, FaCode, FaServer } from "react-icons/fa";

// Animation keyframes
const glowEffect = keyframes({
  "0%": { boxShadow: "0 0 15px rgba(61, 127, 255, 0.4), 0 0 30px rgba(61, 127, 255, 0.2), 0 0 45px rgba(61, 127, 255, 0.1)" },
  "50%": { boxShadow: "0 0 25px rgba(61, 127, 255, 0.7), 0 0 50px rgba(61, 127, 255, 0.4), 0 0 75px rgba(61, 127, 255, 0.2)" },
  "100%": { boxShadow: "0 0 15px rgba(61, 127, 255, 0.4), 0 0 30px rgba(61, 127, 255, 0.2), 0 0 45px rgba(61, 127, 255, 0.1)" }
});

const scanlineEffect = keyframes({
  "0%": { transform: "translateY(-200%)" },
  "100%": { transform: "translateY(200%)" }
});

const float = keyframes({
  "0%": { transform: "translateY(0px)" },
  "50%": { transform: "translateY(-10px)" },
  "100%": { transform: "translateY(0px)" }
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" }
});

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

// Animated component with intersection observer
const AnimatedSection = ({ children, delay = 0, className = "", style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : '30px'})`,
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

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
    <AnimatedSection delay={index * 0.2}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          transform: isHovered ? 'scale(1.02) translateY(-5px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
        }}
      >
        <Box
          style={{
            position: "relative",
            padding: "1.8rem",
            background: `rgba(10, 15, 36, ${isHovered ? '0.85' : '0.7'})`,
            backdropFilter: "blur(15px)",
            borderRadius: "1rem",
            border: `2px solid ${isHovered ? color.primary : color.border}`,
            boxShadow: isHovered 
              ? `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px ${color.glow}, 0 0 60px ${color.glow}40` 
              : "0 8px 30px rgba(0, 0, 0, 0.15)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            overflow: "hidden",
          }}
        >
          {/* Top date badge */}
          <Badge
            variant="filled"
            color={item.color}
            size="lg"
            radius="md"
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
              border: `1px solid ${color.border}`,
              padding: "0.5rem 1rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              animation: isHovered ? `${glowEffect} 2s infinite ease-in-out` : "none"
            }}
          >
            {item.date}
          </Badge>
          
          {/* Title and company section */}
          <Group align="flex-start" mb="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "50px",
                height: "50px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
                color: "white",
                boxShadow: `0 5px 15px ${color.glow}`,
                marginRight: "1rem",
                marginTop: "0.25rem",
                zIndex: 2
              }}
            >
              {item.icon}
            </div>
            
            <Box style={{ flex: 1 }}>
              <Title 
                order={3} 
                mb={5}
                style={{ 
                  color: color.primary, 
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  letterSpacing: "-0.01em",
                  textShadow: isHovered ? `0 0 8px ${color.glow}` : "none",
                  transition: "text-shadow 0.3s ease"
                }}
              >
                {item.title}
              </Title>
              
              <Text 
                size="lg" 
                fw={600}
                style={{
                  color: "#E3E7F1",
                  marginBottom: "0.5rem",
                  position: "relative",
                  display: "inline-block"
                }}
              >
                {item.company}
              </Text>
            </Box>
          </Group>
          
          {/* Description */}
          <Text 
            size="md" 
            mb="md"
            style={{
              color: "rgba(227, 231, 241, 0.8)",
              lineHeight: 1.6,
              transform: "translateZ(10px)"
            }}
          >
            {item.description}
          </Text>
          
          {/* Achievements Section - Only shows when expanded */}
          <div
            style={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
              transition: "height 0.3s, opacity 0.3s",
              overflow: "hidden", 
              marginBottom: isExpanded ? "1rem" : 0 
            }}
          >
            <Box 
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "0.5rem",
                padding: "1rem",
                border: "1px dashed rgba(255, 255, 255, 0.1)",
                marginBottom: "1rem"
              }}
            >
              <Title order={5} mb="sm" style={{ color: "#E3E7F1" }}>
                Key Achievements
              </Title>
              
              {item.achievements.map((achievement, i) => (
                <Group key={i} align="flex-start" mb="xs">
                  <Box 
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: color.primary,
                      marginTop: "0.5rem",
                      boxShadow: `0 0 5px ${color.glow}`
                    }}
                  />
                  <Text size="sm" style={{ flex: 1, color: "rgba(227, 231, 241, 0.9)" }}>
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
                style={{
                  display: "inline-block",
                  margin: "0 0.5rem 0.5rem 0",
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
                  style={{
                    padding: "0.5rem 0.8rem",
                    background: color.bg,
                    borderColor: color.border,
                    color: color.primary,
                    transition: "all 0.3s ease",
                    animation: isHovered ? `${float} ${2 + i * 0.5}s infinite ease-in-out` : "none",
                    transform: "translateZ(5px)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
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
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem"
            }}
          >
            <ActionIcon 
              variant="subtle" 
              color={item.color}
              radius="xl"
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
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
    </AnimatedSection>
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
    <Container size="lg" py={isMobile ? "4rem" : "8rem"}>
      <AnimatedSection>
        {/* Animated Section Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "2rem" : "3rem", 
            opacity: 1 // Always visible
          }}
        >
          <div
            style={{
              display: "inline-block",
              position: "relative"
            }}
          >
            <Title
              order={2}
              style={{
                fontSize: isMobile ? "2.3rem" : "3rem", // Smaller on mobile
                fontWeight: 800,
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #3D7FFF, #A64DFF)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 5px 25px rgba(61, 127, 255, 0.4)",
                fontFamily: '"Clash Display", sans-serif',
                letterSpacing: "-0.02em",
                textAlign: "center",
                backgroundSize: "200% 100%",
                animation: `${shimmer} 10s linear infinite`
              }}
            >
              Career Journey
            </Title>
            
            {/* Animated underline */}
            <div
              style={{
                position: "absolute",
                height: "4px",
                background: "linear-gradient(90deg, #3D7FFF, #A64DFF)",
                bottom: 0,
                left: "20%",
                borderRadius: "2px",
                boxShadow: "0 2px 10px rgba(61, 127, 255, 0.5)",
                width: "60%",
                transition: "width 0.8s ease-out 0.6s"
              }}
            />
          </div>
          
          <Text
            size={isMobile ? "lg" : "xl"}
            c="dimmed"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
              fontSize: isMobile ? "1.1rem" : undefined
            }}
          >
            My professional path in creating exceptional digital experiences
          </Text>
        </div>

        {/* Mobile-First Card Layout (used for all devices) */}
        <Box 
          style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}
        >
          {/* Mobile Timeline Nav */}
          {isMobile && (
            <Box style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "1rem" 
            }}>
              <Badge 
                size="xl" 
                style={{ 
                  padding: "0.8rem 1.5rem",
                  fontSize: "1.1rem",
                  background: "rgba(10, 15, 36, 0.8)",
                  border: "1px solid rgba(61, 127, 255, 0.3)",
                  color: "#ffffff"
                }}
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
                  style={{
                    background: activeCardIndex === 0 ? "rgba(30, 40, 60, 0.5)" : "rgba(61, 127, 255, 0.8)",
                    border: "1px solid rgba(61, 127, 255, 0.5)",
                    width: "50px",
                    height: "50px",
                    fontSize: "1.5rem",
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
                  style={{
                    background: activeCardIndex === timelineData.length - 1 ? "rgba(30, 40, 60, 0.5)" : "rgba(61, 127, 255, 0.8)",
                    border: "1px solid rgba(61, 127, 255, 0.5)",
                    width: "50px",
                    height: "50px",
                    fontSize: "1.5rem",
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
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                margin: "0 auto 3rem",
                maxWidth: "70%",
                position: "relative",
                padding: "0 30px"
              }}
            >
              {/* Timeline Bar */}
              <Box 
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: "6px",
                  background: "rgba(61, 127, 255, 0.2)",
                  borderRadius: "3px",
                  transform: "translateY(-50%)",
                  zIndex: 0
                }}
              />
              
              {/* Active Timeline Progress */}
              <Box 
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  width: `${(activeCardIndex / (timelineData.length - 1)) * 100}%`,
                  height: "6px",
                  background: "linear-gradient(90deg, #3D7FFF, #A64DFF)",
                  borderRadius: "3px",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                  boxShadow: "0 0 15px rgba(61, 127, 255, 0.4)",
                  transition: "width 0.3s ease-out"
                }}
              />
              
              {/* Timeline Step Points */}
              {timelineData.map((item, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActiveCardIndex(idx)}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    cursor: "pointer"
                  }}
                >
                  <Box
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: idx <= activeCardIndex 
                        ? `linear-gradient(135deg, ${getColor(item.color, 1)}, ${getColor(item.color, 0.7)})` 
                        : "rgba(15, 20, 40, 0.8)",
                      border: `2px solid ${idx <= activeCardIndex ? getColor(item.color, 1) : "rgba(61, 127, 255, 0.3)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#fff",
                      boxShadow: idx <= activeCardIndex ? `0 0 15px ${getColor(item.color, 0.5)}` : "none",
                      transition: "all 0.3s ease"
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
            style={{
              opacity: 1,
              transform: "translateX(0)",
              transition: "opacity 0.4s, transform 0.4s",
              padding: isMobile ? "1.8rem" : "2.5rem",
              background: "rgba(10, 15, 36, 0.8)",
              borderRadius: "1.2rem", 
              border: `3px solid ${getColor(timelineData[activeCardIndex].color, 0.4)}`,
              boxShadow: `0 20px 40px rgba(0, 0, 0, 0.25), 0 0 30px ${getColor(timelineData[activeCardIndex].color, 0.15)}`,
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Date badge with larger, more visible text */}
            <Badge
              variant="filled"
              color={timelineData[activeCardIndex].color}
              size="xl"
              radius="md"
              style={{
                position: "absolute",
                top: "1.2rem",
                right: "1.2rem",
                background: `linear-gradient(135deg, 
                  ${getColor(timelineData[activeCardIndex].color, 1)},
                  ${getColor(timelineData[activeCardIndex].color, 0.7)})`,
                border: `1px solid ${getColor(timelineData[activeCardIndex].color, 0.5)}`,
                padding: "0.8rem 1.5rem",
                fontSize: isMobile ? "1.1rem" : "1.2rem",
                fontWeight: 700,
                boxShadow: `0 5px 15px ${getColor(timelineData[activeCardIndex].color, 0.35)}`
              }}
            >
              {timelineData[activeCardIndex].date}
            </Badge>
            
            {/* Title and Company - Larger and more accessible */}
            <Group align="flex-start" mb="xl" wrap="nowrap">
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: isMobile ? "70px" : "90px",
                  height: isMobile ? "70px" : "90px",
                  borderRadius: "18px",
                  background: `linear-gradient(135deg, 
                    ${getColor(timelineData[activeCardIndex].color, 1)},
                    ${getColor(timelineData[activeCardIndex].color, 0.7)})`,
                  color: "white",
                  boxShadow: `0 10px 25px ${getColor(timelineData[activeCardIndex].color, 0.5)}`,
                  marginRight: "1.5rem",
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  animation: `${float} 3s infinite ease-in-out`
                }}
              >
                {timelineData[activeCardIndex].icon}
              </Box>
              
              <Box style={{ flex: 1 }}>
                <Title 
                  order={2} 
                  mb={12}
                  style={{ 
                    color: getColor(timelineData[activeCardIndex].color, 1), 
                    fontWeight: 800,
                    fontSize: isMobile ? "2rem" : "2.5rem",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1
                  }}
                >
                  {timelineData[activeCardIndex].title}
                </Title>
                
                <Text 
                  size="xl" 
                  fw={700}
                  style={{
                    color: "#E3E7F1",
                    fontSize: isMobile ? "1.4rem" : "1.5rem",
                    marginBottom: "1rem"
                  }}
                >
                  {timelineData[activeCardIndex].company}
                </Text>
              </Box>
            </Group>
            
            {/* Description - Larger, more readable text with better spacing */}
            <Box 
              mb="xl"
              style={{
                background: "rgba(0, 0, 0, 0.15)",
                padding: "1.5rem",
                borderRadius: "12px",
                borderLeft: `4px solid ${getColor(timelineData[activeCardIndex].color, 0.8)}`,
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.2)"
              }}
            >
              <Text 
                size="lg" 
                style={{
                  color: "rgba(227, 231, 241, 1)",
                  lineHeight: 1.7,
                  fontSize: isMobile ? "1.2rem" : "1.25rem",
                  fontWeight: 400
                }}
              >
                {timelineData[activeCardIndex].description}
              </Text>
            </Box>
            
            {/* Achievements Section - Always visible */}
            <Box mb="xl">
              <Title 
                order={4} 
                mb="md" 
                style={{ 
                  color: "#E3E7F1", 
                  fontSize: isMobile ? "1.3rem" : "1.4rem" 
                }}
              >
                Key Achievements
              </Title>
              
              <Box 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
              >
                {timelineData[activeCardIndex].achievements.map((achievement, i) => (
                  <Group key={i} align="flex-start" wrap="nowrap">
                    <Box 
                      style={{
                        minWidth: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: getColor(timelineData[activeCardIndex].color, 0.2),
                        border: `2px solid ${getColor(timelineData[activeCardIndex].color, 0.6)}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "0.2rem",
                        boxShadow: `0 0 10px ${getColor(timelineData[activeCardIndex].color, 0.3)}`
                      }}
                    >
                      <Box style={{ width: "8px", height: "8px", borderRadius: "50%", background: getColor(timelineData[activeCardIndex].color, 1) }} />
                    </Box>
                    <Text 
                      size="md" 
                      style={{ 
                        flex: 1, 
                        color: "rgba(227, 231, 241, 0.95)",
                        fontSize: isMobile ? "1.1rem" : "1.15rem",
                        lineHeight: 1.5
                      }}
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
                style={{ 
                  color: "#E3E7F1", 
                  fontSize: isMobile ? "1.3rem" : "1.4rem" 
                }}
              >
                Skills
              </Title>
              
              <Box
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                {timelineData[activeCardIndex].skills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="filled"
                    size="xl"
                    radius="md"
                    style={{
                      padding: "0.8rem 1.2rem",
                      background: getColor(timelineData[activeCardIndex].color, 0.15),
                      border: `1px solid ${getColor(timelineData[activeCardIndex].color, 0.5)}`,
                      color: getColor(timelineData[activeCardIndex].color, 1),
                      fontSize: isMobile ? "1rem" : "1.05rem",
                      fontWeight: 600,
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
                style={{
                  borderWidth: "2px",
                  borderColor: activeCardIndex === 0 ? "rgba(61, 127, 255, 0.3)" : "rgba(61, 127, 255, 0.8)",
                  color: activeCardIndex === 0 ? "rgba(61, 127, 255, 0.5)" : "rgba(61, 127, 255, 1)",
                  boxShadow: activeCardIndex === 0 ? "none" : "0 5px 15px rgba(61, 127, 255, 0.2)",
                  fontSize: "1.1rem",
                  height: "3.5rem",
                  padding: "0 2rem"
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
                style={{
                  opacity: activeCardIndex === timelineData.length - 1 ? 0.5 : 1,
                  boxShadow: activeCardIndex === timelineData.length - 1 ? "none" : "0 5px 20px rgba(61, 127, 255, 0.4)",
                  fontSize: "1.1rem",
                  height: "3.5rem",
                  padding: "0 2rem"
                }}
              >
                Next Position
              </Button>
            </Group>
          )}
        </Box>
      </AnimatedSection>
    </Container>
  );
}
