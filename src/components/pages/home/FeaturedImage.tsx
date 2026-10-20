"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import type { HomepageData } from "@/types/homepage";

type Props = {
  data: HomepageData["featuredImage"];
};

const FeaturedImage = ({ data }: Props) => {
  const { scrollY } = useScroll();

  const paddingX = useTransform(scrollY, [0, 300], [0, 32], {
    clamp: true,
  });

  const image = data.image;
  const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL;

  const imageUrl = image.url.startsWith("http")
    ? image.url
    : new URL(
        image.url,
        payloadUrl?.endsWith("/") ? payloadUrl : `${payloadUrl}/`,
      ).toString();

  return (
    <section className="w-full">
      <motion.div
        style={{
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
        className="max-md:px-0!"
      >
        <Image
          src={imageUrl}
          alt={data.alt || image.alt || "Featured image"}
          width={image.width ?? 1920}
          height={image.height ?? 1080}
          priority
          className="h-auto w-full object-cover"
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
};

export default FeaturedImage;
