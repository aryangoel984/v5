import { z } from 'zod';

// Helper function to get nested properties
const getNestedProperty = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current && current[key] !== undefined ? current[key] : undefined, obj);
};

// Helper function to set nested properties
const setNestedProperty = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const nestedObj = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  nestedObj[lastKey] = value;
};

// Main conversion function
function convertToTargetSchema(sourceData: any, mapping: any) {
  const targetData: any = {};

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

// Function to create a dynamic mapping based on the buyer's schema
function createDynamicMapping(buyerSchema: any, sourceSchema: any) {
  const mapping: any = {};

  for (const [buyerField, buyerValue] of Object.entries(buyerSchema)) {
    if (typeof buyerValue === 'object' && !Array.isArray(buyerValue)) {
      // Nested object
      mapping[buyerField] = createDynamicMapping(buyerValue, sourceSchema);
    } else if (Array.isArray(buyerValue)) {
      // Array field
      const sourceArrayField = Object.keys(sourceSchema).find(key => Array.isArray(sourceSchema[key]));
      if (sourceArrayField) {
        mapping[buyerField] = [sourceArrayField, createDynamicMapping(buyerValue[0], sourceSchema[sourceArrayField][0])];
      }
    } else {
      // Simple field
      const sourceField = Object.keys(sourceSchema).find(key => 
        key.toLowerCase().includes(buyerField.toLowerCase()) ||
        buyerField.toLowerCase().includes(key.toLowerCase())
      );
      if (sourceField) {
        mapping[buyerField] = sourceField;
      }
    }
  }

  return mapping;
}

// Main function to convert our schema to buyer app schema
export async function convertToBuyerAppSchema(sourceData: any, buyerSchema: any) {
  try {
    const sourceSchema = {
      id: 'number',
      name: 'string',
      description: 'string',
      price: 'number',
      sku: 'string',
      stockQuantity: 'number',
      sellerId: 'number',
      categoryId: 'number',
      attributes: 'object',
      createdAt: 'string',
      updatedAt: 'string',
      seller: {
        id: 'number',
        name: 'string',
        email: 'string',
      },
      category: {
        id: 'number',
        name: 'string',
      },
      reviews: [{
        id: 'number',
        reviewerName: 'string',
        reviewText: 'string',
        rating: 'number',
      }],
      images: [{
        url: 'string',
        alt: 'string',
      }],
      variants: [{
        sku: 'string',
        name: 'string',
        price: 'number',
      }],
      specifications: {
        data: 'string',
      },
    };

    const dynamicMapping = createDynamicMapping(buyerSchema, sourceSchema);
    const convertedData = convertToTargetSchema(sourceData, dynamicMapping);
    return convertedData;
  } catch (error) {
    console.error('Error converting data:', error);
    throw new Error('Failed to convert data to buyer app schema');
  }
}