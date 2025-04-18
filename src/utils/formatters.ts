import type { Profile } from 'src/db/schema/profile';

export function shortName(fullName: Profile['fullName']) {
  const parts = fullName.split(' ');
  if (parts.length < 2 || !parts[1]) {
    return fullName;
  }
  return `${parts[0]} ${parts[1][0]}`;
}
