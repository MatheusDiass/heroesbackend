import { FavoriteProps } from '../types/favorite-props';

export class Favorite {
  private favorite: FavoriteProps;

  constructor(props: FavoriteProps) {
    if (props.id && !props.hero) {
      throw new Error('Hero can not be empty.');
    }

    this.favorite = props;
  }
}
