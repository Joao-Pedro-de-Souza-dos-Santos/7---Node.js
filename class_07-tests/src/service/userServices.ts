export type DataUser = {
  id: string;
  name: string;
  email: string;
};

type UserRepository = {
  create(data: DataUser): Promise<DataUser | undefined>;
};

export const userServices = {
  async create(data: DataUser, userRepositoryInMemory: UserRepository) {
    try {
      const { id, name, email } = data;
      const user = {
        id, name, email,
      };

      const userCreat = await userRepositoryInMemory.create(user);

      return userCreat;
    } catch (error) {
        console.log(error);
    }
  },
};
