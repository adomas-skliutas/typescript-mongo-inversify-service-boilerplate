import { injectable } from 'inversify';
import 'reflect-metadata';

import User from './user.model';
import { IUserDocument, IUserRepository } from './user.interface';

@injectable()
class UserRepository implements IUserRepository {
	public async createUser(name: string, email: string, password: string): Promise<void> {
		const newUser = new User({
			name,
			password,
			role: 'Normal',
			email,
		});
		await newUser.save();
	}

	public async findUsersByNameOrEmail(name: string, email: string): Promise<IUserDocument[]> {
		const user = await User.find({
			$or: [
				{
					name
				},
				{
					email
				}
			]
		}).lean();
		return user;
	}

	public async findUserByEmail(email: string): Promise<IUserDocument | null> {
		const user = await User.findOne({
			email
		}).lean();
		return user;
	}
}

export default UserRepository;
