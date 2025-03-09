# Main Page Component Structure

This document outlines the component hierarchy of the main page of travnikov.dev, showing how all components are nested from the top level.

## Component Hierarchy

```
<BaseLayout>
  <Header />
  <AppShell.Main>
    <ParallaxBackground />
    <Box>
      <ParallaxSection>
        <HeroSection />
      </ParallaxSection>
      
      <ParallaxDivider />
      
      <ParallaxSection>
        <TimelineSection />
      </ParallaxSection>
      
      <ParallaxDivider />
      
      <ParallaxSection>
        <TechStackSection />
      </ParallaxSection>
      
      <div className="scrollProgressIndicator" />
    </Box>
  </AppShell.Main>
  <Footer />
</BaseLayout>
```

## Component Descriptions

### Layout Components

- **BaseLayout**: The main layout wrapper that contains the entire page structure
  - Uses Mantine's `AppShell` component for the base layout
  - Contains `Header`, `AppShell.Main`, and `Footer`

- **Header**: Navigation and site branding component
  - Contains the site logo and navigation links
  - Becomes sticky when scrolling down

- **Footer**: Page footer with contact information and links
  - Located at the bottom of every page
  - Contains social links and copyright information

### Page-Specific Components

- **ParallaxBackground**: Creates animated background elements with parallax scrolling effects
  - Contains multiple decorative divs that move at different speeds when scrolling
  - Includes gradient circles, blobs, animated grid pattern, and gradient lines

- **ParallaxSection**: Wrapper component for section content with animation on scroll
  - Props: `delay`, `offsetY`, `speed` to control animation behavior
  - Uses Intersection Observer to trigger animations when elements come into view

- **ParallaxDivider**: Visual divider between main content sections
  - Creates a subtle animated separator between content sections

- **HeroSection**: Main landing section with personal introduction
  - First section visitors see
  - Contains 3D animation, name, title, and brief introduction

- **TimelineSection**: Section displaying professional experience timeline
  - Shows career progression with dates, positions, and companies
  - Animated elements that appear on scroll

- **TechStackSection**: Section showcasing technical skills and tools
  - Displays various technologies and proficiency levels
  - Organized by categories like frontend, backend, etc.

- **scrollProgressIndicator**: Visual indicator of scroll progress
  - Horizontal bar that fills as the user scrolls down the page