import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { generateSound, readStory, generateStory, generateText } from './src/ai'
import prompt from './prompt/prompt.md' with {type: 'text'}
import system from './prompt/system.md' with {type: 'text'}

const generateVideo = async (story) => {
  // const image = await generateSlide(section.image, `image-${index}.png`)
  for (const [index, section] of story.dialog.entries()) {
    console.log(`${section.voice}: ${section.text}`)
    await generateSound(
      section.text,
      section.instructions,
      section.voice,
      `speech-${index}.mp3`
    )
    await generateText(`speech-${index}.mp3`, `captions-${index}.json`)
  }

  const serveUrl = await bundle({
    entryPoint: './remotion/index.ts'
  })

  const composition = await selectComposition({
    serveUrl,
    id: 'Story',
    inputProps: {
      story,
    }
  })

  await renderMedia({
    composition,
    serveUrl,
    outputLocation: `out/${story.topic}.mp4`,
    codec: 'h264'
  })
}

// const story = await readStory('89-Letting Go of Blame')
// await generateVideo(story)

const stories = [
  //prompt
  "The cringe of truth",
  "Facing the shadow",
  "The prison of doubt",
  "Letting go of blame",
  "The Courage to See",
  "Surrendering Control",
  "The Gift of Self-Honesty",
  "Releasing the Past",
  "Embracing Divine Love",
  "The Power of Compassion"
]

for (const prompt of stories) {
  const story = await generateStory(system, prompt)
  await generateVideo(story)
}


