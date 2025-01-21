const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedData() {
  // Load JSON data
  const sellers = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/seller.json'), 'utf-8'));
  const categories = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/category.json'), 'utf-8'));
  // const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/products.json'), 'utf-8'));
  // const reviews = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/review.json'), 'utf-8'));
  // const images = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/image.json'), 'utf-8'));
  // const contactUs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/contactus.json'), 'utf-8'));
  // Seed tables
  await prisma.seller.createMany({
    data: sellers,
  });

  await prisma.category.createMany({
    data: categories,
  });

  // await prisma.product.createMany({
  //   data: products,
  // });

  // await prisma.review.createMany({
  //   data: reviews,
  // });

  // await prisma.image.createMany({
  //   data: images,
  // });

  // await prisma.contactUs.createMany({
  //   data: contactUs,
  // });

  console.log('Database seeded successfully!');
}

seedData()
  .catch((e) => {
    console.error('Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });