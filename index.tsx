import { Header, List, EmptyList, Choices, Footer } from "./components";
import { ImagesTable } from "./db";

app.screen("/", async (ctx) => {
  const records = await ImagesTable.findAll(ctx, {
    where: { sessionId: ctx.session.id },
    order: { rating: "desc" },
  });

  const hasEnoughRecords = records.length > 1;

  return (
    <screen title="File manager">
      <Header hasEnoughRecords={hasEnoughRecords} />
      {hasEnoughRecords ? <Choices records={records} /> : <EmptyList />}
      <List records={records} />
      <Footer />
    </screen>
  );
});
