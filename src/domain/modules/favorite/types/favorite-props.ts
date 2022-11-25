import { HeroProps } from '../../hero';

export type FavoriteProps = {
  id?: number;
  userId: number;
  heroId?: number;
  hero?: HeroProps;
};
