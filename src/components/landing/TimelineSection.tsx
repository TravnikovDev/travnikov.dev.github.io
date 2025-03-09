import React, { useState, useRef, useEffect } from "react";
import { Container, Title, Timeline, Text, Box, Group, Badge, ActionIcon } from "@mantine/core";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { keyframes } from "@emotion/react";
import { FaBriefcase, FaLaptopCode, FaCode, FaServer, FaBrain } from "react-icons/fa";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3
    }
  }
};

const titleVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const lineVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { 
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: i * 0.2
    }
  })
};

const logoVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    scale: 1.2,
    boxShadow: "0 0 20px rgba(61, 127, 255, 0.6)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// Card component with hover effect
const TimelineCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  // Color values based on item color
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
    <motion.div
      ref={cardRef}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      style={{
        perspective: "1000px"
      }}
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          transformStyle: "preserve-3d",
          cursor: "pointer",
          position: "relative"
        }}
        animate={{
          rotateX: isHovered ? 8 : 0,
          rotateY: isHovered ? -15 : 0,
          z: isHovered ? 50 : 0,
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -15 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15
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
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            transformStyle: "preserve-3d",
            
            // Animated highlight
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "5px",
              height: "100%",
              background: `linear-gradient(180deg, ${color.primary}, ${color.secondary})`,
              opacity: isHovered ? 1 : 0.7,
              transition: "opacity 0.3s ease"
            },
            
            // Enhanced scanline effect
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "20px",
              background: `linear-gradient(90deg, transparent, ${color.primary}80, transparent)`,
              opacity: isHovered ? 0.7 : 0,
              filter: "blur(2px)",
              animation: isHovered ? `${scanlineEffect} 1.2s linear infinite` : "none",
              zIndex: 1
            }
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
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
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
            </motion.div>
            
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden", marginBottom: isExpanded ? "1rem" : 0 }}
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
          </motion.div>
          
          {/* Skills */}
          <Box>
            {item.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.1 + (i * 0.05) } 
                }}
                style={{
                  display: "inline-block",
                  margin: "0 0.5rem 0.5rem 0"
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
              </motion.div>
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
      </motion.div>
    </motion.div>
  );
};

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax and animation effects
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  
  return (
    <Container size="lg" py="8rem" ref={containerRef}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Animated Section Title */}
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: titleOpacity,
            y: titleY
          }}
        >
          <motion.div
            variants={titleVariants}
            style={{
              display: "inline-block",
              position: "relative"
            }}
          >
            <Title
              order={2}
              style={{
                fontSize: "3rem",
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
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                height: "4px",
                background: "linear-gradient(90deg, #3D7FFF, #A64DFF)",
                bottom: 0,
                left: "20%",
                borderRadius: "2px",
                boxShadow: "0 2px 10px rgba(61, 127, 255, 0.5)"
              }}
            />
          </motion.div>
          
          <Text
            size="xl"
            c="dimmed"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6
            }}
          >
            My professional path in creating exceptional digital experiences
          </Text>
        </motion.div>

        {/* 3D Timeline Container */}
        <Box style={{ position: "relative", perspective: "1000px" }}>
          {/* Enhanced animated central timeline line */}
          <motion.div
            variants={lineVariants}
            style={{
              position: "absolute",
              left: "50%",
              top: "20px",
              bottom: "20px",
              width: "8px",
              background: "linear-gradient(180deg, #3D7FFF, rgba(166, 77, 255, 0.8), rgba(0, 184, 217, 0.8))",
              transform: "translateX(-50%)",
              borderRadius: "5px",
              zIndex: 0,
              boxShadow: "0 0 30px rgba(61, 127, 255, 0.7), 0 0 60px rgba(166, 77, 255, 0.4)",
              transformOrigin: "top",
              animation: `${glowEffect} 3s infinite ease-in-out`
            }}
          />
          
          {/* Pulsing particles along the timeline */}
          {[0.2, 0.4, 0.6, 0.8].map((position, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0.6, 1.2, 0.6], 
                opacity: [0.4, 0.8, 0.4] 
              }}
              transition={{ 
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: `${position * 100}%`,
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: i % 2 === 0 ? "#3D7FFF" : "#A64DFF",
                transform: "translateX(-50%)",
                zIndex: 1,
                boxShadow: i % 2 === 0 
                  ? "0 0 20px rgba(61, 127, 255, 0.8), 0 0 40px rgba(61, 127, 255, 0.4)" 
                  : "0 0 20px rgba(166, 77, 255, 0.8), 0 0 40px rgba(166, 77, 255, 0.4)"
              }}
            />
          ))}
          
          {/* Timeline Items with alternating sides */}
          <Box style={{ position: "relative", zIndex: 1 }}>
            {timelineData.map((item, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                  marginBottom: "4rem",
                  paddingRight: index % 2 === 0 ? "52%" : "0",
                  paddingLeft: index % 2 === 1 ? "52%" : "0",
                  position: "relative"
                }}
              >
                {/* Timeline node (circle on the central line) */}
                <motion.div
                  variants={logoVariants}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "30px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: item.color === "blue" ? "#3D7FFF" : item.color === "violet" ? "#A64DFF" : "#00B8D9",
                    transform: "translateX(-50%)",
                    boxShadow: `0 0 0 6px #0A0F24, 0 0 20px ${item.color === "blue" ? "rgba(61, 127, 255, 0.7)" : 
                                item.color === "violet" ? "rgba(166, 77, 255, 0.7)" : "rgba(0, 184, 217, 0.7)"}`,
                    zIndex: 2,
                    animation: `${glowEffect} 2s infinite ease-in-out`
                  }}
                />
                
                {/* Connecting line to card */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "10%" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "42px",
                    height: "2px",
                    background: item.color === "blue" ? "#3D7FFF" : item.color === "violet" ? "#A64DFF" : "#00B8D9",
                    left: index % 2 === 0 ? "40%" : "unset",
                    right: index % 2 === 1 ? "40%" : "unset",
                  }}
                />
                
                {/* The actual card (using 80% width) */}
                <Box style={{ width: "80%" }}>
                  <TimelineCard item={item} index={index} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
