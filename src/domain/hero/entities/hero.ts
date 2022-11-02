type HeroProps = {
  id?: number;
  name: string;
  description?: string;
  image?: string;
  storie?: Story[];
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

    this.hero = props;
  }
}
