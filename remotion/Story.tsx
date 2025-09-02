import React from 'react'
import { Audio, AbsoluteFill, Img, staticFile, Sequence } from "remotion";
import { loadFont } from '@remotion/google-fonts/NotoSans';
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
    paddingInline: 10
  },
  main: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    marginInline: 30,
    zIndex: 2,
  }
}


export const MyComposition = ({ content, sound }) => {
  return (<CameraMotionBlur shutterAngle={280} samples={1}>
    <AbsoluteFill style={styles.container}>
      <Img src={staticFile('IMG_4959.JPG')} fit="cover" style={{flex: 1, position: 'absolute', zIndex: 1, top: 0, left: -150, height: '100%'}} />
      <main style={styles.main}>
        <p style={styles.p}>{content}</p>
      </main>
    </AbsoluteFill>
    <Sequence from={10}>
      <Audio src={staticFile(sound)} />
    </Sequence>
  </CameraMotionBlur>
  );
};
