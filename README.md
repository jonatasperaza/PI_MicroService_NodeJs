# 🚀 Microserviço de Extração e Filtragem de Notas do SIGAA 📚

Bem-vindo ao Microserviço de Extração e Filtragem de Notas do SIGAA! Este projeto é uma solução inovadora desenvolvida em Node.js, projetada para simplificar e automatizar o processo de acesso e organização das notas dos alunos no sistema SIGAA.

![SIGAA Logo](https://i.ibb.co/NKXCPw7/logo-ifc-h-color.png)

## Objetivo 🎯

O objetivo principal deste microserviço é fornecer uma maneira rápida, eficiente e segura de extrair e filtrar as notas dos alunos registradas no SIGAA. Utilizando técnicas avançadas de web scraping com Puppeteer, este serviço permite aos usuários acessarem suas informações acadêmicas de forma conveniente, sem a necessidade de navegar manualmente pelo sistema.

## Funcionalidades 🛠️

- **Extração Automatizada:** O microserviço utiliza Puppeteer para automatizar o processo de navegação e extração de dados do SIGAA, garantindo a precisão e integridade das informações obtidas.

- **Filtragem Personalizada:** Os usuários podem especificar critérios de filtragem personalizados para visualizar apenas as notas desejadas, tornando mais fácil acompanhar o desempenho acadêmico.

- **Segurança Avançada:** O microserviço utiliza o Helmet para reforçar a segurança da aplicação, protegendo contra ameaças como injeção de XSS, Clickjacking, entre outros.

- **Logging Detalhado:** O Pino é utilizado como logger para registrar informações detalhadas sobre as operações realizadas pelo microserviço, facilitando a depuração e monitoramento.

## Tecnologias Utilizadas 💻

- **Node.js:** Plataforma de execução utilizada para desenvolver o microserviço, fornecendo um ambiente robusto e escalável para a aplicação.

- **Puppeteer:** Biblioteca Node.js utilizada para controlar um navegador automatizado, permitindo a automação de tarefas de web scraping de forma eficiente.

- **Helmet:** Middleware de segurança para aplicativos Express.js, fornecendo várias medidas de segurança HTTP para proteger a aplicação de diversas ameaças.

- **Pino:** Biblioteca de logging extremamente rápido para Node.js, fornecendo registros detalhados e eficientes das operações do microserviço.

