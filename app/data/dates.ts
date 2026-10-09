export interface Gig { date: string, artist: string, venue: string, city: string }

export const dates: Gig[] = [
  { date: 'SAT 17 OCT', artist: 'vela-nox', venue: 'Bunker 9 — closing', city: 'Berlin' },
  { date: 'FRI 23 OCT', artist: 'mothbass', venue: 'The Vault', city: 'Bristol' },
  { date: 'SAT 31 OCT', artist: 'sable-ash', venue: 'Pier 4', city: 'Rotterdam' },
  { date: 'SAT 07 NOV', artist: 'kore', venue: 'Armazém 12', city: 'Lisbon' },
  { date: 'FRI 13 NOV', artist: 'tarmac-saints', venue: 'Cellar Room', city: 'Glasgow' },
  { date: 'SAT 14 NOV', artist: 'vela-nox', venue: 'Armazém 12', city: 'Lisbon' },
  { date: 'SUN 22 NOV', artist: 'kore', venue: 'Bunker 9 — Sunday', city: 'Berlin' },
  { date: 'FRI 27 NOV', artist: 'ines-dolor', venue: 'Sala Sótano', city: 'Madrid' },
  { date: 'FRI 04 DEC', artist: 'vela-nox', venue: 'Hala Sever', city: 'Prague' },
  { date: 'FRI 11 DEC', artist: 'kore', venue: 'Depo Hall', city: 'Tbilisi' }
]

export const datesFor = (slug: string) => dates.filter(d => d.artist === slug)
