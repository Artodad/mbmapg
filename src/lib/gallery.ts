export type GallerySize = 'wide' | 'feature' | 'tall';

export type GalleryItem = {
  src: string;
  alt: string;
  size?: GallerySize;
};

export const homeGallery: GalleryItem[] = [
  {
    src: 'images/gallery/playground.png',
    alt: 'The playground at Mission Bay Montessori Academy',
    size: 'wide',
  },
  {
    src: 'images/gallery/school-building.png',
    alt: 'Exterior of the Mission Bay Montessori Academy building',
    size: 'wide',
  },
  {
    src: 'images/gallery/jog-a-thon-group.jpg',
    alt: 'MBMA students and families at Jog-A-Thon',
    size: 'feature',
  },
  {
    src: 'images/gallery/jog-a-thon-award.jpg',
    alt: 'A student with a Jog-A-Thon award at MBMA',
    size: 'tall',
  },
  {
    src: 'images/gallery/jog-a-thon-awards.jpg',
    alt: 'Students holding Jog-A-Thon awards',
  },
  {
    src: 'images/gallery/jog-a-thon-award-student.jpg',
    alt: 'A student holding a Jog-A-Thon award',
    size: 'tall',
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
    size: 'tall',
  },
  {
    src: 'images/gallery/arcade-air-hockey.jpg',
    alt: 'Students playing air hockey at an MBMA Parents Group event',
    size: 'tall',
  },
  {
    src: 'images/gallery/holiday-meal-line.jpg',
    alt: 'Volunteers serving a holiday meal at MBMA',
    size: 'tall',
  },
  {
    src: 'images/gallery/holiday-meal-buffet.jpg',
    alt: 'Holiday meal buffet at an MBMA Parents Group event',
    size: 'tall',
  },
  {
    src: 'images/gallery/holiday-meal-students.jpg',
    alt: 'Students in line at an MBMA holiday meal',
    size: 'tall',
  },
  {
    src: 'images/gallery/holiday-meal-serving.jpg',
    alt: 'Parents Group volunteers serving students at MBMA',
    size: 'tall',
  },
  {
    src: 'images/gallery/holiday-meal-corn.jpg',
    alt: 'Students and volunteers at an MBMA holiday meal',
    size: 'tall',
  },
  {
    src: 'images/gallery/parents-at-table.jpg',
    alt: 'Parents at an MBMA Parents Group gathering',
  },
  {
    src: 'images/gallery/sixth-grade-graduation.jpg',
    alt: 'Families at an MBMA 6th Grade Graduation gathering',
    size: 'tall',
  },
  {
    src: 'images/gallery/movie-night.jpg',
    alt: 'MBMA Parents Group outdoor movie night',
    size: 'feature',
  },
  {
    src: 'images/gallery/halloween-pumpkins.jpg',
    alt: 'Decorated pumpkins at an MBMA Halloween contest',
    size: 'feature',
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
    size: 'wide',
  },
];

export const aboutPhotos: GalleryItem[] = [
  {
    src: 'images/gallery/school-building.png',
    alt: 'Exterior of the Mission Bay Montessori Academy building',
  },
  {
    src: 'images/gallery/halloween-pumpkins.jpg',
    alt: 'Decorated pumpkins at an MBMA Halloween contest',
  },
  {
    src: 'images/gallery/halloween-playground.jpg',
    alt: 'Halloween gathering on the MBMA playground',
  },
];
