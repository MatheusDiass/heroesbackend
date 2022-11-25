import { FavoriteProps } from '../types/favorite-props';

export class Favorite {
  private id?: number;
  private userId: number;
  private heroId?: number;

  constructor(props: FavoriteProps) {
    if (!props.id && !props.heroId) {
      throw new Error('The hero id must be provided');
    }

    this.id = props.id;
    this.userId = props.userId;
    this.heroId = props.heroId;
  }

  get getId() {
    return this.id;
  }

  get getUserId() {
    return this.userId;
  }

  get getHeroId() {
    return this.heroId;
  }
}
