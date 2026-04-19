import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

// UserService - encapsulates business logic for User operations
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getAllUsers(): User[] {
    return this.userRepository.findAll();
  }

  public getUserById(id: string): User | undefined {
    return this.userRepository.findById(id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.userRepository.findByEmail(email);
  }

  public createUser(user: User): User {
    return this.userRepository.save(user);
  }

  public deleteUser(id: string): boolean {
    return this.userRepository.deleteById(id);
  }
}
