export function groupBy(array: any[], f: (any) => any): any[] {
  const groups: any = {};
  array.forEach(function (o: any) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
}
