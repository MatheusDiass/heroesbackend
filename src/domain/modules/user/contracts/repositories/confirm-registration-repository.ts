export interface IConfirmRegistrationRepository {
  confirmRegistration(userId: number): Promise<void>;
}
