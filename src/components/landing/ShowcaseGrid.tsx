import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Title,
  Modal,
  Box,
  AspectRatio,
  Center,
} from "@mantine/core";
import { IconType } from "react-icons";
import { FaCogs } from "react-icons/fa";
import * as styles from "./ShowcaseGrid.module.css";

export type ShowcaseItem = {
  id: string | number;
  title: string;
  image?: string; // url or local path
  icon?: React.ReactElement<IconType> | null; // react-icon element (preferred if image missing)
  /** optional external link — if provided, clicking the tile opens this URL in a new tab */
  url?: string;
  description?: string;
  alt?: string;
};

export type ShowcaseGridProps = {
  items: ShowcaseItem[];
};

export default function ShowcaseGrid({ items }: ShowcaseGridProps) {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<ShowcaseItem | null>(null);

  const open = (item: ShowcaseItem) => {
    if (item.url) {
      // open external links in new tab
      try {
        window.open(item.url, "_blank", "noopener,noreferrer");
      } catch (e) {
        // fallback
        window.location.href = item.url;
      }
      return;
    }

    setActive(item);
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
    setTimeout(() => setActive(null), 250);
  };

  return (
    <Box className={styles.showcaseGrid}>
      {items.map((item) => {
        const content = (
          <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            className={styles.card}
          >
            <Box className={styles.inner}>
              <AspectRatio ratio={1} className={styles.aspect}>
                <Center>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt ?? item.title}
                      fit="contain"
                    />
                  ) : item.icon ? (
                    <Box className={styles.iconBox}>
                      {React.isValidElement(item.icon)
                        ? React.cloneElement(
                            item.icon as React.ReactElement<any>,
                            {
                              style: { width: "100%", height: "100%" },
                            }
                          )
                        : item.icon}
                    </Box>
                  ) : (
                    <Box className={styles.iconBox}>
                      <FaCogs />
                    </Box>
                  )}
                </Center>
              </AspectRatio>

              <Text className={styles.title} size="sm">
                {item.title}
              </Text>
            </Box>
          </Card>
        );

        // If item has an external url, render as plain anchor for SEO/crawlability.
        if (item.url) {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              {content}
            </a>
          );
        }

        return (
          <div
            key={item.id}
            className={styles.cardWrapper}
            onClick={() => open(item)}
          >
            {content}
          </div>
        );
      })}
      <Modal opened={opened} onClose={close} size="lg" centered>
        {active ? (
          <Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Title order={3}>{active.title}</Title>
            </Box>

            <Box className={styles.modalMedia}>
              <AspectRatio ratio={16 / 9}>
                <Center>
                  {active.image ? (
                    <Image
                      src={active.image}
                      alt={active.alt ?? active.title}
                      fit="contain"
                    />
                  ) : active.icon ? (
                    <Box className={styles.iconBoxLarge}>
                      {React.isValidElement(active.icon)
                        ? React.cloneElement(
                            active.icon as React.ReactElement<any>,
                            {
                              style: { width: "100%", height: "100%" },
                            }
                          )
                        : active.icon}
                    </Box>
                  ) : (
                    <Box className={styles.iconBoxLarge}>
                      <FaCogs />
                    </Box>
                  )}
                </Center>
              </AspectRatio>
            </Box>

            {active.description ? (
              <Text mt="md" size="sm">
                {active.description}
              </Text>
            ) : null}
          </Box>
        ) : null}
      </Modal>
    </Box>
  );
}
