import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { readStory, generateSound } from './src/ai'

const content = 'This is an example of a Thread element.'
const sound = await generateSound(content, '', 'onyx', `speech-thread.mp3`)

const serveUrl = await bundle({
  entryPoint: './remotion/index.ts'
})

const composition = await selectComposition({
  serveUrl,
  id: 'Thread',
  inputProps: {
    sound,
    content
  }
})

await renderMedia({
  composition,
  serveUrl,
  outputLocation: `out/slide.mp4`,
  codec: 'h264'
})


