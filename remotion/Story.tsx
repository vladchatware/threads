import React, { useRef } from 'react'
import { Audio, AbsoluteFill, Img, staticFile, Sequence, Series, useCurrentFrame, OffthreadVideo } from "remotion";
import { loadFont } from '@remotion/google-fonts/NotoSans';
import { useTransitionProgress } from '@remotion/transitions'
const { fontFamily } = loadFont();
import { CameraMotionBlur } from '@remotion/motion-blur';
import { createTikTokStyleCaptions, Caption } from '@remotion/captions';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  p: {
    fontSize: 42,
    fontWeight: 600,
    fontFamily,
    borderRadius: 16,
    borderColor: 'white',
    borderSize: 1,
    borderStyle: 'solid',
    background: 'white',
    display: 'inline-block',
    textAlign: 'center',
    paddingInline: 10,
    maxWidth: 800
  },
  main: {
    position: 'absolute',
    top: 100,
    left: 50,
    marginInline: 30,
    zIndex: 2,
  },
  img: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    top: -300,
    height: '150%',
    // width: '200%'
  },
  left: {
    left: -200,
  },
  right: {
    right: -150
  }
}

const inFrame = (frame, from, to) => {
  const frameFrom = Math.floor(from / (1000 / 30))
  const frameTo = Math.floor(to / (1000 / 30))
  return frameFrom <= frame && frame <= frameTo
}

export const Story = ({ story }) => {
  const frame = useCurrentFrame()
  const index = story.dialog.findIndex((line, i) => {
    const duration = story.dialog.reduce((acc, line, ri) => ri <= i ? acc + line.durationInFrames : acc, 0)
    return frame <= duration
  })
  const offset = story.dialog.filter((d, i) => i < index).reduce((acc, line) => acc + line.durationInFrames, 0)
  const slide = story.dialog[index]
  const side = slide.side
  const { pages } = createTikTokStyleCaptions({
    captions: story.dialog[index].captions,
    combineTokensWithinMilliseconds: 3000,
  });

  return (<CameraMotionBlur shutterAngle={280} samples={1}>
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill>
        <Img src={staticFile('shadow.png')} fit="cover" style={{ ...styles.img, ...styles[side] }} />
      </AbsoluteFill>
      {/* <p style={{color: 'red', zIndex: 5}}>Frame: {frame}</p> */}
      {/* <p style={{color: 'red', zIndex: 5}}>Offset: {offset}</p> */}
      <Series>
        {story.dialog.map((line, i) =>
          <Series.Sequence key={i} premountFor={30} durationInFrames={line.durationInFrames}>
            <Audio src={staticFile(line.sound)} />
            <Series>{pages.map((caption, j) =>
              <Series.Sequence key={j} premountFor={1} postmountFor={1} durationInFrames={Math.floor((caption.durationMs / 1000) * 30) || 1}>
                <main style={styles.main}>
                  <p style={styles.p}>
                    {caption.tokens.map((token, i) => <span key={i} style={inFrame(frame - offset, token.fromMs, token.toMs) ? { color: 'red' } : { color: 'black' }}>{token.text}</span>)}
                  </p>
                </main>
              </Series.Sequence>
            )}</Series>
          </Series.Sequence>
        )}
      </Series>
    </AbsoluteFill>
  </CameraMotionBlur >
  );
};
