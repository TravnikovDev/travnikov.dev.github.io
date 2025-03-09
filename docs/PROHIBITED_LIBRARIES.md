# Prohibited Libraries

This document lists libraries that are prohibited from use in this project.

## List of Prohibited Libraries

1. **framer-motion**
   - Reason: No usal animaitons should be used in project. Only 3d
   - Alternative suggestions: react three.js should be used instead

2. **lodash**
   - Reason: Modern JavaScript provides native alternatives to most lodash functions
   - Alternative suggestions: Use native JavaScript array/object methods (e.g., map, filter, reduce, Object.entries, etc.) or more efficent libraries like ramda js

3. **gsap**
   - Reason: Project focuses on 3D animations using Three.js
   - Alternative suggestions: Use @react-three/fiber and @react-three/drei for animations

4. **CSS-in-JS Libraries** (@emotion/react, styled-components, etc.)
   - Reason: Project should use standard CSS/SCSS for styling
   - Alternative suggestions: Use regular CSS modules or SCSS

## Guidelines

When developing new features or modifying existing code:
- Do not add these libraries as dependencies
- Remove any existing imports or usage of these libraries
- Use recommended alternatives instead

This list may be updated as project requirements evolve.