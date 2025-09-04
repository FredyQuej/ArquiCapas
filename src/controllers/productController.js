const db = require('../db');

// --- CREATE ---
// POST /api/products
exports.createProduct = async (req, res) => {
  const { name, description, price, category_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO products (name, description, price, category_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, price, category_id || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// --- READ ---
// GET /api/products
exports.getProducts = async (_req, res) => {
  try {
    const result = await db.query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       ORDER BY p.id`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// GET /api/products/count
exports.countProducts = async (_req, res) => {
  try {
    const result = await db.query(`SELECT COUNT(*)::int AS total FROM products`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al contar productos' });
  }
};

// GET /api/products/sum
exports.sumProductCosts = async (_req, res) => {
  try {
    const result = await db.query(
      `SELECT COALESCE(SUM(price), 0)::numeric(12,2) AS total_cost FROM products`
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al sumar costos de productos' });
  }
};

// --- RELACIÓN 1 a N: Categories -> Products ---
// POST /api/categories
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// GET /api/categories
exports.getCategories = async (_req, res) => {
  try {
    const result = await db.query(
      `SELECT c.id, c.name, COUNT(p.id)::int AS product_count
       FROM categories c
       LEFT JOIN products p ON p.category_id = c.id
       GROUP BY c.id, c.name
       ORDER BY c.id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// GET /api/categories/:id/products
exports.getProductsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT p.*
       FROM products p
       WHERE p.category_id = $1
       ORDER BY p.id`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos por categoría' });
  }
};



