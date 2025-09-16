import { generateSound, generateStory, readStory } from './src/ai'
import prompt from './prompt/prompt.md' with {type: 'text'}
import system from './prompt/system.md' with {type: 'text'}

const story = await generateStory(system, prompt)

console.log(story)

