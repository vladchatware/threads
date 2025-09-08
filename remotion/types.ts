import { z } from 'zod'

export const storySchema = z.object({
  content: z.string(),
  sound: z.string(),
  size: z.string()
})

export const threadSchema = z.object({
  image: z.string(),
  username: z.string(),
  content: z.string(),
  sound: z.string()
})

export const tweetSchema = z.object({
  image: z.string(),
  username: z.string(),
  handle: z.string(),
  content: z.string(),
  sound: z.string()
})
