import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import { Box, Title, Text, Button, Center, Stack } from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import * as styles from './404.module.css';

const NotFound = (_props: PageProps) => (
  <BaseLayout>
    <Center h="60vh" className={styles.center}>
      <Stack align="center" className={styles.stack}>
        <Title order={1} size="3rem" className={styles.title}>
          404: Page Not Found
        </Title>
        <Text size="lg" className={styles.text}>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </Text>
        <Box mt="md" className={styles.box}>
          <Button component={Link} to="/" size="lg" className={styles.button}>
            Go back home
          </Button>
        </Box>
      </Stack>
    </Center>
  </BaseLayout>
);

export default NotFound;

export const Head: HeadFC = () => <SEO title="404: Not Found" />;
