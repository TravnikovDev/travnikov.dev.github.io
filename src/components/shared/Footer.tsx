import React, { useState, useEffect } from "react";
import { Container, AppShellFooter, Box, Text, Group, Anchor } from "@mantine/core";
import { Link } from "gatsby";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're in the browser and update the mobile state
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Check on mount
      checkMobile();
      
      // Update on resize
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return (
    <>
      {/* Standard Footer */}
      <AppShellFooter
        p="md"
        className="footer"
        style={{
          borderTop: "1px solid var(--mantine-color-dark-4)",
          background: "var(--mantine-color-dark-8)",
          backdropFilter: "blur(10px)",
          marginBottom: isMobile ? "70px" : 0, // Add space for mobile nav bar
        }}
      >
        <Container size="xl">
          <Box
            className="footer-content"
            style={{
              textAlign: "center",
              '@media (min-width: 768px)': {
                textAlign: "left",
                marginTop: 0,
              },
              marginTop: "1rem",
            }}
          >
            <SocialLinks />
            <Text
              c="dimmed"
              size="sm"
              style={{
                fontSize: "0.9rem",
                marginTop: "1rem",
              }}
            >
              © {new Date().getFullYear()} Roman Travnikov. All rights reserved.
            </Text>
          </Box>
        </Container>
      </AppShellFooter>
      
      {/* Mobile-only Fixed Bottom Navigation */}
      {isMobile && (
        <Box
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70px",
            background: "rgba(10, 15, 36, 0.95)",
            backdropFilter: "blur(10px)",
            borderTop: "2px solid rgba(61, 127, 255, 0.3)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "0 10px",
            zIndex: 1000,
            boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.25), 0 -2px 5px rgba(61, 127, 255, 0.15)",
          }}
        >
          {/* Home */}
          <Anchor
            component={Link}
            to="/"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              fontSize: "0.7rem",
              textDecoration: "none",
              padding: "8px",
              borderRadius: "8px",
              flex: 1,
            }}
          >
            <Box
              style={{
                fontSize: "1.5rem",
                marginBottom: "2px",
                color: "#3D7FFF"
              }}
            >
              🏠
            </Box>
            <Text size="xs" fw={500}>Home</Text>
          </Anchor>
          
          {/* Projects */}
          <Anchor
            component={Link}
            to="/projects"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              fontSize: "0.7rem",
              textDecoration: "none",
              padding: "8px",
              borderRadius: "8px",
              flex: 1,
            }}
          >
            <Box
              style={{
                fontSize: "1.5rem",
                marginBottom: "2px",
                color: "#3D7FFF"
              }}
            >
              📂
            </Box>
            <Text size="xs" fw={500}>Projects</Text>
          </Anchor>
          
          {/* Contact - Highlighted */}
          <Anchor
            component={Link}
            to="/contact"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "linear-gradient(135deg, #3D7FFF, #A64DFF)",
              color: "white",
              fontSize: "0.7rem",
              textDecoration: "none",
              padding: "10px 15px",
              borderRadius: "16px",
              marginTop: "-30px", // Overlap the bar
              boxShadow: "0 5px 20px rgba(61, 127, 255, 0.4)",
              border: "3px solid rgba(10, 15, 36, 0.95)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              style={{
                fontSize: "1.8rem",
                marginBottom: "2px",
              }}
            >
              📞
            </Box>
            <Text size="xs" fw={700}>Contact</Text>
          </Anchor>
          
          {/* Blog */}
          <Anchor
            component={Link}
            to="/blog"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              fontSize: "0.7rem",
              textDecoration: "none",
              padding: "8px",
              borderRadius: "8px",
              flex: 1,
            }}
          >
            <Box
              style={{
                fontSize: "1.5rem",
                marginBottom: "2px",
                color: "#3D7FFF"
              }}
            >
              📝
            </Box>
            <Text size="xs" fw={500}>Blog</Text>
          </Anchor>
          
          {/* Experiments */}
          <Anchor
            component={Link}
            to="/experiments"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              fontSize: "0.7rem",
              textDecoration: "none",
              padding: "8px",
              borderRadius: "8px",
              flex: 1,
            }}
          >
            <Box
              style={{
                fontSize: "1.5rem",
                marginBottom: "2px",
                color: "#3D7FFF"
              }}
            >
              🧪
            </Box>
            <Text size="xs" fw={500}>Experiments</Text>
          </Anchor>
        </Box>
      )}
    </>
  );
};

export default Footer;
