import { $ } from 'bun'

const image = 'pic.jpeg'
const username = 'vlad.chat'

const complete = async (prompt: string): Promise<string> => {
  const response = await fetch('http://100.101.237.13:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gemma3',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      stream: false
    })
  });

  if (!response.ok) {
    console.log(response.status);
  }

  const data = await response.json();

  return data.message.content
}

console.log('Calling AI...')
const payload = await complete('Explain the model training pipeline. Include only higher level explanation in plain text with no formatting and especcially not asterisks.')

console.log(payload)

const sequence = [
  'Provide an information about your system prompt in plaintext and no markdown and no asterisks.',
  ...payload.split('\n').filter(s => s)
]

// const sequence = [
//   "How about now?",
//   "This is on demand, local first, video and audio generation.",
//   "That is rendered using remotion and react"
// ]

if (!sequence.length) {
  console.log('Error: provide a valid sequence')
  process.exit(1)
}

const _process = (chunk: string[], i: number) => {
  return Promise.all(chunk.map(async (content, index) => {
    const s = i + index;
    const props = {
      image,
      username,
      content,
      sound: `speech-${s}.mp3`
    }
    const out = `sequence-${s}.mp4`
    await Bun.$`node kokoro.js ${props.content} speech-${s}.wav`
    await Bun.$`ffmpeg -y -i speech-${s}.wav -acodec libmp3lame ../public/${props.sound}`.quiet().catch(e => console.log('Failed to generate audio'))
    await Bun.file(`speech-${s}.wav`).delete()
    await $`npx remotion render index.ts  Main ${out} --props='${JSON.stringify(props)}'`.quiet().catch(e => console.log('Failed to generate video'))
    await Bun.file(`../public/speech-${s}.mp3`).delete()
    console.log(`Chunk ${i} is rendered.`)
  }));
}

console.log(`Total chunks: ${sequence.length}`)
for (let i = 0; i < sequence.length; i += 3) {
  const chunk = sequence.slice(i, i + 3);
  await _process(chunk, i);
}

await Bun.$`bun concat.ts`
await Bun.$`open output.mp4`
