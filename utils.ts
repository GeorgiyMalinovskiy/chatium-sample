const getFactor = (rating: number) => {
  let K = 0;
  switch (true) {
    case rating >= 2400:
      K = 10;
      break;
    case rating > 1200:
      K = 20;
      break;
    default:
      K = 40;
  }

  return K;
};

const calcExpectedRating = (ratingA: number, ratingB: number) => {
  return 1 / (1 + 10 ** ((ratingB - ratingA) / 400));
};

export const calcRatings = (ratingA: number, ratingB: number) => {
  const nextRatingA = Math.round(
    ratingA + getFactor(ratingA) * (1 - calcExpectedRating(ratingA, ratingB))
  );
  const nextRatingB = Math.round(
    ratingA + getFactor(ratingB) * (0 - calcExpectedRating(ratingB, ratingA))
  );
  return [nextRatingA, nextRatingB];
};

export const getChoiceIndexes = (length: number) => {
  if (length < 2) return null;

  const indexes = new Set<number>();
  while (indexes.size < 2) {
    indexes.add(Math.floor(Math.random() * length));
  }

  return Array.from(indexes);
};
