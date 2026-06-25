const formatCreatedAt = createdAt =>
  new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export { formatCreatedAt };
