const bcrypt = require('bcryptjs');
const pool = require('../db');

(async () => {
  try {
    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    const users = [
      { username: 'admin1', password: 'AdminPass1!', role: 'admin' },
      { username: 'doc1', password: 'DoctorPass1!', role: 'admin' },
      { username: 'doc2', password: 'DoctorPass2!', role: 'admin' },
      { username: 'doc3', password: 'DoctorPass3!', role: 'admin' },
    ];

    for (const u of users) {
      // Check if user exists
      const [exists] = await pool.query('SELECT id FROM admins WHERE username = ?', [u.username]);
      if (exists.length > 0) {
        console.log(`Skipping ${u.username}: already exists`);
        continue;
      }

      const hash = await bcrypt.hash(u.password, 10);
      await pool.query('INSERT INTO admins (role, username, password) VALUES (?, ?, ?)', [u.role, u.username, hash]);
      console.log(`Inserted ${u.username}`);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
