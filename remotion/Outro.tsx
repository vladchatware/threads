import { CameraMotionBlur } from "@remotion/motion-blur"
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion"

export const Outro = () => {
  return <CameraMotionBlur shutterAngle={280} samples={1}>
    <AbsoluteFill style={{ flex: 1 }}>
      <OffthreadVideo src={staticFile('The Power of Compassion.mp4')} />
    </AbsoluteFill>
  </CameraMotionBlur>
}
