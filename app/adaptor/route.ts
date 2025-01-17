import { z } from 'zod';

// Helper function to get nested properties
const getNestedProperty = (obj, path) => {
  return path.split('.').reduce((current, key) => current && current[key] !== undefined ? current[key] : undefined, obj);
};

// Helper function to set nested properties
const setNestedProperty = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const nestedObj = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  nestedObj[lastKey] = value;
};

// Main conversion function
function convertToTargetSchema(sourceData, mapping) {
  const targetData = {};

  for (const [targetField, sourceField] of Object.entries(mapping)) {
    if (typeof sourceField === 'string') {
      // Simple mapping
      const value = getNestedProperty(sourceData, sourceField);
      if (value !== undefined) {
        setNestedProperty(targetData, targetField, value);
      }
    } else if (typeof sourceField === 'function') {
      // Custom transformation
      setNestedProperty(targetData, targetField, sourceField(sourceData));
    } else if (Array.isArray(sourceField)) {
      // Array mapping
      const arrayData = getNestedProperty(sourceData, sourceField[0]);
      if (Array.isArray(arrayData)) {
        setNestedProperty(targetData, targetField, arrayData.map(item => convertToTargetSchema(item, sourceField[1])));
      }
    }
  }

  return targetData;
}

// Define the target schema using Zod
const targetSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  sku: z.string(),
  stockQuantity: z.number(),
  sellerId: z.number(),
  categoryId: z.number(),
  attributes: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  seller: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
  }),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  reviews: z.array(z.object({
    id: z.number(),
    reviewerName: z.string(),
    reviewText: z.string().optional(),
    rating: z.number().min(1).max(5),
  })),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
  })),
  variants: z.array(z.object({
    sku: z.string(),
    name: z.string(),
    price: z.number(),
  })),
  specifications: z.object({
    data: z.string(),
  }),
});

// Function to create a mapping based on the source data structure
function createMapping(sourceData) {
  // This is a simplified example. You may need to adjust this based on your actual source data structures.
  return {
    id: findKey(sourceData, ['id', 'productId', 'itemId']),
    name: findKey(sourceData, ['name', 'productName', 'title']),
    description: findKey(sourceData, ['description', 'productDescription', 'details']),
    price: findKey(sourceData, ['price', 'cost', 'amount']),
    sku: findKey(sourceData, ['sku', 'stockKeepingUnit', 'productCode']),
    stockQuantity: findKey(sourceData, ['stockQuantity', 'quantity', 'inventoryCount']),
    sellerId: findKey(sourceData, ['sellerId', 'vendorId', 'merchantId']),
    categoryId: findKey(sourceData, ['categoryId', 'productCategoryId']),
    attributes: sourceData => {
      const attrKeys = ['color', 'size', 'weight', 'material'];
      return attrKeys.reduce((acc, key) => {
        if (sourceData[key] !== undefined) acc[key] = sourceData[key];
        return acc;
      }, {});
    },
    createdAt: findKey(sourceData, ['createdAt', 'dateCreated', 'createDate']),
    updatedAt: findKey(sourceData, ['updatedAt', 'lastModified', 'modificationDate']),
    seller: {
      id: findKey(sourceData, ['sellerId', 'vendorId', 'merchantId']),
      name: findKey(sourceData, ['sellerName', 'vendorName', 'merchantName']),
      email: findKey(sourceData, ['sellerEmail', 'vendorEmail', 'merchantEmail']),
    },
    category: {
      id: findKey(sourceData, ['categoryId', 'productCategoryId']),
      name: findKey(sourceData, ['categoryName', 'productCategory']),
    },
    reviews: [findKey(sourceData, ['reviews', 'customerReviews', 'feedback']), {
      id: 'id',
      reviewerName: findKey(sourceData, ['reviewerName', 'customerName', 'userName']),
      reviewText: findKey(sourceData, ['reviewText', 'comment', 'feedback']),
      rating: findKey(sourceData, ['rating', 'stars', 'score']),
    }],
    images: [findKey(sourceData, ['images', 'productImages', 'photos']), {
      url: findKey(sourceData, ['url', 'imageUrl', 'src']),
      alt: findKey(sourceData, ['alt', 'description', 'caption']),
    }],
    variants: [findKey(sourceData, ['variants', 'variations', 'options']), {
      sku: findKey(sourceData, ['sku', 'variantSku', 'optionCode']),
      name: findKey(sourceData, ['name', 'variantName', 'optionName']),
      price: findKey(sourceData, ['price', 'variantPrice', 'optionPrice']),
    }],
    specifications: sourceData => ({
      data: JSON.stringify(sourceData.specifications || sourceData.technicalSpecs || sourceData.details || {}),
    }),
  };
}

// Helper function to find the first matching key in an object
function findKey(obj, keys) {
  for (const key of keys) {
    if (obj[key] !== undefined) return key;
  }
  return keys[0]; // Default to the first key if none are found
}

// Main function to convert source data to target schema
export async function convertSourceToTargetSchema(sourceData) {
  try {
    const mapping = createMapping(sourceData);
    const convertedData = convertToTargetSchema(sourceData, mapping);
    const validatedData = targetSchema.parse(convertedData);
    return validatedData;
  } catch (error) {
    console.error('Error converting or validating data:', error);
    throw new Error('Failed to convert source data to target schema');
  }
}

// Example usage in your backend API route
export async function POST(req) {
  try {
    const sourceData = await req.json();
    const convertedData = await convertSourceToTargetSchema(sourceData);
    return new Response(JSON.stringify(convertedData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
}