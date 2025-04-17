import type { Profile } from 'src/db/schema/profile';

export function shortName(fullName: Profile['fullName']) {
  const parts = fullName.split(' ');
  return `${parts[0]} ${parts[1][0]}`;
}
