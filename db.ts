import { Heap } from "@app/heap";

export const ImagesTable = Heap.Table("images", {
  filename: Heap.String(),
  image: Heap.ImageFile(),
  sessionId: Heap.String(),
  rating: Heap.Number(),
  title: Heap.String(),
  description: Heap.String(),
  dateTime: Heap.DateTime(),
});
