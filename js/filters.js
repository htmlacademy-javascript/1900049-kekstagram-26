const filters = {
  'filter-default': (picture) => picture,
  'filter-random': (picture) => {
    const shuffled = [...picture].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    return selected;
  },
  'filter-discussed': (picture) =>
    [...picture].sort(
      (current, prev) => prev.comments.length - current.comments.length
    ),
};

export { filters };
