<h1>💰 Integração de Pagamentos via PIX com Mercado Pago</h1>

<p>
  Este projeto demonstra a integração de pagamentos via <strong>PIX</strong> utilizando a 
  <strong>API do Mercado Pago</strong>. Foi desenvolvido com <strong>React</strong> e 
  <strong>Node.js</strong>, inspirado no site de vendas fictício <strong>"Kabum"</strong>. 
  A aplicação exibe um fluxo funcional de pagamento, incluindo a geração de 
  <strong>QR Code</strong> e verificação automática do status da transação.
</p>

<hr />

<h2>🚀 Funcionalidades</h2>

<ul>
  <li>
    <strong>Cadastro do usuário:</strong> O usuário insere informações como <strong>nome</strong>, 
    <strong>e-mail</strong> e <strong>CPF válido</strong>.
  </li>
  <li>
    <strong>Geração de QR Code:</strong> Após o preenchimento dos dados, é gerado um 
    <strong>QR Code</strong> para pagamento via PIX.
  </li>
  <li>
    <strong>Verificação de status:</strong> A página de QR Code realiza requisições automáticas à API 
    a cada <strong>5 segundos</strong> para verificar o status do pagamento.
  </li>
  <li>
    <strong>Confirmação de compra:</strong> Quando o pagamento é <strong>aprovado</strong>, a página 
    é atualizada para informar o sucesso da compra ao usuário.
  </li>
</ul>

<hr />

<h2>🌐 Acesse o Projeto</h2>

<p>
  🔗 <a href="https://vercel.com/alexs-projects-cd3bbc6f/mercadopago-api-pix">Link do Projeto</a>
</p>

<hr />

<h2>🛠️ Tecnologias Utilizadas</h2>

<p>O projeto foi desenvolvido utilizando as seguintes tecnologias:</p>

<h3>Frontend:</h3>
<ul>
  <li><strong>React.js:</strong> Biblioteca para construção de interfaces.</li>
  <li><strong>React Router DOM:</strong> Gerenciamento de rotas.</li>
  <li><strong>Sass:</strong> Pré-processador CSS para estilização avançada.</li>
  <li><strong>QRCode.react:</strong> Biblioteca para geração de QR Codes.</li>
</ul>

<h3>Backend:</h3>
<ul>
  <li><strong>Node.js:</strong> Ambiente de execução JavaScript.</li>
  <li><strong>Express:</strong> Framework web para criação de APIs.</li>
  <li><strong>MercadoPago:</strong> Biblioteca oficial para integração com a API de pagamentos.</li>
  <li><strong>Dotenv:</strong> Gerenciamento de variáveis de ambiente.</li>
</ul>

<h3>Outras Dependências:</h3>
<ul>
  <li><strong>uuid:</strong> Geração de identificadores únicos.</li>
  <li><strong>node-fetch:</strong> Realização de requisições HTTP no backend.</li>
</ul>

<hr />

<h2>📝 Como Executar o Projeto</h2>

<ol>
  <li>
    <strong>Clone o repositório:</strong>
    <pre><code>git clone [URL_DO_REPOSITORIO]</code></pre>
  </li>
  <li>
    <strong>Navegue até o diretório do projeto:</strong>
    <pre><code>cd nome-do-projeto</code></pre>
  </li>
  <li>
    <strong>Instale as dependências:</strong>
    <pre><code>npm install</code></pre>
  </li>
  <li>
    <strong>Configure as variáveis de ambiente no arquivo .env.</strong>
  </li>
  <li>
    <strong>Inicie o servidor backend:</strong>
    <pre><code>npm run server</code></pre>
  </li>
  <li>
    <strong>Inicie o frontend:</strong>
    <pre><code>npm start</code></pre>
  </li>
</ol>

<hr />

<h2>📄 Descrição Técnica</h2>

<p>
  O fluxo de pagamento foi implementado utilizando a <strong>API do Mercado Pago</strong>. 
  A cada <strong>5 segundos</strong>, a aplicação realiza uma requisição para verificar o 
  status do pagamento, alterando a interface do usuário dinamicamente com base no retorno da API.
</p>
