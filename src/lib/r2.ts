import "server-only";

import {
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type VideoTag = "motion" | "montage";
export type VideoTagOrUntagged = VideoTag | "untagged";

export type Video = {
  key: string;
  name: string;
  url: string;
  tag: VideoTagOrUntagged;
  size: number;
  modified: Date;
};

const VIDEO_EXTENSIONS = [".webm", ".mp4", ".mov"] as const;
const TAG_PREFIXES: Record<VideoTag, string> = {
  motion: "motion/",
  montage: "montage/",
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getBucketName(): string {
  return requireEnv("R2_BUCKET_NAME");
}

function getPublicBaseUrl(): string {
  return requireEnv("NEXT_PUBLIC_R2_PUBLIC_URL").replace(/\/$/, "");
}

let cachedClient: S3Client | null = null;

export function r2Client(): S3Client {
  if (cachedClient) return cachedClient;

  const accountId = requireEnv("R2_ACCOUNT_ID");
  const accessKeyId = requireEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY");

  cachedClient = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  return cachedClient;
}

function isVideoKey(key: string): boolean {
  const lower = key.toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function tagFromKey(key: string): VideoTagOrUntagged {
  if (key.startsWith(TAG_PREFIXES.motion)) return "motion";
  if (key.startsWith(TAG_PREFIXES.montage)) return "montage";
  return "untagged";
}

function prettifyName(key: string): string {
  const filename = key.split("/").pop() ?? key;
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const withoutTimestamp = withoutExt.replace(/^\d+-/, "");
  return withoutTimestamp.replace(/_/g, " ");
}

function sanitizeFilename(filename: string): string {
  const trimmed = filename.trim().replace(/\s+/g, "_");
  const cleaned = trimmed.replace(/[^a-zA-Z0-9._-]/g, "");
  return cleaned.replace(/^\.+/, "");
}

export async function listVideos(): Promise<Video[]> {
  const bucket = getBucketName();
  const baseUrl = getPublicBaseUrl();
  const client = r2Client();

  const videos: Video[] = [];
  let continuationToken: string | undefined;

  do {
    const result = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: continuationToken,
      }),
    );

    for (const item of result.Contents ?? []) {
      if (!item.Key || !isVideoKey(item.Key)) continue;

      videos.push({
        key: item.Key,
        name: prettifyName(item.Key),
        url: `${baseUrl}/${item.Key}`,
        tag: tagFromKey(item.Key),
        size: item.Size ?? 0,
        modified: item.LastModified ?? new Date(0),
      });
    }

    continuationToken = result.IsTruncated ? result.NextContinuationToken : undefined;
  } while (continuationToken);

  videos.sort((a, b) => b.modified.getTime() - a.modified.getTime());
  return videos;
}

export type PresignedUploadInput = {
  tag: VideoTag;
  filename: string;
  contentType: string;
};

export async function getPresignedUploadUrl({
  tag,
  filename,
  contentType,
}: PresignedUploadInput): Promise<{ url: string; key: string }> {
  const cleanName = sanitizeFilename(filename);
  if (!cleanName) {
    throw new Error("Invalid filename after sanitization");
  }

  const key = `${TAG_PREFIXES[tag]}${Date.now()}-${cleanName}`;
  const bucket = getBucketName();

  const url = await getSignedUrl(
    r2Client(),
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 600 },
  );

  return { url, key };
}

export async function moveVideo({
  fromKey,
  toTag,
}: {
  fromKey: string;
  toTag: VideoTag;
}): Promise<{ newKey: string }> {
  const filename = fromKey.split("/").pop() ?? fromKey;
  const prefixedName = /^\d+-/.test(filename) ? filename : `${Date.now()}-${filename}`;
  const newKey = `${TAG_PREFIXES[toTag]}${prefixedName}`;

  if (newKey === fromKey) {
    return { newKey };
  }

  const bucket = getBucketName();
  const client = r2Client();

  await client.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: encodeURIComponent(`${bucket}/${fromKey}`),
      Key: newKey,
    }),
  );

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: fromKey,
    }),
  );

  return { newKey };
}

export async function deleteVideo(key: string): Promise<void> {
  const bucket = getBucketName();
  await r2Client().send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );
}
