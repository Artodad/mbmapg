export type GallerySize = 'wide' | 'feature' | 'tall';

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  size?: GallerySize;
};

export const homeGallery: GalleryItem[] = [
  {
    src: 'images/gallery/playground.png',
    alt: 'The playground at MBMA',
    caption: 'The playground at MBMA',
  },
  {
    src: 'images/gallery/jog-a-thon-run.jpg',
    alt: 'Students running at Jog-A-Thon',
    caption: 'Students running at Jog-A-Thon',
  },
  {
    src: 'images/gallery/halloween-carnival.jpg',
    alt: 'Halloween carnival',
    caption: 'Halloween carnival',
  },
  {
    src: 'images/gallery/movie-night.jpg',
    alt: 'Movie night',
    caption: 'Movie night',
  },
];

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
