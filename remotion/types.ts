import { z } from 'zod'

export const storySchema = z.object({
  content: z.string(),
  sound: z.string(),
  side: z.string()
})

export const threadSchema = z.object({
  image: z.string(),
  username: z.string(),
  content: z.string(),
  sound: z.string(),
  mode: z.enum(['dark', 'light'])
})

export const tweetSchema = z.object({
  image: z.string(),
  username: z.string(),
  handle: z.string(),
  content: z.string(),
  sound: z.string(),
  mode: z.enum(['dark', 'light'])
})
