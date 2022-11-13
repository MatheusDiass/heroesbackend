export type HeroProps = {
  id?: number;
  name: string;
  description?: string;
  image?: string;
  stories?: Story[];
  events?: Event[];
};

type Story = {
  title: string;
  link: string;
};

type Event = {
  title: string;
  link: string;
};

export class Hero {
  private hero: HeroProps;

  constructor(props: HeroProps) {
    if (props.name.trim() === '') {
      throw new Error('Name can not be empty.');
    }

    if (!props.stories) {
      props.stories = [];
    }

    if (!props.events) {
      props.events = [];
    }

    this.hero = props;
  }

  get getId(): number | undefined {
    return this.hero.id;
  }

  get getName(): string | undefined {
    return this.hero.name;
  }

  get getDescription(): string | undefined {
    return this.hero.description;
  }

  get getImage(): string | undefined {
    return this.hero.image;
  }

  get getStories(): Story[] | undefined {
    return this.hero.stories;
  }

  get getEvents(): Event[] | undefined {
    return this.hero.events;
  }
}
