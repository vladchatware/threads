import React, { useRef } from 'react'
import { Audio, AbsoluteFill, Img, staticFile, Sequence, Series, useCurrentFrame } from "remotion";
import { loadFont } from '@remotion/google-fonts/NotoSans';
import { useTransitionProgress } from '@remotion/transitions'
const { fontFamily } = loadFont();
import { CameraMotionBlur } from '@remotion/motion-blur';

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


export const Story = ({ story }) => {
  const frame = useCurrentFrame()
  const index = story.dialog.findIndex((line, i) => {
    const duration = story.dialog.reduce((acc, line, ri) => ri <= i ? acc + line.durationInFrames : acc, 0)
    return frame <= duration
  })
  const slide = story.dialog[index]
  const side = slide.side

  return (<CameraMotionBlur shutterAngle={280} samples={1}>
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill>
        <Img src={staticFile('shadow.png')} fit="cover" style={{ ...styles.img, ...styles[side] }} />
      </AbsoluteFill>
      <Series>{story.dialog.map((line, i) =>
        <Series.Sequence key={i} premountFor={30} durationInFrames={line.durationInFrames}>
          <Audio src={staticFile(line.sound)} />
          <main style={styles.main}>
            <p style={styles.p}>{line.text}</p>
          </main>
        </Series.Sequence>
      )}</Series>
    </AbsoluteFill>
  </CameraMotionBlur>
  );
};
