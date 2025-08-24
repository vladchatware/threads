import { KokoroTTS } from 'kokoro-js'

const args = process.argv

if (args.length < 3) {
  console.log('Please provide a text argument.')
  process.exit(1)
}

const text = args[2]
const name = args[3]

const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";
const tts = await KokoroTTS.from_pretrained(model_id, {
  dtype: "fp32", // Options: "fp32", "fp16", "q8", "q4", "q4f16"
  device: "cpu", // Options: "wasm", "webgpu" (web) or "cpu" (node). If using "webgpu", we recommend using dtype="fp32".
});

const audio = await tts.generate(text, {
  //   // Use `tts.list_voices()` to list all available voices
  voice: "am_adam",
});
audio.save(name)
