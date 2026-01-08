-- Create admins table (if not exists) and insert four admin accounts with plaintext passwords

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert four admin accounts (passwords: 1, 2, 3, 4)
INSERT INTO admins (role, username, password) VALUES
  ('admin', 'admin1', '1'),
  ('admin', 'admin2', '2'),
  ('admin', 'admin3', '3'),
  ('admin', 'admin4', '4');
