export default function checkImage(media) {
  const placeholderMedia = {
    url: "/images/0_0 (8).webp",
    alt: "Statue bust decoration",
  };

  if (!media || media === null) {
    return placeholderMedia;
  }

  return media;
}
