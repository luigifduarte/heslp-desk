-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS help_desk_db CHARACTER SET utf8mb4 COLLATE
utf8mb4_unicode_ci;

-- Usa o banco de dados
USE help_desk_db;

-- Cria a tabela de solicitantes
CREATE TABLE IF NOT EXISTS solicitantes (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 setor VARCHAR(50) NOT NULL
);

-- Cria a tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 descricao VARCHAR(150) NOT NULL
);


-- Cria a tabela de tecnicos
CREATE TABLE IF NOT EXISTS tecnicos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT null unique
);

-- Cria a tabela de chamados
CREATE TABLE IF NOT EXISTS chamados (
 id INT AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(100) NOT NULL,
 descricao text NOT null,
 prioridade varchar(50) not null,
 status varchar(15) not null,
 solucao text,
 criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 solicitante_id int,
 categoria_id int,
 tecnico_id int, 
 FOREIGN KEY (solicitante_id) REFERENCES solicitantes(id),
 FOREIGN KEY (categoria_id) REFERENCES categorias(id),
 FOREIGN KEY (tecnico_id) REFERENCES tecnicos(id)
);

