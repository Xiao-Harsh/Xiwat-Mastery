-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    failed_login_attempts INTEGER DEFAULT 0,
    last_failed_login TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    price DOUBLE,
    category VARCHAR(100),
    image TEXT,
    stock INTEGER,
    rating DOUBLE,
    featured BOOLEAN
);

-- Attack Logs Table
CREATE TABLE IF NOT EXISTS attack_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ip_address VARCHAR(100),
    attack_type VARCHAR(100),
    payload TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
