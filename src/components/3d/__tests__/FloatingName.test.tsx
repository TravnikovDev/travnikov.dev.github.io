import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Canvas } from '@react-three/fiber';
import FloatingName from '../FloatingName';

// Mock Three.js-specific features
jest.mock('@react-three/drei', () => ({
  Float: ({ children }: { children: React.ReactNode }) => <group>{children}</group>,
  Text3D: ({ children }: { children: React.ReactNode }) => <group>{children}</group>,
}));

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

describe('FloatingName', () => {
  it('renders without crashing', () => {
    render(
      <Canvas>
        <FloatingName />
      </Canvas>
    );
  });
});