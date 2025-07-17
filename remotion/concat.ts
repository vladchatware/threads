import { $ } from 'bun'

const files = await $`ls sequence-*.mp4 | sort -V`.text()
const lines = files.split('\n').map(f => f ? `file '${f}'\n` : '\n')

await $`rm videos.txt`.nothrow()
await Bun.write('videos.txt', lines.join(''))
await $`rm output.mp4`.nothrow()
await $`ffmpeg -y -f concat -i videos.txt -c copy output.mp4`.quiet()

await $`rm videos.txt`.nothrow()
await $`rm sequence-*.mp4`.nothrow()
