import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Tag, Package } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/lib/data";

interface CategoryData {
  id: string;
  name: string;
  description: string;
  productCount: number;
  color: string;
}

const CategoryManager = () => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  
  // Form states
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formColor, setFormColor] = useState("#3B82F6");

  // Initialize category data
  useEffect(() => {
    const initialData: CategoryData[] = categories.map((category, index) => ({
      id: `cat_${index}`,
      name: category,
      description: getCategoryDescription(category),
      productCount: Math.floor(Math.random() * 20) + 5, // Mock data
      color: getCategoryColor(index)
    }));
    setCategoryData(initialData);
  }, []);

  const getCategoryDescription = (category: string): string => {
    const descriptions: { [key: string]: string } = {
      "Templates": "Professional website and design templates",
      "UI Kits": "Complete user interface component libraries",
      "Icons": "Premium icon collections and sets",
      "Scripts": "Ready-to-use scripts and code snippets",
      "Plugins": "Extensions and plugins for various platforms",
      "Elementor": "Elementor page builder templates and widgets",
      "Divi website assets": "Divi theme layouts and modules"
    };
    return descriptions[category] || "Digital assets and resources";
  };

  const getCategoryColor = (index: number): string => {
    const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#F97316", "#06B6D4"];
    return colors[index % colors.length];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategoryData(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: formName, description: formDescription, color: formColor }
          : cat
      ));
      toast.success("Category updated successfully");
    } else {
      // Add new category
      const newCategory: CategoryData = {
        id: `cat_${Date.now()}`,
        name: formName,
        description: formDescription,
        color: formColor,
        productCount: 0
      };
      setCategoryData(prev => [...prev, newCategory]);
      toast.success("Category added successfully");
    }
    
    handleCloseDialog();
  };

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category);
    setFormName(category.name);
    setFormDescription(category.description);
    setFormColor(category.color);
    setIsDialogOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    setCategoryData(prev => prev.filter(cat => cat.id !== categoryId));
    toast.success("Category deleted successfully");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
    setFormName("");
    setFormDescription("");
    setFormColor("#3B82F6");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl flex items-center">
              <Tag className="mr-3 h-6 w-6" />
              Category Management
            </CardTitle>
            <CardDescription>
              Organize your products into categories
            </CardDescription>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter category description"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color">Category Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="color"
                      type="color"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="w-16 h-10 border-2"
                    />
                    <span className="text-sm text-muted-foreground">{formColor}</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingCategory ? "Update" : "Add"} Category
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Category Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Tag className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{categoryData.length}</p>
                  <p className="text-sm text-blue-700">Total Categories</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {categoryData.reduce((sum, cat) => sum + cat.productCount, 0)}
                  </p>
                  <p className="text-sm text-green-700">Products Across Categories</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">
                    {categoryData.length > 0 ? Math.round(categoryData.reduce((sum, cat) => sum + cat.productCount, 0) / categoryData.length) : 0}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {categoryData.length > 0 ? Math.round(categoryData.reduce((sum, cat) => sum + cat.productCount, 0) / categoryData.length) : 0}
                  </p>
                  <p className="text-sm text-purple-700">Avg Products per Category</p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryData.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">{category.description}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{category.productCount} products</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded border-2 border-gray-200" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-xs font-mono text-muted-foreground">{category.color}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the "{category.name}" category? 
                                This will affect {category.productCount} products.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(category.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManager;