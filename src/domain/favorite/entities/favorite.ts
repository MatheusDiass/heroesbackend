import { FavoriteProps } from '../types/favorite-props';

export class Favorite {
  private favorite: FavoriteProps;

  constructor(props: FavoriteProps) {
    if (props.id && !props.hero) {
      throw new Error('The hero must be provided');
    }

    if (!props.id && !props.heroId) {
      throw new Error('The hero id must be provided');
    }

    this.favorite = props;
  }

  get getId() {
    return this.favorite.id;
  }

  get getUserId() {
    return this.favorite.userId;
  }

  get getHeroId() {
    return this.favorite.heroId;
  }

  get getHero() {
    return this.favorite.hero;
  }
}
