import {
  IConfirmRegistrationRepository,
  IFetchUserByIdRepository,
  RegistrationConfirmation,
} from '../../';

export class ConfirmRegistrationUseCase {
  constructor(
    private readonly fetchUserByIdRepository: IFetchUserByIdRepository,
    private readonly confirmRegistrationRepository: IConfirmRegistrationRepository
  ) {}

  async execute({
    userId,
    confirmationCode,
  }: RegistrationConfirmation): Promise<void> {
    //Check if the user id has not been provided
    if (!userId) {
      throw new Error();
    }

    //Check if the confirmation has not been provided
    if (!confirmationCode) {
      throw new Error();
    }

    //Fetch user
    const user = await this.fetchUserByIdRepository.fetchUserById(userId);

    //Check if the user not exists
    if (!user) {
      throw new Error();
    }

    //Check if the user has already confirmed registration
    if (!user.getConfirmationCode) {
      throw new Error();
    }

    //Check if the user confirmation code is the same as the one stored in the system
    if (confirmationCode !== user.getConfirmationCode) {
      throw new Error();
    }

    //Confirm user registration
    await this.confirmRegistrationRepository.confirmRegistration(userId);
  }
}
