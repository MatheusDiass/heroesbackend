import { HeroProps } from '../../hero';

export type FavoriteProps = {
  id?: number;
  name: string;
  hero?: HeroProps;
};
