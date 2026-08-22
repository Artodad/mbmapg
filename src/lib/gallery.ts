export type GallerySize = 'wide' | 'feature' | 'tall';

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  size?: GallerySize;
};

const captions: Record<string, { alt: string; caption: string }> = {
  'images/gallery/playground.png': {
    alt: 'The playground at MBMA',
    caption: 'The playground at MBMA',
  },
  'images/gallery/jog-a-thon-run.jpg': {
    alt: 'Students running at Jog-A-Thon',
    caption: 'Students running at Jog-A-Thon',
  },
  'images/gallery/halloween-carnival.jpg': {
    alt: 'Halloween carnival',
    caption: 'Halloween carnival',
  },
  'images/gallery/movie-night.jpg': {
    alt: 'Movie night',
    caption: 'Movie night',
  },
  'images/gallery/school-building.png': {
    alt: 'Exterior of the Mission Bay Montessori Academy building',
    caption: 'Exterior of the Mission Bay Montessori Academy building',
  },
  'images/gallery/halloween-pumpkins.jpg': {
    alt: 'Decorated pumpkins at an MBMA Halloween contest',
    caption: 'Decorated pumpkins at an MBMA Halloween contest',
  },
  'images/gallery/halloween-playground.jpg': {
    alt: 'Halloween gathering on the MBMA playground',
    caption: 'Halloween gathering on the MBMA playground',
  },
};

const restoredGallery: GalleryItem[] = [
  {
    src: 'images/gallery/back-to-school-picnic-banner.jpg',
    alt: 'Families at the MBMA Parents Group Back to School picnic',
  },
  {
    src: 'images/gallery/back-to-school-picnic-families.jpg',
    alt: 'Families at an MBMA Parents Group Back to School picnic',
  },
  {
    src: 'images/gallery/back-to-school-picnic-snacks.jpg',
    alt: 'Snack table at the MBMA Parents Group Back to School picnic',
  },
  {
    src: 'images/gallery/playground.png',
    alt: 'The playground at Mission Bay Montessori Academy',
  },
  {
    src: 'images/gallery/school-building.png',
    alt: 'Exterior of the Mission Bay Montessori Academy building',
  },
  {
    src: 'images/gallery/jog-a-thon-group.jpg',
    alt: 'MBMA students and families at Jog-A-Thon',
  },
  {
    src: 'images/gallery/jog-a-thon-award.jpg',
    alt: 'A student with a Jog-A-Thon award at MBMA',
  },
  {
    src: 'images/gallery/jog-a-thon-awards.jpg',
    alt: 'Students holding Jog-A-Thon awards',
  },
  {
    src: 'images/gallery/jog-a-thon-award-student.jpg',
    alt: 'A student holding a Jog-A-Thon award',
  },
  {
    src: 'images/gallery/jog-a-thon-start.jpg',
    alt: 'MBMA students gathered at the Jog-A-Thon start',
  },
  {
    src: 'images/gallery/jog-a-thon-run.jpg',
    alt: 'Students running at an MBMA Jog-A-Thon',
  },
  {
    src: 'images/gallery/arcade-games.jpg',
    alt: 'MBMA Parents Group photo at an arcade',
  },
  {
    src: 'images/gallery/arcade-friends.jpg',
    alt: 'Students at an MBMA Parents Group arcade outing',
  },
  {
    src: 'images/gallery/arcade-air-hockey.jpg',
    alt: 'Students playing air hockey at an MBMA Parents Group event',
  },
  {
    src: 'images/gallery/holiday-meal-line.jpg',
    alt: 'Volunteers serving a holiday meal at MBMA',
  },
  {
    src: 'images/gallery/holiday-meal-buffet.jpg',
    alt: 'Holiday meal buffet at an MBMA Parents Group event',
  },
  {
    src: 'images/gallery/holiday-meal-students.jpg',
    alt: 'Students in line at an MBMA holiday meal',
  },
  {
    src: 'images/gallery/holiday-meal-serving.jpg',
    alt: 'Parents Group volunteers serving students at MBMA',
  },
  {
    src: 'images/gallery/holiday-meal-corn.jpg',
    alt: 'Students and volunteers at an MBMA holiday meal',
  },
  {
    src: 'images/gallery/parents-at-table.jpg',
    alt: 'Parents at an MBMA Parents Group gathering',
  },
  {
    src: 'images/gallery/sixth-grade-graduation.jpg',
    alt: 'Families at an MBMA 6th Grade Graduation gathering',
  },
  {
    src: 'images/gallery/movie-night.jpg',
    alt: 'MBMA Parents Group outdoor movie night',
  },
  {
    src: 'images/gallery/halloween-pumpkins.jpg',
    alt: 'Decorated pumpkins at an MBMA Halloween contest',
  },
  {
    src: 'images/gallery/halloween-playground.jpg',
    alt: 'Halloween gathering on the MBMA playground',
  },
  {
    src: 'images/gallery/halloween-prize-booth.jpg',
    alt: 'Prize booth at an MBMA Halloween event',
  },
  {
    src: 'images/gallery/halloween-prize-volunteers.jpg',
    alt: 'Volunteers at an MBMA Halloween prize booth',
  },
  {
    src: 'images/gallery/halloween-costumes.jpg',
    alt: 'Students in costumes at an MBMA Halloween event',
  },
  {
    src: 'images/gallery/halloween-masks.jpg',
    alt: 'MBMA Parents Group members in Halloween costumes',
  },
  {
    src: 'images/gallery/halloween-carnival.jpg',
    alt: 'Halloween carnival on the MBMA playground',
  },
];

function withKnownCaptions(item: GalleryItem): GalleryItem {
  const known = captions[item.src];
  if (!known) {
    return { ...item, caption: item.caption ?? item.alt };
  }
  return { ...item, alt: known.alt, caption: known.caption };
}

/** Full restored Wix gallery for the homepage 4-up. Hero photo appears once. */
export const homeGallery: GalleryItem[] = restoredGallery.map(withKnownCaptions);

export const aboutPhotos: GalleryItem[] = [
  {
    src: 'images/gallery/school-building.png',
    alt: 'Exterior of the Mission Bay Montessori Academy building',
    caption: 'Exterior of the Mission Bay Montessori Academy building',
  },
  {
    src: 'images/gallery/halloween-pumpkins.jpg',
    alt: 'Decorated pumpkins at an MBMA Halloween contest',
    caption: 'Decorated pumpkins at an MBMA Halloween contest',
  },
  {
    src: 'images/gallery/halloween-playground.jpg',
    alt: 'Halloween gathering on the MBMA playground',
    caption: 'Halloween gathering on the MBMA playground',
  },
];
