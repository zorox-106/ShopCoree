import { User } from '../models/User';
import { MockDatabase } from '../config/MockDatabase';

// Repository layer for User operations - abstracts data access
export class UserRepository {
  private db: MockDatabase;

  constructor() {
    this.db = MockDatabase.getInstance();
  }

  // Get all users
  public findAll(): User[] {
    return Array.from(this.db.getUsers().values());
  }

  // Find user by ID
  public findById(id: string): User | undefined {
    return this.db.getUsers().get(id);
  }

  // Find user by email
  public findByEmail(email: string): User | undefined {
    return Array.from(this.db.getUsers().values()).find(u => u.getEmail() === email);
  }

  // Save/Update a user
  public save(user: User): User {
    this.db.getUsers().set(user.getId(), user);
    return user;
  }

  // Delete user by ID
  public deleteById(id: string): boolean {
    return this.db.getUsers().delete(id);
  }
}
