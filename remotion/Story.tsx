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
    bottom: 800,
    left: 150,
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


export const Story =({ content, sound, side }) => {
  return (<CameraMotionBlur shutterAngle={280} samples={1}>
    <AbsoluteFill style={styles.container}>
      <Img src={staticFile('shadow.png')} fit="cover" style={{...styles.img, ...styles[side]}} />
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
