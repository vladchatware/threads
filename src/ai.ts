import OpenAI from 'openai'
import { readdirSync } from 'node:fs'
const openai = new OpenAI()

export const readStory = async (): Promise<{text: string[]}> => {
  const stories = readdirSync(`${__dirname}/../stories`)
  const lastStory = stories.length - 1

  const story = Bun.file(`${__dirname}/../stories/${stories[lastStory]}`, {type: 'application/json'})

  return story.json()
}

export const generateStory = async (system: string, prompt: string) => {
  const response = await openai.responses.parse({
    model: 'gpt-5-nano',
    input: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
    text: {
      format: {
        type: 'json_schema',
        name: 'story',
        schema: {
          type: 'object',
          properties: {
            text: {
              type: 'array',
              items: {
                type: 'string'
              },
              required: [],
              additionalProperties: false
            }
          },
          additionalProperties: false,
          required: ['text']
        }
      }
    }
  })

  const story = response.output_parsed

  const counter = readdirSync(`${__dirname}/../stories`).length

  Bun.write(`${__dirname}/../stories/story-${counter}.json`, JSON.stringify(story, null, 2))

  return response.output_parsed
}

export const generateSound = async (text: string, name = 'speech.mp3') => {
  const audio = await openai.audio.speech.create({
    model: 'gpt-4o-mini-tts',
    // response_format: 'wav',
    voice: 'ash',
    input: text,
    // instructions: 'speak slowly'
  })

  await Bun.write(`${__dirname}/../public/${name}`, Buffer.from(await audio.arrayBuffer()))

  return name
}

export const generateSlide = async (prompt: string, name = 'slide.png') => {
  const image = await openai.images.generate({
    model: 'gpt-image-1',
    prompt,
    size: '1024x1536'
  })

  await Bun.write(`${__dirname}/../public/${name}`, Buffer.from(image.data[0].b64_json, 'base64'))

  return name
}
