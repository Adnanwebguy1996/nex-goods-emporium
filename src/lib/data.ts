export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  fileType?: string;
  fileSize?: string;
  fileUrl?: string; // Added for uploaded file URL
}

export interface CartItem extends Product {
  quantity: number;
}

export const categories = [
  "Templates",
  "UI Kits",
  "Icons",
  "Scripts",
  "Plugins",
  "Courses",
];

export const products: Product[] = [
  {
    id: "prod_001",
    title: "Ultimate UI Dashboard Template",
    description:
      "A premium dashboard template with 100+ UI components, fully responsive and customizable. Perfect for admin panels, CRM systems, and more.",
    price: 49.99,
    category: "Templates",
    image: "/placeholder.svg",
    featured: true,
    fileType: "Figma, HTML/CSS/JS",
    fileSize: "25MB"
  },
  {
    id: "prod_002",
    title: "Essential Icon Pack",
    description:
      "A set of 1000+ professionally designed icons in multiple formats. Includes outline, solid, and duotone variants.",
    price: 19.99,
    category: "Icons",
    image: "/placeholder.svg",
    fileType: "SVG, PNG, AI",
    fileSize: "12MB"
  },
  {
    id: "prod_003",
    title: "E-commerce Booster Plugin",
    description:
      "Enhance your online store with advanced features like upselling, cross-selling, and personalized recommendations.",
    price: 39.99,
    category: "Plugins",
    image: "/placeholder.svg",
    featured: true,
    fileType: "JS Bundle",
    fileSize: "3.5MB"
  },
  {
    id: "prod_004",
    title: "Modern Landing Page Kit",
    description:
      "Create stunning landing pages in minutes with this comprehensive kit. Includes 20+ pre-designed sections.",
    price: 29.99,
    category: "Templates",
    image: "/placeholder.svg",
    fileType: "HTML/CSS/JS",
    fileSize: "18MB"
  },
  {
    id: "prod_005",
    title: "SEO Mastery 2023",
    description:
      "A comprehensive guide to mastering search engine optimization in 2023. Learn the latest strategies and techniques.",
    price: 59.99,
    category: "Ebooks",
    image: "/placeholder.svg",
    fileType: "PDF, EPUB",
    fileSize: "8.2MB"
  },
  {
    id: "prod_006",
    title: "React Component Library",
    description:
      "A collection of 50+ React components built with TypeScript and Styled Components. Fully tested and documented.",
    price: 79.99,
    category: "UI Kits",
    image: "/placeholder.svg",
    featured: true,
    fileType: "JS/TS Bundle",
    fileSize: "5.3MB"
  },
  {
    id: "prod_007",
    title: "Analytics Dashboard Widgets",
    description:
      "A set of 30+ analytics widgets and charts for data visualization. Compatible with major JS frameworks.",
    price: 34.99,
    category: "UI Kits",
    image: "/placeholder.svg",
    fileType: "JS Bundle",
    fileSize: "4.8MB"
  },
  {
    id: "prod_008",
    title: "Content Marketing Guide",
    description:
      "Learn how to create and distribute valuable content to attract and engage your target audience.",
    price: 24.99,
    category: "Ebooks",
    image: "/placeholder.svg",
    fileType: "PDF, EPUB",
    fileSize: "6.7MB"
  },
];
