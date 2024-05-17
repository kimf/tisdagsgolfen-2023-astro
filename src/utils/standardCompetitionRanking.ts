const rankingFn = (start: number, length: any) => ({
  current: Array(length).fill(start),
  next: start + length,
});

export default function standardCompRank(items: any[], attribute: string, reverse = true) {
  let buckets = [];

  items.forEach((item) => {
    const score = item[attribute];
    if (buckets[score]) {
      buckets[score].push(item);
    } else {
      buckets[score] = [item];
    }
  });

  // convert to array for sorting
  buckets = Object.entries(buckets);

  const compareFn = reverse
    ? (a: number[], b: number[]) => a[0] - b[0]
    : (a: number[], b: number[]) => b[0] - a[0];
  // sort based on the score
  buckets.sort(compareFn);

  // assign ranks
  const ranked = [];
  let rank = { next: 1, current: [] };
  buckets.forEach((b: any[]) => {
    const bucket = b[1];
    rank = rankingFn(rank.next, bucket.length);
    bucket.forEach((item: any, index: string | number) => {
      ranked.push({ rank: rank.current[index], ...item });
    });
  });

  return ranked;
}
