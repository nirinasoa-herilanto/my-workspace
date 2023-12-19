import { Fragment } from 'react';

import { AboutUs, Hero, Summary, Testimonials } from '@project/components';
import { IReview } from '@project/utils';

const reviews: IReview[] = [
  {
    _id: 'review_01',
    username: 'John Doe',
    image: {
      url: 'https://cdn.pixabay.com/photo/2016/11/29/21/58/white-male-1871406_1280.jpg',
      alt: 'user image',
    },
    company: ' -- Inc',
    rating: 4.5,
    opinion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum pretium odio, nec interdum massa cursus pulvinar. Sed condimentum ligula vel pulvinar dignissim. Quisque pretium eros tellus, vel sollicitudin mauris dictum ac.',
  },
  {
    _id: 'review_02',
    username: 'John Doe',
    image: {
      url: 'https://cdn.pixabay.com/photo/2016/11/29/21/58/white-male-1871406_1280.jpg',
      alt: 'user image',
    },
    company: ' -- Inc',
    rating: 4.5,
    opinion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum pretium odio, nec interdum massa cursus pulvinar. Sed condimentum ligula vel pulvinar dignissim. Quisque pretium eros tellus, vel sollicitudin mauris dictum ac.',
  },
  {
    _id: 'review_03',
    username: 'John Doe',
    image: {
      url: 'https://cdn.pixabay.com/photo/2016/11/29/21/58/white-male-1871406_1280.jpg',
      alt: 'user image',
    },
    company: ' -- Inc',
    rating: 4.5,
    opinion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum pretium odio, nec interdum massa cursus pulvinar. Sed condimentum ligula vel pulvinar dignissim. Quisque pretium eros tellus, vel sollicitudin mauris dictum ac.',
  },
];

/**
 * ## Homepage
 */
const Homepage = () => {
  return (
    <Fragment>
      <Hero />
      <Summary />
      <AboutUs />
      <Testimonials reviews={reviews} />
    </Fragment>
  );
};

export default Homepage;
