type UserProps = {
  id?: number;
  name: string;
  lastName: string;
  nickname?: string;
  email: string;
  bio?: string;
};

export class User {
  private user: UserProps;

  constructor(props: UserProps) {
    if (props.name.trim() === '') {
      throw new Error('Name can not be empty.');
    }

    if (props.lastName.trim() === '') {
      throw new Error('Last name can not be empty.');
    }

    if (props.email.trim() === '') {
      throw new Error('Email can not be empty.');
    }

    this.user = props;
  }

  get getName() {
    return this.user.name;
  }

  get getEmail() {
    return this.user.email;
  }
}
