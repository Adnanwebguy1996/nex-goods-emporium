
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Loader2 } from "lucide-react";
import { categories } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  editProduct?: Product;
  onSuccess?: () => void;
}

const ProductForm = ({ editProduct, onSuccess }: ProductFormProps) => {
  const isEditing = !!editProduct;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    id: editProduct?.id || `prod_${Math.random().toString(36).substr(2, 9)}`,
    title: editProduct?.title || "",
    description: editProduct?.description || "",
    price: editProduct?.price || 0,
    category: editProduct?.category || categories[0],
    image: editProduct?.image || "/placeholder.svg",
    featured: editProduct?.featured || false,
    fileType: editProduct?.fileType || "",
    fileSize: editProduct?.fileSize || "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.title || !formData.description || formData.price <= 0) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }
    
    // Save to localStorage (in a real app, this would save to a database)
    try {
      // Get existing products
      const existingProductsJSON = localStorage.getItem("products");
      const existingProducts = existingProductsJSON 
        ? JSON.parse(existingProductsJSON) 
        : [];
      
      if (isEditing) {
        // Update product
        const updatedProducts = existingProducts.map((p: Product) => 
          p.id === formData.id ? formData : p
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        toast.success("Product updated successfully");
      } else {
        // Add new product
        const newProducts = [...existingProducts, formData];
        localStorage.setItem("products", JSON.stringify(newProducts));
        toast.success("Product added successfully");
      }
      
      // Reset form if not editing
      if (!isEditing) {
        setFormData({
          id: `prod_${Math.random().toString(36).substr(2, 9)}`,
          title: "",
          description: "",
          price: 0,
          category: categories[0],
          image: "/placeholder.svg",
          featured: false,
          fileType: "",
          fileSize: "",
        });
      }
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("An error occurred while saving the product");
      console.error(error);
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Product Name *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="29.99"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            rows={4}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/placeholder.svg"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fileType">File Type</Label>
            <Input
              id="fileType"
              name="fileType"
              value={formData.fileType}
              onChange={handleChange}
              placeholder="PDF, ZIP, PSD, etc."
            />
          </div>
          
          <div>
            <Label htmlFor="fileSize">File Size</Label>
            <Input
              id="fileSize"
              name="fileSize"
              value={formData.fileSize}
              onChange={handleChange}
              placeholder="10MB"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="featured">Featured Product</Label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-nex-600 hover:bg-nex-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              {isEditing ? "Update Product" : "Create Product"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
