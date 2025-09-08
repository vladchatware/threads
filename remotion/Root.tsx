import React, { useState } from 'react'
import { Composition, staticFile } from 'remotion'
import { parseMedia } from '@remotion/media-parser'
import { Story } from './Story'
import { Thread } from './Thread'
import { Tweet } from './Tweet'
import { storySchema, threadSchema, tweetSchema } from './types'

export const RemotionRoot: React.FC = () =>
  <>
    <Composition
      id="Story"
      component={Story}
      durationInFrames={10}
      fps={30}
      width={1284}
      height={2282}
      // schema={storySchema}
      defaultProps={{
        content: 'Dialog line 1',
        sound: 'speech-0.mp3',
        side: 'left'
      }}
      calculateMetadata={async ({ props }) => {
        const { slowDurationInSeconds } = await parseMedia({
          src: staticFile(props.sound as string),
          fields: { slowDurationInSeconds: true }
        })

        return {
          durationInFrames: Math.floor(slowDurationInSeconds * 30) + 10
        }
      }}
    />
    <Composition
      id="Thread"
      component={Thread}
      durationInFrames={10}
      fps={30}
      width={1284}
      height={2282}
      // schema={threadSchema}
      defaultProps={{
        image: 'pic.jpeg',
        username: 'vlad.chat',
        content: "Most people aren't afraid to fail. They're afraid to succeed because that would require them to change. It would require them to become the person who was capable of success. It would require them to let go of the pleasures they are silently addicted to",
        sound: 'speech-0.mp3',
      }}
      calculateMetadata={async ({ props }) => {
        const { slowDurationInSeconds } = await parseMedia({
          src: staticFile(props.sound as string),
          fields: { slowDurationInSeconds: true }
        })

        return {
          durationInFrames: Math.floor(slowDurationInSeconds * 30) + 10
        }
      }}
    />
    <Composition
      id="Tweet"
      component={Tweet}
      durationInFrames={10}
      fps={30}
      width={1284}
      height={2282}
      // schema={tweetSchema}
      defaultProps={{
        image: 'pic.jpeg',
        username: 'vlad.chat',
        handle: '@vladchatware',
        content: "i'm pissed man. i might go full innawoods and disconnect. fuck corporations",
        sound: 'speech-0.mp3',
      }}
      calculateMetadata={async ({ props }) => {
        const { slowDurationInSeconds } = await parseMedia({
          src: staticFile(props.sound as string),
          fields: { slowDurationInSeconds: true }
        })

        return {
          durationInFrames: Math.floor(slowDurationInSeconds * 30) + 10
        }
      }}
    />
  </>

