// Base User class with encapsulation - all fields are private, accessed through getters/setters
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

export abstract class User {
  // Private fields - enforcing encapsulation
  private readonly id: string;
  private name: string;
  private email: string;
  private readonly role: UserRole;
  private readonly createdAt: Date;

  constructor(id: string, name: string, email: string, role: UserRole) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = new Date();
  }

  // Getters (read-only access to encapsulated fields)
  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getEmail(): string { return this.email; }
  public getRole(): UserRole { return this.role; }
  public getCreatedAt(): Date { return this.createdAt; }

  // Setters (controlled modification)
  public setName(name: string): void { this.name = name; }
  public setEmail(email: string): void { this.email = email; }

  // Abstract method to be implemented by subclasses
  public abstract getDisplayInfo(): string;
}
