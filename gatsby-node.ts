import { GatsbyNode } from 'gatsby';
import path from 'path';

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define templates
  const blogTemplate = path.resolve('./src/templates/BlogTemplate.tsx');
  const projectTemplate = path.resolve('./src/templates/ProjectTemplate.tsx');

  // Temporarily disabled Strapi content creation
  // Will be replaced with local markdown files later
  
  // For now, create a sample blog post and project page
  // This is just to ensure the templates are working
  
  // Sample blog post
  createPage({
    path: `/blog/sample-post`,
    component: blogTemplate,
    context: {
      id: 'sample-post',
    },
  });

  // Sample project
  createPage({
    path: `/projects/sample-project`,
    component: projectTemplate,
    context: {
      id: 'sample-project',
    },
  });
  
  // Original Strapi code (commented out)
  /*
  // Query for Strapi articles and projects
  const result = await graphql<{
    allStrapiArticle: {
      nodes: Array<{
        id: string;
        slug: string;
      }>;
    };
    allStrapiProject: {
      nodes: Array<{
        id: string;
        slug: string;
      }>;
    };
  }>(`
    query {
      allStrapiArticle {
        nodes {
          id
          slug
        }
      }
      allStrapiProject {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create blog post pages
  const articles = result.data?.allStrapiArticle.nodes || [];
  articles.forEach((article) => {
    createPage({
      path: `/blog/${article.slug}`,
      component: blogTemplate,
      context: {
        id: article.id,
      },
    });
  });

  // Create project pages
  const projects = result.data?.allStrapiProject.nodes || [];
  projects.forEach((project) => {
    createPage({
      path: `/projects/${project.slug}`,
      component: projectTemplate,
      context: {
        id: project.id,
      },
    });
  });
  */
};