import { GatsbyNode } from 'gatsby';
import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'content' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define templates
  const blogTemplate = path.resolve('./src/templates/BlogTemplate.tsx');
  const projectTemplate = path.resolve('./src/templates/ProjectTemplate.tsx');

  // Query for local markdown files
  const result = await graphql<{
    allMarkdownRemark: {
      nodes: Array<{
        id: string;
        fields: {
          slug: string;
        };
        frontmatter: {
          template: string;
        };
      }>;
    };
  }>(`
    query {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            template
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pages for markdown files
  const markdownPages = result.data?.allMarkdownRemark.nodes || [];
  markdownPages.forEach((page) => {
    const template = page.frontmatter.template === 'blog' ? blogTemplate : projectTemplate;
    createPage({
      path: page.fields.slug,
      component: template,
      context: {
        id: page.id,
      },
    });
  });
};
