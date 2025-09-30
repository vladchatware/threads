import { Audio, AbsoluteFill, Img, staticFile, Sequence, Series, useCurrentFrame, OffthreadVideo } from "remotion";
import { loadFont } from '@remotion/google-fonts/NotoSans';
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

const Captions = ({ captions, combineTokensWithinMilliseconds }) => {
  const frame = useCurrentFrame()
  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds,
  });

  return <Series>
    {pages.map((caption, j) => {
      const durationInFrames = Math.floor((caption.durationMs / 1000) * 30)
      return <Series.Sequence
        key={j}
        premountFor={1}
        postmountFor={1}
        durationInFrames={durationInFrames}
      >
        <main style={styles.main}>
          <p style={styles.p}>
            {caption.tokens.map((token, i) =>
              <span
                key={i}
                style={inFrame(frame, token.fromMs, token.toMs) ? { color: 'red' } : { color: 'black' }}
              >
                {token.text}
              </span>)}
          </p>
        </main>
      </Series.Sequence>
    }
    )}
  </Series>
}

export const Story = ({ story }) => {
  return (<CameraMotionBlur shutterAngle={280} samples={1}>
    <AbsoluteFill style={styles.container}>
      <Series>
        {story.dialog.map((line, i) =>
          <Series.Sequence key={i} premountFor={30} durationInFrames={line.durationInFrames}>
            <AbsoluteFill>
              <Img src={staticFile('shadow.png')} fit="cover" style={{ ...styles.img, ...styles[line.side] }} />
              <Audio src={staticFile(line.sound)} />
              <Captions captions={line.captions} combineTokensWithinMilliseconds={1200} />
            </AbsoluteFill>
          </Series.Sequence>
        )}
      </Series>
    </AbsoluteFill>
  </CameraMotionBlur>
  );
};
