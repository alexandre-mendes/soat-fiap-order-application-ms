# Documentação da Infraestrutura por Repositório

## 📁 Repositório: [soat-fiap-terraform-s3](https://github.com/alexandre-mendes/soat-fiap-terraform-s3)

### Função:

Responsável por provisionar, via GitHub Actions e Terraform, o bucket S3 que será utilizado para armazenar o **Terraform Remote State** dos demais repositórios de infraestrutura.

### Componentes Criados:

* Bucket S3 com versão e criptografia habilitadas.
* Configuração de backend para os módulos Terraform.

### Papel na Arquitetura:

✅ Centraliza e garante consistência dos estados dos recursos criados com Terraform nos outros repositórios.

---
## 📁 Repositório: [soat-fiap-terraform-kubernates](https://github.com/alexandre-mendes/soat-fiap-terraform-kubernates)

### Função:

Provisiona toda a infraestrutura do **EKS (Elastic Kubernetes Service)** na AWS utilizando Terraform e GitHub Actions.

### Componentes Criados:

* Cluster EKS
* Node Groups
* Roles e permissões IAM

### Papel na Arquitetura:

✅ Ambiente de execução e orquestração dos contêiners da aplicação.

---

## 📁 Repositório: [soat-fiap-terraform-database](https://github.com/alexandre-mendes/soat-fiap-terraform-database)

### Função:

Cria os bancos de dados dos microserviços **DynamoDB** e **Aurora (PotgreSQL)**.

### Componentes Criados:

* DynamoDB > costumer-ms
* DynamoDB > order-ms
* Aurora > product-ms

### Papel na Arquitetura:

✅ Estrutura principal de armazenamento NoSQL e SQL para os dados da aplicação.

---


## 📁 Repositório: [soat-fiap-costumer-application-ms](https://github.com/alexandre-mendes/soat-fiap-costumer-application-ms)

### Função:

Contém o código da aplicação e o pipeline que:

* Cria o repositório no **ECR** (caso ainda não exista).
* Gera e publica a imagem Docker da aplicação.
* Faz o deploy da aplicação no cluster EKS via GitHub Actions.

### Componentes Criados e Gerenciados:

* ECR (Elastic Container Registry)
* Deployments e Services no Kubernetes

### Papel na Arquitetura:

✅ Responsável por empacotar e disponibilizar a aplicação em execução.

---

## 📁 Repositório: [soat-fiap-product-application-ms](https://github.com/alexandre-mendes/soat-fiap-product-application-ms)

### Função:

Contém o código da aplicação e o pipeline que:

* Cria o repositório no **ECR** (caso ainda não exista).
* Gera e publica a imagem Docker da aplicação.
* Faz o deploy da aplicação no cluster EKS via GitHub Actions.

### Componentes Criados e Gerenciados:

* ECR (Elastic Container Registry)
* Deployments e Services no Kubernetes

### Papel na Arquitetura:

✅ Responsável por empacotar e disponibilizar a aplicação em execução.

---

## 📁 Repositório: [soat-fiap-order-application-ms](https://github.com/alexandre-mendes/soat-fiap-order-application-ms)

### Função:

Contém o código da aplicação e o pipeline que:

* Cria o repositório no **ECR** (caso ainda não exista).
* Gera e publica a imagem Docker da aplicação.
* Faz o deploy da aplicação no cluster EKS via GitHub Actions.

### Componentes Criados e Gerenciados:

* ECR (Elastic Container Registry)
* Deployments e Services no Kubernetes

### Papel na Arquitetura:

✅ Responsável por empacotar e disponibilizar a aplicação em execução.

---

## 📁 Repositório: [soat-fiap-terraform-lambda](https://github.com/alexandre-mendes/soat-fiap-terraform-lambda)

### Função:

Provisiona e configura dois Lambdas e um API Gateway:

### Componentes Criados:

* Lambda de **Autenticação** (rota `/auth`): gera token JWT a partir do CPF.
* Lambda de **Autorização**: valida o JWT nas demais rotas.
* API Gateway:

  * Integra rota `/auth` com Lambda de autenticação.
  * As demais rotas validam o token JWT antes de encaminhar ao Load Balancer (EKS).

### Papel na Arquitetura:

✅ Responsável pelo controle de acesso do sistema, com autenticação serverless e integração segura com o cluster Kubernetes.