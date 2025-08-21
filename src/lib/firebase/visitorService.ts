
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  onSnapshot,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface VisitorData {
  id?: string;
  sessionId: string;
  location: string;
  countryCode: string;
  page: string;
  lastActive: Timestamp;
  browser: string;
  device: string;
  sessionStart: Timestamp;
  ip: string;
  userAgent: string;
}

const VISITORS_COLLECTION = 'visitors';

// Generate a unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get device type from user agent
const getDeviceType = (userAgent: string): string => {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'Tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'Mobile';
  }
  return 'Desktop';
};

// Get browser name from user agent
const getBrowserName = (userAgent: string): string => {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

// Get approximate location based on timezone (basic implementation)
const getApproximateLocation = (): { location: string; countryCode: string } => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const locationMap: { [key: string]: { location: string; countryCode: string } } = {
    'America/New_York': { location: 'New York, USA', countryCode: 'US' },
    'America/Los_Angeles': { location: 'Los Angeles, USA', countryCode: 'US' },
    'Europe/London': { location: 'London, UK', countryCode: 'GB' },
    'Europe/Paris': { location: 'Paris, France', countryCode: 'FR' },
    'Europe/Berlin': { location: 'Berlin, Germany', countryCode: 'DE' },
    'Asia/Tokyo': { location: 'Tokyo, Japan', countryCode: 'JP' },
    'Asia/Shanghai': { location: 'Shanghai, China', countryCode: 'CN' },
    'Asia/Kolkata': { location: 'Mumbai, India', countryCode: 'IN' },
    'Australia/Sydney': { location: 'Sydney, Australia', countryCode: 'AU' },
  };
  
  return locationMap[timezone] || { location: 'Unknown Location', countryCode: 'XX' };
};

export const visitorService = {
  // Track a new visitor or update existing session
  async trackVisitor(page: string): Promise<string> {
    try {
      let sessionId = localStorage.getItem('visitor_session_id');
      
      if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('visitor_session_id', sessionId);
      }
      
      const userAgent = navigator.userAgent;
      const { location, countryCode } = getApproximateLocation();
      
      const visitorData: Omit<VisitorData, 'id'> = {
        sessionId,
        location,
        countryCode,
        page,
        lastActive: Timestamp.now(),
        browser: getBrowserName(userAgent),
        device: getDeviceType(userAgent),
        sessionStart: Timestamp.now(),
        ip: 'Hidden', // IP is not accessible from frontend
        userAgent
      };
      
      // Check if session already exists
      const existingQuery = query(
        collection(db, VISITORS_COLLECTION),
        where('sessionId', '==', sessionId),
        limit(1)
      );
      
      const existingDocs = await getDocs(existingQuery);
      
      if (existingDocs.empty) {
        // Create new visitor record
        await addDoc(collection(db, VISITORS_COLLECTION), visitorData);
      } else {
        // Update existing visitor
        const docRef = doc(db, VISITORS_COLLECTION, existingDocs.docs[0].id);
        await updateDoc(docRef, {
          page,
          lastActive: Timestamp.now()
        });
      }
      
      return sessionId;
    } catch (error) {
      console.error('Error tracking visitor:', error);
      // Don't throw error - allow app to continue working
      const fallbackSessionId = localStorage.getItem('visitor_session_id') || generateSessionId();
      return fallbackSessionId;
    }
  },

  // Get all active visitors (last 15 minutes)
  async getActiveVisitors(): Promise<VisitorData[]> {
    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      
      const q = query(
        collection(db, VISITORS_COLLECTION),
        where('lastActive', '>=', Timestamp.fromDate(fifteenMinutesAgo)),
        orderBy('lastActive', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VisitorData[];
    } catch (error) {
      console.error('Error fetching active visitors:', error);
      return [];
    }
  },

  // Subscribe to real-time visitor updates
  subscribeToVisitors(callback: (visitors: VisitorData[]) => void) {
    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      
      const q = query(
        collection(db, VISITORS_COLLECTION),
        where('lastActive', '>=', Timestamp.fromDate(fifteenMinutesAgo)),
        orderBy('lastActive', 'desc')
      );
      
      return onSnapshot(q, (snapshot) => {
        const visitors = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as VisitorData[];
        
        callback(visitors);
      }, (error) => {
        console.error('Error in visitor subscription:', error);
        callback([]); // Return empty array on error
      });
    } catch (error) {
      console.error('Error setting up visitor subscription:', error);
      callback([]);
      return () => {}; // Return empty unsubscribe function
    }
  },

  // Update visitor's current page
  async updateVisitorPage(page: string): Promise<void> {
    try {
      const sessionId = localStorage.getItem('visitor_session_id');
      if (!sessionId) return;
      
      const q = query(
        collection(db, VISITORS_COLLECTION),
        where('sessionId', '==', sessionId),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = doc(db, VISITORS_COLLECTION, querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          page,
          lastActive: Timestamp.now()
        });
      }
    } catch (error) {
      // Silently handle permission errors - don't log to console repeatedly
      if (error.code !== 'permission-denied') {
        console.error('Error updating visitor page:', error);
      }
    }
  }
};
