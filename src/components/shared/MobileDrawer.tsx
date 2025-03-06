import React from 'react';
import { 
  Drawer, 
  Divider, 
  Stack, 
  Paper, 
  Button, 
  Title,
  Group,
  ActionIcon,
  Text,
  Tooltip,
  Box
} from '@mantine/core';
import { Link } from 'gatsby';
import { gradientShift, glowPulse } from './AnimationKeyframes';
import { isActive } from './utils';
import { navItems, socialLinks } from './NavItems';

interface MobileDrawerProps {
  opened: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ opened, onClose }) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="100%"
      padding="xl"
      title={
        <Title 
          order={2}
          sx={{
            background: 'var(--mantine-primary-gradient)',
            backgroundSize: '200% 200%',
            animation: `${gradientShift} 5s ease infinite`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}
        >
          travnikov.dev
        </Title>
      }
      zIndex={1000}
      overlayProps={{ opacity: 0.7, blur: 2 }}
      transitionProps={{ duration: 300, transition: 'slide-right' }}
    >
      <Divider 
        my="lg" 
        labelPosition="center" 
        size="md"
        sx={{ 
          opacity: 0.5,
          '&::before, &::after': {
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          } 
        }}
      />
      
      <Stack spacing="sm" mb={40}>
        {[
          { label: 'Home', path: '/' },
          ...navItems,
          { label: 'Contact', path: '/contact', color: 'primary' }
        ].map((item, index) => (
          <Paper
            key={item.path}
            shadow="sm"
            radius="md"
            p={0}
            sx={{
              overflow: 'hidden',
              transition: 'transform 0.2s ease',
              transform: isActive(item.path) ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <Button 
              component={Link} 
              to={item.path}
              fullWidth
              size="xl"
              radius="md"
              variant={isActive(item.path) ? "gradient" : "subtle"}
              gradient={isActive(item.path) ? { from: 'primary', to: 'secondary', deg: 45 } : undefined}
              onClick={onClose}
              sx={{
                height: 60,
                fontSize: '1.2rem',
                fontWeight: 600,
                boxShadow: isActive(item.path) ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
                animation: isActive(item.path) ? `${glowPulse} 3s infinite` : 'none',
              }}
            >
              {item.label}
            </Button>
          </Paper>
        ))}
      </Stack>
      
      <Divider 
        my="xl" 
        label="Connect with me" 
        labelPosition="center"
        labelProps={{ 
          size: 'lg',
          weight: 600,
          sx: { 
            opacity: 0.8,
            color: 'var(--mantine-color-primary-5)',
          }
        }}
        size="sm"
        sx={{ 
          opacity: 0.5,
          '&::before, &::after': {
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          } 
        }}
      />
      
      <Group justify="center" my="xl" gap="xl">
        {socialLinks.map((link, index) => (
          <Tooltip 
            key={link.name} 
            label={link.name}
            position="bottom"
            withArrow
          >
            <ActionIcon 
              component="a" 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              variant="light"
              size={60}
              radius="xl"
              sx={{
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-5px)',
                  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15), 0 0 15px ${link.hoverColor}40`,
                }
              }}
            >
              <Text size={30}>{link.icon}</Text>
            </ActionIcon>
          </Tooltip>
        ))}
      </Group>
    </Drawer>
  );
};

export default MobileDrawer;