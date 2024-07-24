import UserModel, { IUser } from '../../models/usuario';

class UserService {
  async getAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async getById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserService;
