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
} from "@mantine/core";
import BaseLayout from "../layouts/BaseLayout";
import { SEO } from "../utils/seo/SEO";
import SocialLinks from "../components/shared/SocialLinks";

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
      // In a real implementation, this would send data to Formspree or Strapi
      console.log(formValues);
      setSubmitted(true);
    }
  };

  return (
    <BaseLayout>
      <Container size="md" py="xl">
        <Stack spacing="xl">
          <Box>
            <Title order={1} mb="md">
              Contact Me
            </Title>
            <Text size="lg" mb="xl">
              Have a project in mind or want to discuss opportunities? Feel free
              to reach out!
            </Text>
          </Box>

          <Paper shadow="md" p="xl" radius="md" withBorder>
            {submitted ? (
              <Stack align="center" spacing="md" p="md">
                <Title order={2} align="center">
                  Message Sent!
                </Title>
                <Text align="center" size="lg">
                  Thank you for your message. I'll get back to you as soon as
                  possible.
                </Text>
                <Button onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </Stack>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing="md">
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
          </Paper>

          <Box py="xl">
            <Title order={2} mb="xl" align="center">
              Connect with me on social media
            </Title>
            <Group justify="center">
              <SocialLinks size="xl" />
            </Group>
          </Box>
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
