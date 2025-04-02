import { ImagesTable } from "./db";

export type ImageRecord = Awaited<
  ReturnType<typeof ImagesTable.findAll>
>[number];
