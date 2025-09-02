import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { readStory, generateSound } from './src/ai'

const story = (await readStory()).text.map(text => ({text}))

const generateSection = async (section, index) => {
  console.log(section.text)
  // const image = await generateSlide(section.image, `image-${index}.png`)
  const sound = await generateSound(section.text, `speech-${index}.mp3`)
  // const sound = 'speech.mp3'
  const serveUrl = await bundle({
    entryPoint: './remotion/index.ts'
  })
  const composition = await selectComposition({
    serveUrl,
    id: 'Main',
    inputProps: {
      sound,
      content: section.text
    }
  })

  await renderMedia({
    composition,
    serveUrl,
    outputLocation: `out/${index}.mp4`,
    codec: 'h264'
  })
}

// await generateSection({text: story.text[0]}, 0)

for (const [index, section] of story.entries()) {
  await generateSection(section, index)
}

