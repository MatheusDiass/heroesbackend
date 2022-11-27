type UserProps = {
  id?: number;
  name: string;
  lastname: string;
  nickname?: string;
  email: string;
  password: string;
  bio?: string;
  confirmationCode?: number;
  token?: string;
};

export class User {
  private user: UserProps;

  constructor(props: UserProps) {
    if (props.name.trim() === '') {
      throw new Error('Name can not be empty.');
    }

    if (props.lastname.trim() === '') {
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

  get getId() {
    return this.user.id;
  }

  get getName() {
    return this.user.name;
  }

  get getLastName() {
    return this.user.lastname;
  }

  get getNickname() {
    return this.user.nickname;
  }

  get getEmail() {
    return this.user.email;
  }

  get getPassword() {
    return this.user.password;
  }

  get getBio() {
    return this.user.bio;
  }

  get getConfirmationCode() {
    return this.user.confirmationCode;
  }

  get getToken() {
    return this.user.token;
  }

  set setPassword(password: string) {
    this.user.password = password;
  }

  set setConfirmationCode(code: number) {
    this.user.confirmationCode = code;
  }

  set setToken(token: string) {
    this.user.token = token;
  }
}
