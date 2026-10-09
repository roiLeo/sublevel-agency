export interface Artist {
  slug: string
  name: string
  genre: string
  city: string
  status: 'Taking dates' | 'Limited' | 'Booked to Mar'
  tags: Genre[]
  bio: string
  fee: string
  setLength: string
  travelsFrom: string
  leadTime: string
  rider: string[]
  track: string
  image?: string
}

export const genres = ['Techno', 'Electro & breaks', 'Bass', 'Live acts'] as const
export type Genre = typeof genres[number]

export const artists: Artist[] = [
  {
    slug: 'vela-nox', name: 'Vela Nox', genre: 'Hard techno', city: 'Berlin', status: 'Taking dates', tags: ['Techno'],
    bio: "Vela Nox has played Berlin's basements since 2017. Her sets run fast and physical, 140 to 150 BPM, built on industrial texture and long, patient tension. Residencies at Bunker 9 and Armazém 12; releases on her own label, Nox Tapes.",
    fee: '€2,500–4,000', setLength: '2–4 hours, closing preferred', travelsFrom: 'Berlin (BER)', leadTime: '6 weeks minimum',
    rider: ['3 × Pioneer CDJ-3000, linked', 'Allen & Heath Xone:96 or DJM-V10', '2 booth monitors, at head height', 'No strobes during the first hour'],
    track: 'Concrete Hymn'
  },
  {
    slug: 'kore', name: 'Kórë', genre: 'Dub techno', city: 'Lisbon', status: 'Taking dates', tags: ['Techno'],
    bio: 'Kórë plays long, submerged sets of dub techno and deep minimal, usually four hours or more. Resident at Armazém 12 in Lisbon; her monthly radio show on Rádio Cave has run since 2021.',
    fee: '€1,500–2,500', setLength: '4–6 hours', travelsFrom: 'Lisbon (LIS)', leadTime: '4 weeks minimum',
    rider: ['2 × Technics SL-1210', '2 × Pioneer CDJ-3000', 'Rotary mixer (E&S, Condesa or similar)', 'Dim room lighting, no lasers'],
    track: 'Low Tide Station'
  },
  {
    slug: 'tarmac-saints', name: 'Tarmac Saints', genre: 'Electro · live', city: 'Detroit', status: 'Limited', tags: ['Electro & breaks', 'Live acts'],
    bio: 'A two-piece live electro act working entirely on hardware: drum machines, a modular case and a vocoder. Sets are 75 minutes and never repeat a running order.',
    fee: '€4,000–6,000', setLength: '75–90 minutes, live', travelsFrom: 'Detroit (DTW)', leadTime: '10 weeks minimum',
    rider: ['Table 2.4 m × 0.9 m, stage centre', '8 × DI inputs to FOH', '4 × Schuko power on stage', '30-minute changeover'],
    track: 'Woodward Ave Signal'
  },
  {
    slug: 'ines-dolor', name: 'Inés Dolor', genre: 'Breaks', city: 'Madrid', status: 'Taking dates', tags: ['Electro & breaks'],
    bio: 'Inés Dolor mixes broken beat, UK breaks and electro on vinyl and USB. Known for warm-up sets that keep the floor moving from the first record.',
    fee: '€1,500–2,500', setLength: '2–3 hours', travelsFrom: 'Madrid (MAD)', leadTime: '4 weeks minimum',
    rider: ['2 × Technics SL-1210', '2 × Pioneer CDJ-3000', 'Pioneer DJM-900NXS2 or V10', '2 booth monitors'],
    track: 'Lavapiés Breakdown'
  },
  {
    slug: 'halcyon-grid', name: 'Halcyon Grid', genre: 'Ambient · live', city: 'Glasgow', status: 'Limited', tags: ['Live acts'],
    bio: 'Halcyon Grid performs slow, generative ambient live sets for openings, closings and seated rooms. Plays alongside a light installation on request.',
    fee: '€1,000–2,000', setLength: '60–120 minutes, live', travelsFrom: 'Glasgow (GLA)', leadTime: '6 weeks minimum',
    rider: ['Table 1.8 m × 0.8 m', '4 × DI inputs to FOH', 'Quad PA preferred', 'Seating or floor cushions welcome'],
    track: 'Clyde at 4AM'
  },
  {
    slug: 'mothbass', name: 'Mothbass', genre: 'Jungle', city: 'Bristol', status: 'Taking dates', tags: ['Bass'],
    bio: 'Mothbass plays jungle, dub and halftime, often on a sound system. Resident at The Vault in Bristol and a regular at outdoor sound system gatherings.',
    fee: '€2,000–3,000', setLength: '90 minutes–2 hours', travelsFrom: 'Bristol (BRS)', leadTime: '4 weeks minimum',
    rider: ['2 × Technics SL-1210', '2 × Pioneer CDJ-3000', 'Pioneer DJM-900NXS2', 'Sub-heavy PA strongly preferred'],
    track: 'Stokes Croft Dub'
  },
  {
    slug: 'ryo-fennel', name: 'Ryo Fennel', genre: 'Minimal', city: 'Osaka', status: 'Booked to Mar', tags: ['Techno'],
    bio: 'Ryo Fennel plays stripped-back minimal and micro-house, all vinyl. Tours Europe twice a year; dates are routed together to keep travel short.',
    fee: '€3,000–5,000', setLength: '3–5 hours', travelsFrom: 'Osaka (KIX), EU tours only', leadTime: '12 weeks minimum',
    rider: ['3 × Technics SL-1210, isolated from bass', 'Rotary mixer', '2 booth monitors', 'Vinyl-only set; no CDJs required'],
    track: 'Dōtonbori Minimal'
  },
  {
    slug: 'sable-ash', name: 'Sable & Ash', genre: 'Acid · b2b', city: 'Rotterdam', status: 'Taking dates', tags: ['Techno', 'Electro & breaks'],
    bio: 'Sable & Ash are two DJs who only play back to back: acid, electro and fast techno, with a TB-303 played live over the mix.',
    fee: '€2,500–3,500', setLength: '3–4 hours, b2b', travelsFrom: 'Rotterdam (RTM)', leadTime: '6 weeks minimum',
    rider: ['4 × Pioneer CDJ-3000', 'Pioneer DJM-V10', 'Extra channel for TB-303 (line in)', '2 booth monitors'],
    track: 'Maas Acid'
  },
  {
    slug: 'nova-static', name: 'Nova Static', genre: 'Industrial techno', city: 'Warsaw', status: 'Taking dates', tags: ['Techno'],
    bio: 'Nova Static crafts hypnotic industrial techno with a focus on raw, mechanical textures. Regular at Republika nightclub; also runs a studio course on synthesis.',
    fee: '€1,800–2,800', setLength: '2.5–4 hours', travelsFrom: 'Warsaw (WAW)', leadTime: '5 weeks minimum',
    rider: ['2 × Technics SL-1210', '2 × Pioneer CDJ-3000', 'Pioneer DJM-V10', 'Dark lighting preferred'],
    track: 'Warsaw Signal Loop'
  },
  {
    slug: 'cipher-collective', name: 'Cipher Collective', genre: 'Live modular', city: 'Stockholm', status: 'Limited', tags: ['Live acts', 'Techno'],
    bio: 'A three-member ensemble performing generative sequences on Eurorack modulars. Each set is unique; prepared patches respond to real-time modulation.',
    fee: '€3,500–5,500', setLength: '60–90 minutes, live', travelsFrom: 'Stockholm (ARN)', leadTime: '8 weeks minimum',
    rider: ['Table 3 m × 1.2 m, isolated from vibration', '6 × DI inputs to FOH', '3 monitor mix sends', '15-minute setup required'],
    track: 'Entropy Cascade'
  },
  {
    slug: 'luna-verde', name: 'Luna Verde', genre: 'Organic techno', city: 'São Paulo', status: 'Taking dates', tags: ['Techno'],
    bio: 'Luna Verde blends techno with Brazilian rhythms and live percussion elements. Emerging voice in the São Paulo underground; available for EU tours.',
    fee: '€2,000–3,200', setLength: '2–3 hours', travelsFrom: 'São Paulo (GIG), EU tours only', leadTime: '7 weeks minimum',
    rider: ['2 × Technics SL-1210', '2 × Pioneer CDJ-3000', 'Pioneer DJM-900NXS2', 'Space for live percussion (2m²)'],
    track: 'Favela Nocturna'
  },
  {
    slug: 'chrome-vessel', name: 'Chrome Vessel', genre: 'Breakcore · live', city: 'London', status: 'Limited', tags: ['Live acts', 'Electro & breaks'],
    bio: 'Chrome Vessel performs live breakcore and IDM using custom Max/MSP patches and hardware controllers. High energy, technical precision.',
    fee: '€2,200–3,800', setLength: '45–75 minutes, live', travelsFrom: 'London (LHR)', leadTime: '6 weeks minimum',
    rider: ['Table 2 m × 1 m, stage centre', '4 × DI inputs to FOH', '2 × Schuko outlets on stage', 'Ample headroom for visuals'],
    track: 'Digital Fracture'
  },
  {
    slug: 'axis-nine', name: 'Axis Nine', genre: 'Deep bass', city: 'Amsterdam', status: 'Taking dates', tags: ['Bass', 'Techno'],
    bio: 'Axis Nine pushes the low end with dubbed-out, sub-focused techno and minimal. Focuses on sound system tuning and custom speaker setups.',
    fee: '€2,200–3,400', setLength: '3–5 hours', travelsFrom: 'Amsterdam (AMS)', leadTime: '5 weeks minimum',
    rider: ['2 × Technics SL-1210', '2 × Pioneer CDJ-3000', 'Pioneer DJM-V10', 'Subwoofer-capable PA mandatory'],
    track: 'Resonance Chamber'
  },
  {
    slug: 'petra-noir', name: 'Petra Noir', genre: 'Hypnotic minimal', city: 'Brussels', status: 'Taking dates', tags: ['Techno'],
    bio: 'Petra Noir strips minimal down to its essence: deep, hypnotic, meditative. Her sets reward patient listening; known for marathon opening slots.',
    fee: '€1,600–2,400', setLength: '4–6 hours', travelsFrom: 'Brussels (BRU)', leadTime: '4 weeks minimum',
    rider: ['2 × Technics SL-1210', '1 × Rotary mixer', '2 booth monitors', 'No visual distractions preferred'],
    track: 'Brussels at 3AM'
  },
  {
    slug: 'flux-protocol', name: 'Flux Protocol', genre: 'Acid house · live', city: 'Detroit', status: 'Limited', tags: ['Live acts', 'Electro & breaks'],
    bio: 'Live acid house trio with TB-303, TR-808 and sampler. Rooted in Detroit heritage but pushing into experimental territory with modulation and effects.',
    fee: '€3,200–4,800', setLength: '60–90 minutes, live', travelsFrom: 'Detroit (DTW)', leadTime: '9 weeks minimum',
    rider: ['Table 2.5 m × 1 m', '6 × DI inputs to FOH', '3 × Schuko outlets on stage', 'Isolated monitor mix essential'],
    track: ' Motown Mutation'
  }
]

export const findArtist = (slug: string) => artists.find(a => a.slug === slug)
