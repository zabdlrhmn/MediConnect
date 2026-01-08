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
      { username: 'admin1', password: '1', role: 'admin' },
      { username: 'admin2', password: '2', role: 'admin' },
      { username: 'admin3', password: '3', role: 'admin' },
      { username: 'admin4', password: '4', role: 'admin' },
    ];

    for (const u of users) {
      const [exists] = await pool.query('SELECT id FROM admins WHERE username = ?', [u.username]);
      if (exists.length > 0) {
        console.log(`Skipping ${u.username}: already exists`);
        continue;
      }

      await pool.query('INSERT INTO admins (role, username, password) VALUES (?, ?, ?)', [u.role, u.username, u.password]);
      console.log(`Inserted ${u.username}`);
    }

    console.log('Insert complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error inserting admins:', err);
    process.exit(1);
  }
})();
