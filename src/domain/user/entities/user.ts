type UserProps = {
  id?: number;
  name: string;
  lastName: string;
  nickname?: string;
  email: string;
  password: string;
  bio?: string;
  confirmationCode?: number;
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

    if (props.password.trim() === '') {
      throw new Error('Password can not be empty.');
    }

    this.user = props;
  }

  get getName() {
    return this.user.name;
  }

  get getEmail() {
    return this.user.email;
  }

  get getPassword() {
    return this.user.password;
  }

  get getConfirmationCode() {
    return this.user.confirmationCode;
  }

  set setPassword(password: string) {
    this.user.password = password;
  }
}