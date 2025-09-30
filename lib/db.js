import database from "better-sqlite3";
import { ProductsData, categories as categoriesData } from "./Products.js";

const db = database("products.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      image TEXT,
      description TEXT,
      color TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT,
      description TEXT,
      category_slug TEXT NOT NULL,
      FOREIGN KEY (category_slug) REFERENCES categories (slug)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

}

function seedDb() {
  const { count: categoryCount } = db
    .prepare("SELECT COUNT(*) as count FROM categories")
    .get();
  if (categoryCount === 0) {
    const insertCategory = db.prepare(
      "INSERT INTO categories (name, slug, image, description, color) VALUES (@name, @slug, @image, @description, @color)"
    );
    const insertManyCategories = db.transaction((categories) => {
      for (const category of categories) {
        insertCategory.run(category);
      }
    });
    insertManyCategories(categoriesData);
    console.log("Categories table seeded.");
  } else {
    console.log("Categories table already contains data.");
  }

  const { count: productCount } = db
    .prepare("SELECT COUNT(*) as count FROM products")
    .get();
  if (productCount === 0) {
    const insertProduct = db.prepare(
      "INSERT INTO products (name, price, image, description, category_slug) VALUES (@name, @price, @image, @description, @category_slug)"
    );

    const insertManyProducts = db.transaction((products) => {
      for (const product of products) {
        insertProduct.run({
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category_slug: product.category,
        });
      }
    });

    insertManyProducts(ProductsData);
    console.log("Products table seeded.");
  } else {
    console.log("Products table already contains data.");
  }
}

initDb();
seedDb();

export default db;
