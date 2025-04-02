import { attachMedia, refresh, showTextDialog } from "@app/ui";
import { ImagesTable } from "./db";
import { calcRatings } from "./utils";

export const rateImageRoute = app.apiCall("rate", async (ctx, req) => {
  const { selectedId, rejectedId } = req.body;
  const selectedRecord = await ImagesTable.getById(ctx, selectedId);
  const rejectedRecord = await ImagesTable.getById(ctx, rejectedId);

  const [selectedRating, rejectedRating] = calcRatings(
    selectedRecord.rating,
    rejectedRecord.rating
  );

  await Promise.all([
    ImagesTable.update(ctx, {
      id: selectedRecord.id,
      rating: selectedRating,
    }),
    ImagesTable.update(ctx, {
      id: rejectedRecord.id,
      rating: rejectedRating,
    }),
  ]);

  return refresh();
});

const addDescriptionRoute = app.apiCall("/describe", async (ctx, req) => {
  const { value: description } = req.body;

  const [record] = await ImagesTable.findAll(ctx, {
    where: { sessionId: ctx.session.id },
    order: { dateTime: "desc" },
    limit: 1,
  });

  await ImagesTable.update(ctx, {
    id: record.id,
    description,
  });

  return refresh();
});

export const addImageRoute = app.apiCall("/upload", async (ctx, req) => {
  const { file } = req.body;

  if (file) {
    await ImagesTable.create(ctx, {
      filename: file.name,
      image: file.hash,
      title: file.name,
      sessionId: ctx.session.id,
      description: "",
      rating: 1200,
      dateTime: new Date(),
    });
  } else {
    throw new Error("Не удалось загрузить файл");
  }

  return [
    showTextDialog({
      submitUrl: addDescriptionRoute.url(),
      title: "Описание",
      submitButtonTitle: "Далее",
      multiline: true,
    }),
  ];
});
