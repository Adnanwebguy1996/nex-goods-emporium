import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Loader2, Upload, Link } from "lucide-react";
import { categories, type Product } from "@/lib/data";
import { sanitizeInput, sanitizeNumber, sanitizeUrl, validateFormData } from "@/utils/inputSanitizer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ProductFormProps {
  editProduct?: Product;
  onSuccess?: () => void;
}

const ProductForm = ({ editProduct, onSuccess }: ProductFormProps) => {
  const isEditing = !!editProduct;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>(
    editProduct?.externalLink ? "external" : "upload"
  );
  
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
    fileUrl: editProduct?.fileUrl || "",
    externalLink: editProduct?.externalLink || "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Sanitize input based on field type
    let sanitizedValue = value;
    
    if (name === 'title' || name === 'description' || name === 'fileType' || name === 'fileSize') {
      sanitizedValue = sanitizeInput(value);
    } else if (name === 'price') {
      sanitizedValue = sanitizeNumber(parseFloat(value)).toString();
    } else if (name === 'image' || name === 'externalLink') {
      sanitizedValue = sanitizeUrl(value);
    }
    
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Update the file information
    setUploadedFile(file);
    
    // Update form data with file information
    setFormData((prev) => ({
      ...prev,
      fileType: file.type,
      fileSize: formatFileSize(file.size),
      // In a real app, this would be a URL to the file after upload to a server or cloud storage
      fileUrl: URL.createObjectURL(file),
    }));
    
    // If it's a product image, set the image preview
    if (file.type.startsWith('image/')) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      setIsSubmitting(false);
      return;
    }

    // Validate either file or external link based on active tab
    if (activeTab === "upload" && !formData.fileUrl && !uploadedFile) {
      toast.error("Please upload a file or provide an external link");
      setIsSubmitting(false);
      return;
    }

    if (activeTab === "external" && !formData.externalLink) {
      toast.error("Please provide an external link");
      setIsSubmitting(false);
      return;
    }
    
    // Sanitize all form data before saving
    const sanitizedFormData = {
      ...formData,
      title: sanitizeInput(formData.title),
      description: sanitizeInput(formData.description),
      price: sanitizeNumber(formData.price),
      fileType: sanitizeInput(formData.fileType),
      fileSize: sanitizeInput(formData.fileSize),
      externalLink: sanitizeUrl(formData.externalLink),
      image: sanitizeUrl(formData.image) || "/placeholder.svg"
    };
    
    // If external link is active, clear file data
    if (activeTab === "external") {
      sanitizedFormData.fileUrl = "";
      sanitizedFormData.fileType = "";
      sanitizedFormData.fileSize = "";
    } else {
      // If upload is active, clear external link
      sanitizedFormData.externalLink = "";
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
          p.id === sanitizedFormData.id ? sanitizedFormData : p
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        toast.success("Product updated successfully");
      } else {
        // Add new product
        const newProducts = [...existingProducts, sanitizedFormData];
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
          fileUrl: "",
          externalLink: "",
        });
        setUploadedFile(null);
        setActiveTab("upload");
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
              maxLength={100}
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
              max="99999"
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
            maxLength={1000}
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
        
        {/* File upload / External link tabs */}
        <div className="space-y-4 mt-4">
          <Label>Product Delivery Method</Label>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="external">External Link</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-1 text-center">
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="file" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <span className="font-medium text-gray-600">
                      {uploadedFile ? uploadedFile.name : 'Click to upload a file'}
                    </span>
                    {!uploadedFile && (
                      <p className="text-sm text-gray-500">
                        PNG, JPG, PDF, ZIP up to 10MB
                      </p>
                    )}
                    {uploadedFile && (
                      <div className="text-sm text-gray-500">
                        Type: {uploadedFile.type || 'Unknown'} | Size: {formatFileSize(uploadedFile.size)}
                      </div>
                    )}
                  </div>
                </label>
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
              
              {uploadedFile && formData.fileUrl && formData.fileType.startsWith('image/') && (
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div className="border rounded-md overflow-hidden mt-1 h-48 flex items-center justify-center">
                    <img 
                      src={formData.fileUrl} 
                      alt="Preview" 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="external" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="externalLink">External Download Link</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="externalLink"
                    name="externalLink"
                    value={formData.externalLink}
                    onChange={handleChange}
                    placeholder="https://example.com/your-download-link"
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Provide a direct link to your product that customers can access after purchase
                </p>
              </div>
            </TabsContent>
          </Tabs>
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
