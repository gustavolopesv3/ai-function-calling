# POC - Integração OpenAI com Função de Chamada

Este repositório demonstra uma prova de conceito (POC) para integrar a API do **OpenAI** com funções externas. O OpenAI é usado para receber uma mensagem do usuário, determinar qual função precisa ser chamada (com base na mensagem) e executar essa função.

## Funcionalidades

A POC inclui três funções de exemplo:
1. **Obter a previsão do tempo** para uma cidade (via **wttr.in**).
2. **Obter o próximo lançamento da SpaceX** (via **SpaceX API**).
3. **Obter informações sobre um país**, como sua capital (via **restcountries.com**).

Essas funções são integradas ao modelo da OpenAI através de chamadas de funções (function calling).

## Requisitos

- **Node.js** (v16 ou superior).
- **Chave de API do OpenAI**. Você pode obter uma chave acessando [OpenAI](https://platform.openai.com/account/api-keys).
- **Dependências**: 
  - `openai`: Para interagir com a API OpenAI.
  - `fetch`: Para fazer requisições HTTP externas.

### Instalação

1. **Clone este repositório**:

    ```bash
    git clone https://github.com/seu-usuario/poc-openai-function-calling.git
    cd poc-openai-function-calling
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Configure a chave da API**:
   Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API do OpenAI:

    ```
    OPENAI_API_KEY=SuaChaveAqui
    ```

4. **Inicie o script**:

    Após configurar a chave da API, você pode executar o script para testar a integração.

    ```bash
    node index.js
    ```

## Como Funciona

1. **Definição de Funções**:
   A função `functions` contém três funções de exemplo que são executadas quando chamadas pelo modelo OpenAI. Cada função faz uma requisição externa para obter dados e retorna a resposta de acordo com os parâmetros recebidos.

2. **Definição das Funções no OpenAI**:
   As funções são definidas para o modelo OpenAI no formato `functionDefinitions`. Cada função é descrita com seus parâmetros e a descrição.

3. **Chamada de Função**:
   Quando uma mensagem do usuário é recebida, o modelo da OpenAI decide se deve executar uma dessas funções ou simplesmente responder com um texto. O OpenAI irá chamar a função adequada e passá-la com os argumentos necessários.

4. **Função Principal (`chatWithFunctionCalling`)**:
   A função principal processa a mensagem do usuário e determina qual função será chamada. Ela usa a resposta do OpenAI e executa a função necessária, retornando o resultado para o usuário.

### Exemplo de Uso

Quando a função `chatWithFunctionCalling` é chamada com uma mensagem como "Qual é o tempo atual em Brasília?", o modelo da OpenAI chamará a função `getWeather` com a cidade "Brasília" e retornará a previsão do tempo.

```typescript
chatWithFunctionCalling("Qual é o tempo atual em brasilia?");
```
Funções Definidas
1. getWeather:
Obtém a previsão do tempo para uma cidade. Exemplo de uso: "Qual é o tempo em Londres?".

2. getNextLaunchSpaceX:
Retorna informações sobre o próximo lançamento da SpaceX.

3. getCountryInfo:
Obtém informações sobre um país, como sua capital. Exemplo de uso: "Qual é a capital da Alemanha?".

Estrutura de Arquivos
```bash
/poc-openai-function-calling
├── index.js       # Código principal que faz a integração com a OpenAI
├── package.json   # Gerenciador de pacotes
├── .env           # Variáveis de ambiente (incluindo chave de API)
└── README.md      # Este arquivo

```