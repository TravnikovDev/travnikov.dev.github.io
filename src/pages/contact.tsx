import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Title,
  Text,
  Container,
  Paper,
  Stack,
  Grid,
} from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import SocialLinks from "../components/shared/SocialLinks";
import * as styles from "./contact.module.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (formValues.name.trim().length < 2) {
      newErrors.name = "Name must have at least 2 characters";
      isValid = false;
    }

    if (!/^\S+@\S+$/.test(formValues.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    if (formValues.subject.trim().length < 2) {
      newErrors.subject = "Subject must have at least 2 characters";
      isValid = false;
    }

    if (formValues.message.trim().length < 10) {
      newErrors.message = "Message must have at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real implementation, this would send data to Strapi
      console.log(formValues);
      setSubmitted(true);
    }
  };

  return (
    <BaseLayout>
      <Container size="xl">
        <Stack className={styles.stack}>
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack align="center" p="md" className={styles.stackInner}>
                <Title order={2} className={styles.title}>
                  Get in Touch
                </Title>
                <Text className={styles.text} size="lg">
                  Have a project in mind? Let's talk about it.
                </Text>
                <Stack className={styles.formStack}>
                  {submitted ? (
                    <Stack align="center" p="md">
                      <Title order={2}>Message Sent!</Title>
                      <Text size="lg">
                        Thank you for your message. I'll get back to you as soon
                        as possible.
                      </Text>
                      <Button onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </Stack>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <Stack>
                        <TextInput
                          label="Name"
                          name="name"
                          placeholder="Your name"
                          required
                          value={formValues.name}
                          onChange={handleChange}
                          error={errors.name}
                        />
                        <TextInput
                          label="Email"
                          name="email"
                          placeholder="your.email@example.com"
                          required
                          value={formValues.email}
                          onChange={handleChange}
                          error={errors.email}
                        />
                        <TextInput
                          label="Subject"
                          name="subject"
                          placeholder="Subject of your message"
                          required
                          value={formValues.subject}
                          onChange={handleChange}
                          error={errors.subject}
                        />
                        <Textarea
                          label="Message"
                          name="message"
                          placeholder="Your message here..."
                          minRows={5}
                          required
                          value={formValues.message}
                          onChange={handleChange}
                          error={errors.message}
                        />
                        <Button type="submit" size="lg" fullWidth mt="md">
                          Send Message
                        </Button>
                      </Stack>
                    </form>
                  )}
                </Stack>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper shadow="md" p="xl" radius="md">
                <Title order={2} mb="xl" className={styles.title}>
                  Other Ways to Connect
                </Title>
                <Box py="xl">
                  <Title order={2} mb="xl">
                    Connect with me on social media
                  </Title>
                  <Group justify="center">
                    <SocialLinks size="xl" />
                  </Group>
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </BaseLayout>
  );
}

export function Head() {
  return (
    <SEO
      title="Contact"
      description="Get in touch with Roman Travnikov. Send a message or connect through social media for project inquiries or professional opportunities."
    />
  );
}
