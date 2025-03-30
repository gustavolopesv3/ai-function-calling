import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const functions = {
  getWeather: async ({ city }: { city: string }) => {
    console.log('Cidade', city)
    const response = await fetch(`https://wttr.in/${city}?format=%C+%t`);
    const result = await response.text();
    return { result };
  },

  getNextLaunchSpaceX: async () => {
    const response = await fetch("https://api.spacexdata.com/v4/launches/upcoming");
    const launches = await response.json();
    const nextLaunch = launches[0];
    return { result: `O próximo lançamento será ${nextLaunch.name} em ${nextLaunch.date_local}.` };
  },

  getCountryInfo: async ({ country }: { country: string }) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await response.json();
    return { result: `A capital de ${country} é ${data[0].capital}.` };
  }
};

// 📌 Definição das funções para o OpenAI
const functionDefinitions = [
  {
    name: "getWeather",
    description: "Obtém a previsão do tempo para uma cidade.",
    parameters: {
      type: "object",
      properties: {
        city: { type: "string", description: "Nome da cidade" },
      },
      required: ["city"],
    },
  },
  {
    name: "getNextLaunchSpaceX",
    description: "Obtém informações sobre o próximo lançamento da SpaceX.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "getCountryInfo",
    description: "Obtém informações sobre um país.",
    parameters: {
      type: "object",
      properties: {
        country: { type: "string", description: "Nome do país" },
      },
      required: ["country"],
    },
  },
];

// 🔥 Função principal que faz o Function Calling
async function chatWithFunctionCalling(userMessage: string) {
  const response = await openai.chat.completions.create({
    model: "o3-mini",
    messages: [{ role: "user", content: userMessage }],
    functions: functionDefinitions,
    function_call: "auto",
  });

  const functionCall = response.choices[0].message.function_call;

  if (functionCall) {
    console.log("🔹 Chamando função:", functionCall.name);

    const functionName = functionCall.name as keyof typeof functions;
    const args = JSON.parse(functionCall.arguments);
    const functionResult = await functions[functionName](args);

    console.log("✅ Resultado:", functionResult.result);
  } else {
    console.log("Resposta normal:", response.choices[0].message.content);
  }
}

// Call to test
chatWithFunctionCalling("Qual é o tempo atual em brasilia?");
