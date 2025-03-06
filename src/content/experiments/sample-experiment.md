---
title: "Interactive Particle System"
slug: "interactive-particle-system"
description: "An interactive particle system that responds to mouse movement and music, creating a visually engaging experience."
featuredImage: "/experiments/particle-system.gif"
demoUrl: "https://codepen.io/travnikovdev/full/example123"
technologies: ["Three.js", "Web Audio API", "GLSL Shaders"]
---

# Interactive Particle System

## Overview

This experiment creates an interactive particle system that responds to both mouse movement and music. The particles dynamically react to audio frequencies, creating a visually engaging experience that bridges visual and auditory senses.

## Technical Details

The experiment uses Three.js for rendering, the Web Audio API for audio analysis, and custom GLSL shaders for particle effects. The system can handle up to 100,000 particles with smooth performance on modern browsers.

## Code Sample

```javascript
// Create particle system
const particleSystem = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAudioFrequencies: { value: new Float32Array(128) },
      uMousePosition: { value: new THREE.Vector2() }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uAudioFrequencies[128];
      uniform vec2 uMousePosition;
      
      attribute float audioIndex;
      
      varying vec3 vColor;
      
      void main() {
        // Get audio frequency for this particle
        float freqValue = uAudioFrequencies[int(audioIndex)];
        
        // Calculate position based on audio and mouse
        vec3 pos = position;
        pos.x += sin(uTime * 0.5 + position.z) * freqValue * 0.2;
        pos.y += cos(uTime * 0.5 + position.x) * freqValue * 0.2;
        
        // Mouse influence
        float distToMouse = distance(uMousePosition, vec2(pos.x, pos.y));
        float mouseInfluence = smoothstep(1.0, 0.0, distToMouse / 2.0);
        pos.z += mouseInfluence * freqValue * 2.0;
        
        // Set position and color
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = freqValue * 8.0 + 1.0;
        
        vColor = vec3(freqValue * 0.8, mouseInfluence * 0.7, 0.6);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // Draw a circle for each particle
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;
        
        gl_FragColor = vec4(vColor, 1.0);
      }
    `,
    transparent: true
  })
);
```

## How It Works

1. Audio is captured from either a microphone input or an audio file
2. The Web Audio API analyzes the audio frequencies in real-time
3. These frequencies are passed to the shader as uniforms
4. Each particle is assigned to a specific frequency band
5. The particles move and change color based on their frequency's amplitude
6. Mouse position is tracked and influences the particles' behavior

## Challenges

The main challenge was optimizing the performance to handle a large number of particles. This was addressed by:

1. Using instanced rendering with buffer geometries
2. Implementing an octree for efficient mouse interaction
3. Limiting expensive calculations to the GPU via custom shaders
4. Applying level-of-detail techniques based on viewport size