
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { sanitizeInput, sanitizeNumber, validateFormData } from '@/utils/inputSanitizer';
import type { Product } from '@/lib/data';

const PRODUCTS_COLLECTION = 'products';

export const productService = {
  // Fetch all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Fetch products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('category', '==', sanitizeInput(category))
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Fetch single product
  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, sanitizeInput(id));
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Product;
      }
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Add new product (with input sanitization)
  async addProduct(productData: Omit<Product, 'id'>): Promise<string> {
    try {
      // Validate and sanitize input
      const validation = validateFormData(productData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      const sanitizedData = {
        title: sanitizeInput(productData.title),
        description: sanitizeInput(productData.description),
        price: sanitizeNumber(productData.price),
        category: sanitizeInput(productData.category),
        image: sanitizeInput(productData.image),
        featured: Boolean(productData.featured),
        fileType: sanitizeInput(productData.fileType || ''),
        fileSize: sanitizeInput(productData.fileSize || ''),
        fileUrl: productData.fileUrl ? sanitizeInput(productData.fileUrl) : null,
        externalLink: productData.externalLink ? sanitizeInput(productData.externalLink) : null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), sanitizedData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product (with input sanitization)
  async updateProduct(id: string, productData: Partial<Product>): Promise<void> {
    try {
      const validation = validateFormData(productData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      const sanitizedData = {
        ...(productData.title && { title: sanitizeInput(productData.title) }),
        ...(productData.description && { description: sanitizeInput(productData.description) }),
        ...(productData.price && { price: sanitizeNumber(productData.price) }),
        ...(productData.category && { category: sanitizeInput(productData.category) }),
        ...(productData.image && { image: sanitizeInput(productData.image) }),
        ...(productData.featured !== undefined && { featured: Boolean(productData.featured) }),
        ...(productData.fileType && { fileType: sanitizeInput(productData.fileType) }),
        ...(productData.fileSize && { fileSize: sanitizeInput(productData.fileSize) }),
        ...(productData.fileUrl !== undefined && { 
          fileUrl: productData.fileUrl ? sanitizeInput(productData.fileUrl) : null 
        }),
        ...(productData.externalLink !== undefined && { 
          externalLink: productData.externalLink ? sanitizeInput(productData.externalLink) : null 
        }),
        updatedAt: Timestamp.now()
      };

      const docRef = doc(db, PRODUCTS_COLLECTION, sanitizeInput(id));
      await updateDoc(docRef, sanitizedData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, sanitizeInput(id));
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('featured', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }
};
