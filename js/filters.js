export const filters = {
  'filter-default': (keks) => keks,
  'filter-random': (keks) => {
    const shuffled = [...keks].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    return selected;
  },
  'filter-discussed': (keks) => [...keks].sort((current, prev) => prev.comments.length - current.comments.length),
};
