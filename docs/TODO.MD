This is a clear roadmap. You are moving from a **"Generalist Developer Portfolio"** to a **"Specialized Expert Hub."**

The key shift here is psychological: A portfolio says *"Look at what I can do."* A personal brand website says *"Here is exactly how I can solve your problem."*

Since you want the "core" to remain static and are deferring the Strapi/n8n pipeline, we will build the **Service Silos** as static Gatsby pages first. This is smart—it preserves your speed and SEO scores while allowing you to iterate on copy.

Here is your **Personal Brand Pivot Guideline**.

### **Phase 1: The Strategic Clean-Up**

*Goal: Remove the noise that signals "freelancer looking for any work" and focus on "expert selling solutions."*

1. **Deprecate "Generalist" Sections:**
* Comment out/remove the **Skills** section (Don't list "HTML/CSS"—it implies you are junior. Your expertise should be implied by the content).
* Comment out **Chrome Extensions** from the home page (Move these to a dedicated "Labs" or "Open Source" sub-page later. They distract from the high-ticket funnel).


2. **Rename Navigation:**
* *Current:* Projects | Blog | Experiments | Contact
* *New header:* **AI Automation** | **Web Performance** | **Fractional CTO** | **Insights**
* *Footer:* Home | Case Studies | Contact | Experiments



### **Phase 2: The New `index.tsx` (The Router)**

*Goal: The Homepage is no longer a resume. It is a traffic controller sending users to your 3 Authority Pillars.*

**Section 1: The Hero (Value Proposition)**

* **Action:** Update the Hero text.
* **Copy Logic:** "I engineer autonomous AI systems and high-performance web architecture for startups."
* **Visual:** Keep the **Three.js/R3F background**. It is a powerful "Show, Don't Tell" signal of your frontend mastery.

**Section 2: The "3 Vectors" (The Core Pivot)**

* *Design:* Three distinct interactive cards/columns.
* *Action:* Create a new component `ServiceVector.tsx` to replace "Professional Experience."
* *Structure:*
1. **Vector A: AI Automation**
* *Keyword Link:* `/ai-automation-engineer`
* *Hook:* "I replace manual operations with intelligent n8n workflows and AI Agents."


2. **Vector B: Web Architecture**
* *Keyword Link:* `/react-performance-consulting`
* *Hook:* "I build scalable, sub-second React applications and Gatsby systems."


3. **Vector C: Strategic Consulting**
* *Keyword Link:* `/fractional-cto`
* *Hook:* "Fractional CTO services to bridge the gap between business goals and tech stacks."





**Section 3: Recent Insights (Static Stub)**

* *Action:* Query the *latest 3* Markdown files from your `blog` folder.
* *Logic:* Even without Strapi, you need this section *now*. Create 3 dummy markdown files representing your pillars to fill this space visually.
* *Visual:* Minimal list view: Date + Title + "Read time".

**Section 4: Selected Work (Proof)**

* *Action:* Filter your existing `ProjectsPage` query to show only the **Top 2** projects that align with the new vectors (e.g., one AI project, one high-perf web project). Hide the rest behind a "View All Case Studies" link.

---

### **Phase 3: The Static "Service Silos"**

*Goal: Create the landing targets for your home page vectors. These are static `.tsx` pages at root routes (no `/services/`).*

Create these three files in `src/pages/`:

**1. `ai-automation-engineer.tsx**`

* **Focus:** Ops, Efficiency, n8n.
* **Key Section:** "The Automation Stack" (Visual of n8n + OpenAI + Supabase).
* **CTA:** "Book a Workflow Audit."

**2. `react-performance-consulting.tsx**`

* **Focus:** Speed, SEO, User Experience.
* **Key Section:** "Performance Metrics" (Showcase Lighthouse scores or Core Web Vitals).
* **CTA:** "Audit My Architecture."

**3. `fractional-cto.tsx**`

* **Focus:** Strategy, Mentorship, Hiring.
* **Key Section:** "My Philosophy" (Brief text on how you lead teams).
* **CTA:** "Discuss Your Vision."

---

### **Implementation Checklist (Your "To-Do")**

* **Step 1 (Cleanup):**
* [x] Open `index.tsx`.
* [x] Comment out `<Skills />` and `<ChromeExtensions />`.
* [x] Rename `<Projects />` section header to "Selected Case Studies."


* **Step 2 (The Vectors):**
* [x] Create `src/components/ServiceVector.tsx`.
* [x] Implement a 3-column layout using Mantine `Grid` or `SimpleGrid`.
* [x] Insert this component immediately after the Hero in `index.tsx`.
* [x] Hardcode the 3 links to the new service pages.


* **Step 3 (The Pages):**
* [x] Create folder `src/pages/`.
* [x] Create the 3 static files (`ai-automation-engineer.tsx`, etc.).
* [x] Copy the layout from `sample-project.md` or `index.tsx` so they inherit the standard Nav/Footer.
* [x] Add a simple generic Header + Text Block + Contact Form to each for now.


* **Step 4 (Home Sections):**
* [x] Add "Recent Insights" stub pulling latest 3 blog posts.
* [x] Show top 2 case studies with a "View all case studies" link.


### **Pivot Summary**

You are stripping away the "resume" features (Skills lists, endless project grids) and replacing them with **Sales Funnels** (Vectors). Your Home Page is now a "Launchpad," not a parking lot.
