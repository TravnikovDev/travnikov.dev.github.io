# travnikov.dev

Personal website and portfolio of Roman Travnikov, a senior frontend developer with 10+ years of experience.

## 🚀 Features

- Interactive 3D animations using Three.js
- Responsive design with Mantine UI
- Blog with MDX support
- Project showcase
- Web experiments gallery
- Strapi CMS integration
- SEO optimization with structured data
- Automated deployment via GitHub Actions

## 🛠 Tech Stack

- **Frontend Framework**: Gatsby
- **UI Framework**: Mantine UI
- **3D & Animation**: Three.js (via React Fiber)
- **Headless CMS**: Strapi
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TravnikovDev/travnikov.dev.github.io.git
   cd travnikov.dev.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.development` file with the following variables:
   ```
   STRAPI_API_URL=http://localhost:1337
   STRAPI_TOKEN=your_strapi_token_here
   ```

4. Start the development server:
   ```bash
   npm run develop
   ```

5. Open [http://localhost:8000](http://localhost:8000) to view the site in your browser.

## 📝 Content Management

Content for blog posts, projects, and experiments can be managed in two ways:

1. **Markdown/MDX files**: Add files to the `src/content/` directory
2. **Strapi CMS**: Set up Strapi CMS for dynamic content management

## 🚢 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions.

To manually deploy:

1. Build the site:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## 🔍 SEO

The site includes several SEO optimizations:

- JSON-LD structured data
- Social media meta tags
- Sitemap generation
- Schema.org markup for blog posts and projects

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
