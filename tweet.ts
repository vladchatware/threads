import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { readStory, generateSound } from './src/ai'

const content = 'This is an example of a Tweet element.'
const sound = await generateSound(content, '', 'onyx', `speech-tweet.mp3`)

const serveUrl = await bundle({
  entryPoint: './remotion/index.ts'
})

const composition = await selectComposition({
  serveUrl,
  id: 'Tweet',
  inputProps: {
    sound,
    content,
    username: 'vlad.chat',
    handle: '@vladchatware',
    mode: 'light'
  }
})

await renderMedia({
  composition,
  serveUrl,
  outputLocation: `out/tweet.mp4`,
  codec: 'h264'
})


