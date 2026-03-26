export interface NgoContact {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly descriptionEn: string;
  readonly url: string;
  readonly phone?: string;
  readonly phoneLabel?: string;
  readonly color: 'blue' | 'green' | 'amber' | 'purple' | 'red';
  readonly tags: readonly string[];
}

export const NGO_CONTACTS: readonly NgoContact[] = [
  {
    id: 'gff',
    name: 'GFF – Gesellschaft für Freiheitsrechte',
    description: 'Strategische Klagen für Bürgerrechte in Deutschland.',
    descriptionEn: 'Strategic litigation for civil rights in Germany.',
    url: 'https://freiheitsrechte.org',
    color: 'blue',
    tags: ['klage', 'bürgerrechte', 'grundrechte', 'litigation'],
  },
  {
    id: 'proasyl',
    name: 'Pro Asyl',
    description: 'Bundesweite Beratung und Schutz für Geflüchtete.',
    descriptionEn: 'Nationwide advice and protection for refugees.',
    url: 'https://www.proasyl.de',
    phone: '069 242314-0',
    phoneLabel: 'Beratungshotline',
    color: 'green',
    tags: ['asyl', 'flüchtlinge', 'beratung', 'hotline', 'abschiebung'],
  },
  {
    id: 'rav',
    name: 'RAV – Republikanischer Anwältinnenverein',
    description: 'Anwaltssuche und Notdienst für Polizeikontakte.',
    descriptionEn: 'Lawyer referral and emergency service for police contacts.',
    url: 'https://www.rav.de',
    phone: '030 417235-0',
    phoneLabel: 'Anwaltsnotdienst',
    color: 'amber',
    tags: ['anwalt', 'notdienst', 'festnahme', 'polizei', 'rechtsberatung'],
  },
  {
    id: 'amnesty',
    name: 'Amnesty International Deutschland',
    description: 'Menschenrechte, Polizeigewalt und Abschiebedokumentation.',
    descriptionEn: 'Human rights, police violence and deportation documentation.',
    url: 'https://www.amnesty.de',
    color: 'purple',
    tags: ['menschenrechte', 'polizeigewalt', 'dokumentation', 'abschiebung'],
  },
  {
    id: 'iwm',
    name: 'Migrationsrat Berlin',
    description: 'Beratung und Vernetzung für Migrant:innen in Berlin.',
    descriptionEn: 'Advice and networking for migrants in Berlin.',
    url: 'https://migrationsrat.de',
    color: 'red',
    tags: ['migration', 'berlin', 'beratung', 'vernetzung'],
  },
];

const COLOR_MAP: Record<NgoContact['color'], string> = {
  blue:   'bg-blue-500/10 border-blue-500/30 text-blue-300',
  green:  'bg-green-500/10 border-green-500/30 text-green-300',
  amber:  'bg-amber-500/10 border-amber-500/30 text-amber-300',
  purple: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
  red:    'bg-red-500/10 border-red-500/30 text-red-300',
};

export function ngoColorClasses(color: NgoContact['color']): string {
  return COLOR_MAP[color];
}
