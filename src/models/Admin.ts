import { User, UserRole } from './User';

// Admin inherits from User - adds admin-specific permissions field
export class Admin extends User {
  private department: string;

  constructor(
    id: string, 
    name: string, 
    email: string, 
    department: string
  ) {
    super(id, name, email, UserRole.ADMIN);
    this.department = department;
  }

  public getDepartment(): string { return this.department; }
  public setDepartment(dept: string): void { this.department = dept; }

  public getDisplayInfo(): string {
    return `Admin: ${this.getName()} (${this.getEmail()}) - Department: ${this.department}`;
  }
}
