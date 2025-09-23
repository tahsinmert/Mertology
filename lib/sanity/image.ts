import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { projectId, dataset } from "./client";

const builder = imageUrlBuilder({ projectId, dataset });

export function urlForImage(source: any) {
  try {
    return builder.image(source);
  } catch {
    return builder.image(null as unknown as Image);
  }
}


