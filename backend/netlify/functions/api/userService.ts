import { UserModel, IUser } from './user';
import bcrypt from 'bcrypt';

interface UserError {
  type: string;
  message: string;
  error?: any;
}

export async function registerUser(
    username: string,
    password: string
  ): Promise<{ error: UserError | null; user: IUser | null }> {
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds delay between retries
  
    let retryCount = 0;
  
    while (retryCount < maxRetries) {
      try {
        const hash = await bcrypt.hash(password, 10);
  
        const user = new UserModel({ username, password:hash});
        const savedUser = await user.save();
  
        return { error: null, user: savedUser as IUser }; // Explicitly cast to IUser
      } catch (error: any) {
        // Handle unique constraint violation (duplicate key error)
        if (error.code === 11000 || error.code === 11001) {
          return { error: { type: 'duplicate_username', message: 'Username already exists' }, user: null };
        }
  
        retryCount++;
        // Add a longer delay before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  
    return { error: { type: 'save_error', message: 'Error saving user - max retries reached' }, user: null };
  }
  

  export async function loginUser(
    username: string,
    password: string,
    callback: (error: UserError | null, user: IUser | null) => void
  ): Promise<void> {
    try {
      const user: IUser | null = await UserModel.findOne({ username });
  
      if (!user) {
        return callback({ type: 'user_not_found', message: 'User not found' }, null);
      }
  
      bcrypt.compare(password, user.password, (compareError, isMatch) => {
        if (compareError) {
          return callback({ type: 'compare_error', message: 'Error comparing passwords', error: compareError }, null);
        }
  
        if (!isMatch) {
          return callback({ type: 'incorrect_password', message: 'Incorrect password' }, null);
        }
  
        callback(null, user);
      });
    } catch (error) {
      callback({ type: 'find_error', message: 'Error finding user', error }, null);
    }
  }
  
