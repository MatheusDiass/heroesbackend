import { IConfirmRegistrationRepository } from '../../../../../../../domain/modules/user';
import { database } from '../../../../../../database-in-memory';

export class ConfirmRegistrationRepositoryInMemory
  implements IConfirmRegistrationRepository
{
  async confirmRegistration(userId: number): Promise<void> {
    const user = database.users.find((user: any) => user.user_id === userId);

    user.user_confirmationcode = 0;
  }
}
