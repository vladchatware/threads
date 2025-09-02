import React, { useState } from 'react'
import { Composition, staticFile } from 'remotion'
import { parseMedia } from '@remotion/media-parser'
import { MyComposition } from './Story'

export const RemotionRoot: React.FC = () => {
  return (<Composition
    id="Main"
    component={MyComposition}
    durationInFrames={10}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      content: 'Dialog line 1',
      sound: 'speech.mp3'
    }}
    calculateMetadata={async ({ props }) => {
      const { slowDurationInSeconds } = await parseMedia({
        src: staticFile(props.sound as string),
        fields: { slowDurationInSeconds: true }
      })

      return {
        durationInFrames: Math.floor(slowDurationInSeconds * 30)
      }
    }}
  />);
};
