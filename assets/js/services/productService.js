import { BASE_URL } from "../utils/constants.js";

const getAllData = async(endpoint)=>{
    try {
        const response = await axios(`${BASE_URL}/${endpoint}`)
        return response.data
    } catch (error) {
        console.log(error);   
    }
}

const getDataById = async(endpoint, id)=>{
    try {
        const response = await axios(`${BASE_URL}/${endpoint}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);   
    }
}


const deleteDataById = async(endpoint, id)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`)
        return response
    } catch (error) {
        console.log(error);   
    }
}


const addNewData = async(endpoint, payload)=>{
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, payload)
        return response
    } catch (error) {
        console.log(error);   
    }
}

const editDataById = async(endpoint, id, payload)=>{
    try {
        const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, payload)
        return response
    } catch (error) {
        console.log(error);   
    }
}

export {
    getAllData, 
    getDataById,
    deleteDataById,
    addNewData,
    editDataById
}

/**
 * Product Service
 * Provides data and operations for products
 */

export function getProductsData() {
  return [
    {
      id: 1,
      name: "Wood Chair",
      price: 59.99,
      oldPrice: 75.00,
      image: "assets/images/products/p1.jpg",
      hoverImage: "assets/images/products/p1-hover.jpg",
      rating: 4.5,
      reviewCount: 24,
      category: "Furniture",
      tags: "chair, wood, furniture",
      discount: 20,
      sku: "WDC-001",
      description: "This handcrafted wooden chair combines classic design with modern comfort. Made from sustainable oak with a natural finish that highlights the beautiful wood grain. The ergonomic seat and backrest provide excellent support for extended sitting periods.",
      isNew: true
    },
    {
      id: 2,
      name: "Wooden Table",
      price: 129.99,
      image: "assets/images/products/p2.jpg",
      hoverImage: "assets/images/products/p2-hover.jpg",
      rating: 4.0,
      reviewCount: 16,
      category: "Furniture",
      tags: "table, wood, furniture",
      sku: "WDT-002",
      description: "A sturdy wooden table perfect for dining rooms or kitchen spaces. This versatile piece features a smooth, polished surface with rounded edges for safety and style. The solid pine construction ensures durability while the minimalist design blends with most decor styles."
    },
    {
      id: 3,
      name: "Living Room Sofa",
      price: 359.99,
      oldPrice: 499.99,
      image: "assets/images/products/p3.jpg",
      hoverImage: "assets/images/products/p3-hover.jpg",
      rating: 4.8,
      reviewCount: 42,
      category: "Furniture",
      tags: "sofa, living room, furniture",
      discount: 25,
      sku: "LRS-003",
      description: "This comfortable three-seater sofa features plush cushions and a sturdy hardwood frame. Upholstered in stain-resistant fabric, it's perfect for family homes. The neutral color complements any interior style while the ergonomic design provides excellent lumbar support."
    },
    {
      id: 4,
      name: "Modern Lamp",
      price: 44.99,
      image: "assets/images/products/p4.jpg",
      hoverImage: "assets/images/products/p4-hover.jpg",
      rating: 4.2,
      reviewCount: 28,
      category: "Lighting",
      tags: "lamp, lighting, modern",
      sku: "MDL-004",
      description: "Add a touch of elegance to your space with this modern table lamp. The sleek metal base supports a fabric shade that diffuses light beautifully. Energy-efficient and compatible with smart home systems, this lamp combines style with functionality for any room."
    },
    {
      id: 5,
      name: "Minimalist Chair",
      price: 79.99,
      oldPrice: 99.99,
      image: "assets/images/products/p5.jpg",
      hoverImage: "assets/images/products/p5-hover.jpg",
      rating: 4.6,
      reviewCount: 35,
      category: "Furniture",
      tags: "chair, minimalist, furniture",
      discount: 15,
      sku: "MIN-005",
      description: "This minimalist chair blends Scandinavian design with practical comfort. The clean lines and lightweight frame make it perfect for modern spaces, while the ergonomic seat ensures comfortable seating. Made from sustainable materials with careful attention to environmental impact."
    },
    {
      id: 6,
      name: "Wall Clock",
      price: 29.99,
      image: "assets/images/products/p6.jpg",
      hoverImage: "assets/images/products/p6-hover.jpg",
      rating: 4.1,
      reviewCount: 19,
      category: "Decor",
      tags: "clock, wall, decor",
      sku: "WCL-006",
      description: "A stylish wall clock that combines functionality with aesthetic appeal. The silent movement ensures no distracting ticking while the clear numbers make it easy to read from a distance. The sleek design makes it suitable for offices, living rooms, or bedrooms."
    },
    {
      id: 7,
      name: "Dining Chair",
      price: 69.99,
      image: "assets/images/products/p7.jpg",
      hoverImage: "assets/images/products/p7-hover.jpg",
      rating: 4.3,
      reviewCount: 22,
      category: "Furniture",
      tags: "chair, dining, furniture",
      sku: "DCH-007",
      description: "These elegant dining chairs feature a sturdy wooden frame with comfortable padded seats. The classic design complements both traditional and contemporary dining tables. Sold individually or as a set of four, they're perfect for upgrading your dining area."
    },
    {
      id: 8,
      name: "Bookshelf",
      price: 149.99,
      oldPrice: 189.99,
      image: "assets/images/products/p8.jpg",
      hoverImage: "assets/images/products/p8-hover.jpg",
      rating: 4.7,
      reviewCount: 31,
      category: "Furniture",
      tags: "shelf, book, furniture",
      discount: 20,
      sku: "BKS-008",
      description: "This versatile bookshelf offers ample storage space with five sturdy shelves. The contemporary design works in living rooms, offices, or bedrooms. Made from engineered wood with a laminate finish that resists scratches and stains for long-lasting beauty."
    },
    {
      id: 9,
      name: "Floor Lamp",
      price: 89.99,
      image: "assets/images/products/p9.jpg",
      hoverImage: "assets/images/products/p9-hover.jpg",
      rating: 4.4,
      reviewCount: 26,
      category: "Lighting",
      tags: "lamp, floor, lighting",
      sku: "FLM-009",
      description: "This adjustable floor lamp provides direct lighting perfect for reading or ambient illumination. The articulated arm and rotating head allow you to position light exactly where needed. Energy-efficient LED technology ensures low operating costs and environmental consideration."
    },
    {
      id: 10,
      name: "Coffee Table",
      price: 119.99,
      oldPrice: 149.99,
      image: "assets/images/products/p10.jpg",
      hoverImage: "assets/images/products/p10-hover.jpg",
      rating: 4.9,
      reviewCount: 45,
      category: "Furniture",
      tags: "table, coffee, furniture",
      discount: 15,
      sku: "CFT-010",
      description: "This stylish coffee table features a spacious surface for books and beverages, with a bottom shelf for additional storage. The combination of wood and metal creates an industrial-chic look that complements modern living spaces. Assembly is quick and straightforward."
    }
  ];
}