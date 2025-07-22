import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'super_admin' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

class AuthService {
  // Sign in admin user
  async signInAdmin(email: string, password: string): Promise<AdminUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if user is an admin
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (!adminDoc.exists()) {
        throw new Error('User is not authorized as an admin');
      }
      
      const adminData = adminDoc.data() as AdminUser;
      
      // Update last login
      await setDoc(doc(db, 'admins', user.uid), {
        ...adminData,
        lastLogin: new Date()
      }, { merge: true });
      
      return adminData;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  }
  
  // Create super admin (only for initial setup)
  async createSuperAdmin(email: string, password: string, displayName: string): Promise<AdminUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile
      await updateProfile(user, { displayName });
      
      // Create admin document
      const adminData: AdminUser = {
        uid: user.uid,
        email: user.email!,
        displayName,
        role: 'super_admin',
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      await setDoc(doc(db, 'admins', user.uid), adminData);
      
      return adminData;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create super admin');
    }
  }
  
  // Sign out
  async signOutAdmin(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  }
  
  // Get current admin user
  async getCurrentAdmin(): Promise<AdminUser | null> {
    const user = auth.currentUser;
    if (!user) return null;
    
    try {
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (!adminDoc.exists()) return null;
      
      return adminDoc.data() as AdminUser;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      return null;
    }
  }
  
  // Listen to auth state changes
  onAuthStateChanged(callback: (admin: AdminUser | null) => void) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          if (adminDoc.exists()) {
            callback(adminDoc.data() as AdminUser);
          } else {
            callback(null);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }
  
  // Check if any super admin exists (for initial setup)
  async hasSuperAdmin(): Promise<boolean> {
    try {
      // This would need a more sophisticated check in production
      // For now, we'll assume if current user is super admin, then it exists
      const user = auth.currentUser;
      if (!user) return false;
      
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      return adminDoc.exists() && adminDoc.data()?.role === 'super_admin';
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService();