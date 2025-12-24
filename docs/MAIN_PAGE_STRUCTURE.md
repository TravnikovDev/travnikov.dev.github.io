# Main Page Component Structure

This document reflects the current component hierarchy in `src/pages/index.tsx`.

## Component Hierarchy

```
<BaseLayout>
  <Header />
  <AppShell.Main>
    <ThreeDBackground />
    <Box className="mainContent">
      <section>
        <HeroSection />
      </section>

      <section>
        <LandingSection title="Projects">
          <ShowcaseGrid />
        </LandingSection>
      </section>

      <section>
        <LandingSection title="Open Source">
          <ShowcaseGrid />
        </LandingSection>
      </section>

      <section>
        <LandingSection title="Chrome extensions">
          <ShowcaseGrid />
        </LandingSection>
      </section>

      <section>
        <LandingSection title="Professional Experience">
          <ShowcaseGrid />
        </LandingSection>
      </section>

      <section>
        <LandingSection title="Skills">
          <ShowcaseGrid />
        </LandingSection>
      </section>

      <div className="scrollProgressIndicator" />
    </Box>
  </AppShell.Main>
  <Footer />
</BaseLayout>
```

## Component Descriptions

### Layout Components

- **BaseLayout**: Main layout wrapper (Mantine `AppShell`) with `Header`, `AppShell.Main`, and `Footer`.
- **Header**: Site branding and nav (sticky on scroll).
- **Footer**: Social links and copyright.

### Page-Specific Components

- **ThreeDBackground**: Renders the 3D scene behind content.
- **HeroSection**: Intro block at the top of the page.
- **LandingSection**: Wrapper used for all subsections (title, optional description, children).
- **ShowcaseGrid**: Grid of items (projects, links, work history, skills). Items with `url` are anchors, others open a modal.
- **scrollProgressIndicator**: Horizontal bar showing scroll progress at the top of the page.

## Notes

Some subsections exist in code but are currently commented out:
- My apps
- YouTube widget
- What I can help you with
