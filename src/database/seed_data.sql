-- Usa o banco de dados
USE help_desk_db;
 
-- Dados iniciais do banco de dados

insert into categorias (nome, descricao) values ("hardware","Problemas de hardware");
insert into categorias (nome, descricao) values ("software","Problemas de software");

insert into tecnicos (nome, email) values ("Juca Silva","juca.silva@gmail.com");
insert into tecnicos (nome, email) values ("Ana Braga","ana.braga@gmail.com");

insert into solicitantes (nome, email, setor) values ("Fabio Souza","fabio.souza@gmail.com","Financeiro");
insert into solicitantes (nome, email, setor) values ("Sabrina Fontes","sabrina.fontes@gmail.com","Fiscal");