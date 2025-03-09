# Build & Development Commands
- `npm run develop` or `npm start`: Start development server
- `npm run build`: Build production version
- `npm run serve`: Serve production build locally
- `npm run clean`: Clear cache and public directories
- `npm run typecheck`: Run TypeScript checks

# Code Style Guidelines
- **Components**: Use functional components with React.FC type
- **File Naming**: PascalCase for components (e.g., `Header.tsx`)
- **Imports**: Group external libraries first, then internal imports
- **Styling**: Use Mantine UI components and Emotion for CSS-in-JS
- **Animations**: Use Framer Motion and custom Emotion keyframes
- **Types**: Define prop interfaces at the top of component files
- **3D Elements**: Use React Three Fiber for 3D components
- **Structure**: Organize by feature/purpose in appropriate directories
- **State Management**: Use React hooks (useState, useEffect, useRef)
- **Error Handling**: Use try/catch for async operations