# Prohibited Libraries

This document lists libraries that are prohibited from use in this project.

## List of Prohibited Libraries

1. **framer-motion**
   - Reason: No usal animaitons should be used in project. Only 3d
   - Alternative suggestions: react three.js should be used instead

2. **lodash**
   - Reason: Modern JavaScript provides native alternatives to most lodash functions
   - Alternative suggestions: Use native JavaScript array/object methods (e.g., map, filter, reduce, Object.entries, etc.) or more efficent libraries like ramda js

## Guidelines

When developing new features or modifying existing code:
- Do not add these libraries as dependencies
- Remove any existing imports or usage of these libraries
- Use recommended alternatives instead

This list may be updated as project requirements evolve.