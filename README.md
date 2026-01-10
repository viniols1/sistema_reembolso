# 💼 Sistema Corporativo de Gestão de Reembolsos

> Solução Fullstack para automação e controle de despesas corporativas, focada em compliance e previsibilidade financeira.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Microframework-000000?style=for-the-badge&logo=flask&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-HTML5_%7C_CSS3_%7C_JS-E34F26?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)

---

## 🎯 Visão Geral do Projeto

Este projeto foi desenvolvido para resolver um problema latente em departamentos administrativos: a descentralização do controle de despesas. Substituindo o fluxo manual de notas fiscais e planilhas por um sistema web centralizado, a aplicação garante integridade dos dados e agilidade no reembolso.

### 💡 O Problema
* **Perda de Comprovantes:** Notas fiscais físicas se perdem ou apagam.
* **Falta de Previsibilidade:** O setor financeiro não visualiza o passivo em tempo real.
* **Riscos de Auditoria:** Processos manuais em Excel são suscetíveis a erros e alterações não rastreáveis.

### 🚀 A Solução
Um dashboard interativo onde:
1.  Colaboradores registram despesas instantaneamente.
2.  O sistema calcula automaticamente o total a reembolsar (KPI Financeiro).
3.  Gestores auditam (Aprovam/Rejeitam) lançamentos com um clique.

---

## 🛠️ Arquitetura Técnica

O sistema segue o padrão **MVC (Model-View-Controller)** adaptado, priorizando uma infraestrutura limpa e desacoplada.

* **Backend (Python + Flask):**
    * API RESTful para manipulação de dados (`GET`, `POST`).
    * **SQLAlchemy ORM:** Camada de abstração de banco de dados para segurança contra SQL Injection e manipulação orientada a objetos.
    * Validação de tipos de dados e regras de negócio no servidor.

* **Frontend (Vanilla JS + CSS3):**
    * Comportamento de **SPA (Single Page Application)**: Uso de `Async/Await` e `Fetch API` para atualizar a tabela e o totalizador sem recarregar a página.
    * Design responsivo e focado na experiência do usuário (UX) corporativo.

* **Persistência (Database):**
    * **SQLite:** Escolhido pela portabilidade e eficiência em ambientes de desenvolvimento e aplicações de médio porte.

---

## 📸 Funcionalidades

### 1. Dashboard Financeiro
Visão consolidada com indicador de **"Total a Reembolsar"** atualizado em tempo real conforme as despesas são lançadas ou editadas.

### 2. Gestão de Estados (CRUD Avançado)
O sistema gerencia o ciclo de vida da despesa:
* 🟡 **Pendente:** Estado inicial pós-cadastro.
* 🟢 **Aprovado:** Validação positiva da auditoria.
* 🔴 **Rejeitado:** Bloqueio do reembolso para auditoria.

---

## 💻 Instalação e Execução

Pré-requisitos: Python 3.10 ou superior.

```bash
# 1. Clone o repositório
git clone [https://github.com/viniols1/sistema-reembolso.git](https://github.com/viniols1/sistema-reembolso.git)
cd sistema-reembolso

# 2. Crie um ambiente virtual (Recomendado)
# Windows:
python -m venv venv
.\venv\Scripts\activate
# Linux/Mac:
python3 -m venv venv
source venv/bin/activate

# 3. Instale as dependências
pip install flask flask-sqlalchemy

# 4. Execute a aplicação
python app.py
```

O sistema estará acessível em: `http://127.0.0.1:5000`

---

## 📂 Estrutura do Projeto

A organização de pastas segue as melhores práticas do framework Flask:

```text
sistema_reembolso/
├── app.py              # Core da aplicação (Rotas e Models)
├── instance/           # Database (SQLite)
├── static/
│   ├── css/            # Estilização
│   └── js/             # Lógica do Cliente (Integração API)
├── templates/
│   └── index.html      # Interface HTML5 Semântica
└── README.md           # Documentação
```

---

## 👨‍💻 Autor

**Vinicius**
*Desenvolvedor Fullstack | Software Developer*
