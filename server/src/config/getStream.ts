import { StreamClient } from "@stream-io/node-sdk"

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!;
const STREAM_SECRET_KEY = process.env.STREAM_VIDEO_SECRET_KEY!;
const streamClient = new StreamClient(STREAM_API_KEY,STREAM_SECRET_KEY);


export { streamClient };