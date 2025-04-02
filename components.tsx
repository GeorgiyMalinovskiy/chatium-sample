import { showTextDialog, attachMedia } from "@app/ui";
import { getChoiceIndexes } from "./utils";
import { addImageRoute, rateImageRoute } from "./routes";
import type { ImageRecord } from "./types";

export const EmptyList = () => {
  return (
    <box
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <text style={{ fontSize: 40 }}>:_(</text>
    </box>
  );
};

export const Header = (props: { hasEnoughRecords: boolean }) => {
  const title = props.hasEnoughRecords
    ? "Что больше по душе?"
    : "Пока нечего сравнивать";

  return <header style={{ textAlign: "center" }}>{title}</header>;
};

export const List = (props: { records: ImageRecord[] }) => {
  return (
    <box style={{ padding: 24 }}>
      {props.records.map(
        ({ rating, image, title, description, dateTime }, i) => {
          return (
            <box style={{ flexDirection: "row", paddingTop: i ? 16 : 0 }}>
              <image
                style={{ flex: 0, width: 100, marginRight: 16 }}
                src={image.getThumbnailSrc()}
              />
              <box style={{ flex: 1 }}>
                <text style={{ fontSize: 20 }}>{title}</text>
                <text style={{ fontStyle: "italic", marginBottom: 8 }}>
                  {description}
                </text>
                <text>Опубликовано: {dateTime.toLocaleString()}</text>
                <text style={{ fontWeight: "bold" }}>Рейтинг: {rating}</text>
              </box>
            </box>
          );
        }
      )}
    </box>
  );
};

export const Choices = (props: { records: ImageRecord[] }) => {
  const choiceIndexes = getChoiceIndexes(props.records.length);
  return (
    <box
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 16,
        backgroundColor: "#EEE",
      }}
    >
      {(choiceIndexes ?? []).map((i) => {
        const record = props.records[i];
        const selectedId = record.id;
        const rejectedIndex = i ? 0 : 1;
        const rejectedId = props.records[rejectedIndex].id;

        return (
          <box
            onClick={rateImageRoute.apiCall({ selectedId, rejectedId })}
            style={{
              maxWidth: 150,
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <image src={record.image.downloadUrl} />
            <box style={{ flexDirection: "column" }}>
              <text style={{ marginTop: 4 }}>{record.title}</text>
              <text style={{ fontWeight: "bold" }}>
                Рейтинг: {record.rating}
              </text>
            </box>
          </box>
        );
      })}
    </box>
  );
};

export const Footer = () => {
  return (
    <>
      <footer style={{ backgroundColor: "white" }}>
        <Divider />
        <button
          class="primary"
          style={{ margin: [0, 16, 16] }}
          onClick={[
            attachMedia({
              mediaType: "photo",
              submitUrl: addImageRoute.url(),
            }),
          ]}
        >
          Загрузить изображение
        </button>
      </footer>
    </>
  );
};

export const Divider = () => {
  return (
    <box
      style={{
        marginBottom: 16,
        width: "100%",
        height: 1,
        backgroundColor: "#EEE",
      }}
    />
  );
};
