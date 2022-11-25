import { EmptyParameterError } from '../../../errors';

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
  private id?: number;
  private name: string;
  private description?: string;
  private image?: string;
  private stories?: Story[];
  private events?: Event[];

  constructor(props: HeroProps) {
    if (props.name.trim() === '') {
      throw new EmptyParameterError('name');
    }

    if (!props.stories) {
      props.stories = [];
    }

    if (!props.events) {
      props.events = [];
    }

    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.image = props.image;
    this.stories = props.stories;
    this.events = props.events;
  }

  get getId(): number | undefined {
    return this.id;
  }

  get getName(): string | undefined {
    return this.name;
  }

  get getDescription(): string | undefined {
    return this.description;
  }

  get getImage(): string | undefined {
    return this.image;
  }

  get getStories(): Story[] | undefined {
    return this.stories;
  }

  get getEvents(): Event[] | undefined {
    return this.events;
  }
}
