import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

// UserController - handles HTTP requests for User operations
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Get all users
  public getAllUsers = (req: Request, res: Response): void => {
    const users = this.userService.getAllUsers();
    res.json(users.map(u => ({
      id: u.getId(),
      name: u.getName(),
      email: u.getEmail(),
      role: u.getRole(),
      displayInfo: u.getDisplayInfo()
    })));
  };

  // Get user by ID
  public getUserById = (req: Request, res: Response): void => {
    const user = this.userService.getUserById(req.params.id as string);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      displayInfo: user.getDisplayInfo()
    });
  };

  // Mock login endpoint (simple email-based for demo)
  public login = (req: Request, res: Response): void => {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    const user = this.userService.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.json({
      message: 'Login successful',
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        role: user.getRole()
      }
    });
  };
}
