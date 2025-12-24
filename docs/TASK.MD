# TASK: Personal Website Development (Travnikov.dev)

## Status (Current Codebase)
- Implemented: Gatsby landing page with `HeroSection`, `LandingSection`, `ShowcaseGrid`, and 3D background.
- Implemented: Static data for projects, experience, and skills on the home page.
- Not implemented: Blog, Experiments, Contact pages, Strapi CMS, n8n automations.


## Overview
Rework current repo and Develop a personal website that showcases **Roman Travnikov** as a **senior frontend developer** with **10+ years of experience**. The website should serve as a **personal brand**, highlight **projects and achievements**, and include **playful, interactive 3D animations** to create a **"wow effect"**. It should be optimized for **SEO, performance, and accessibility**, ensuring Roman ranks high when people search for "Travnikov" on Google.

## Core Requirements

### 1. **Technology Stack**
- **Static Site Generator**: Use **Gatsby** (current)
- **UI Framework**: [Mantine UI](https://mantine.dev/) (current)
- **3D & Animations**: Use **Three.js** (via React Fiber) (current)
- **Headless CMS**: Use **Strapi** (planned)
- **Deployment**: GitHub Pages (CI/CD via GitHub Actions) (planned)
- **SEO Optimization**: Schema.org microformats, JSON-LD structured data (planned)
- **Performance Optimization**: Core Web Vitals (planned)

---

### 2. **Website Sections & Features**
#### **2.1 Main Page (Landing Page)**
- **Objective**: Create a powerful first impression with animations.
- **Objective**: Tell Roman's story in an engaging way.
- **Features**:
  - **Interactive 3D Element**: animations (Three.js)
  - **Creative intro**: First-person storytelling about Roman
  - **SEO Optimized Bio**: Use structured data (JSON-LD)
  - **Social Links**: GitHub, LinkedIn, Email, Instagram
  - **CTA (Call to Action)**: Hire me, Contact me, Explore projects
  - **Timeline Animation**: Show career progress visually
  - **Dynamic Content**: Fetch career data from Strapi
  - **Photo Section**: Include personal elements (sports, travel, tech passion)
  - **Featured Tech Stack**: Show key skills visually (React, TypeScript, Git, etc.)

#### **2.2 Projects Showcase (Indie Hacker Portfolio)**
- **Objective**: Display all projects (indie apps, browser extensions, e-commerce work, freelance work, and full-time roles).
- **Features**:
  - **Intro section**: Short personal note about indie hacking
  - **Dynamic Grid Layout**: 3 tiles per row with icons & titles
  - **Project Categories**: E-commerce, Browser Extensions, Apps, Freelance & Full-time Jobs
  - **Hover Effects**: Subtle animations when hovering over projects
  - **Click to Expand**: Show more details without leaving the page

#### **2.3 Blog (SEO & Content Strategy)**
- **Objective**: Establish thought leadership and improve SEO ranking.
- **Features**:
  - **Markdown-Based Blog**: Easy publishing from Strapi
  - **Circular Linking Strategy**: Articles should reference each other
  - **Related Posts Section**: Boost engagement
  - **Dark Mode Toggle**: Improve readability
  - **Search Bar**: Quick access to content

#### **2.4 Experiments (Playground for Web Creativity)**
- **Objective**: Showcase fun and innovative frontend experiments.
- **Features**:
  - **List of Interactive Web Experiments**
  - **Live Demos with GIF Previews**
  - **Code Snippets**: Easy-to-copy sections
  - **Tech Stack Tags**: Labeling for filtering (e.g., "React," "Three.js")

  
#### **2.6 Contact Page**
- **Objective**: Make it easy for potential employers or clients to reach out.
- **Features**:
  - **Contact Form**: Integrated with Strapi Webhooks
  - **Social Media Links**: GitHub, LinkedIn, Instagram
  - **Interactive Map (Optional)**: Fun visualization of "Travnikov's Journey"
  
---

### 3. **Animations & Effects**
- **Three.js / React Fiber**: Interactive 3D elements on the homepage
- **Smooth Page Transitions**: Enhance user experience
- **Parallax Scrolling**: On landing and project showcase pages

---

### 4. **Performance & SEO Optimization**
- **Lazy Loading**: Optimize images & scripts (planned)
- **Minified CSS & JS**: Reduce load time (Gatsby build handles this)
- **Pre-rendered HTML**: Gatsby pre-rendering (current)
- **JSON-LD Markup**: Enhance search ranking (planned)
- **Core Web Vitals Focus**: Fast load, low CLS, quick FCP (planned)
- **Alt Text & ARIA Labels**: Improve accessibility (planned)

---

### 5. **Backend & CMS Integration** (Planned)
- **Strapi CMS**:
  - **Content Types**: Blog, Projects, Experiments, About, Contact
  - **API Endpoints**: REST + GraphQL for Gatsby integration
  - **Webhook for GitHub Actions**: Auto-deploy on content updates
- **n8n Automation**:
  - Auto-trigger GitHub Actions when publishing new content
  - Auto-post new blogs to LinkedIn & VK
  - Auto-backup content to Google Drive

---

### 6. **Deployment & Hosting**
- **GitHub Pages**: Use Actions for automated deployment
- **Cloudflare Caching**: Improve speed
- **Custom Domain (travnikov.dev)**: Configure HTTPS & DNS
- Project currently exists as github repo: https://github.com/TravnikovDev/travnikov.dev.github.io
- And connected to domain: https://travnikov.dev

---

## Conclusion
This project will create a **unique, high-performance** personal website that:
- **Showcases Roman's skills & journey** in an interactive way
- **Uses cutting-edge frontend trends** for 2025
- **Ensures SEO dominance** for "Travnikov"
- **Automates content management** via Strapi + n8n
- **Loads super fast & follows best practices** for UX and accessibility

This site will not only be a **portfolio** but also a **digital playground** that reflects Roman’s **skills, passion, and personality**!
