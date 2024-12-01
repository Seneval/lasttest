import OpenAI from 'openai';

const ASSISTANT_ID = 'asst_fV1fdSuQipHMoPYAHCpHlw8p'; // Your Assistant ID

export async function sendMessage(content: string) {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const thread = await openai.beta.threads.create();
  const threadId = thread.id;

  await openai.beta.threads.messages.create(threadId, { role: 'user', content });
  const run = await openai.beta.threads.runs.create(threadId, { assistant_id: ASSISTANT_ID });

  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
  while (runStatus.status !== 'completed') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
  }

  const messages = await openai.beta.threads.messages.list(threadId);
  const lastMessage = messages.data[0];

  if (lastMessage.content[0] && 'text' in lastMessage.content[0]) {
    return lastMessage.content[0].text.value;
  }

  return 'No valid text response';
}
