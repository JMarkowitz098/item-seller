import type { Route } from "./+types/admin.items.pdf";
import { db } from "~/server/db/index.js";
import {
  items as itemsTable,
  settings as settingsTable,
} from "~/server/db/schema.js";
import { generateItemsPDF } from "~/server/pdfGenerator";
import { requireAdminAuth } from "~/server/requireAuth";
import type { Item } from "~/components/ItemCard";
import type { Settings } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAdminAuth(request);

  try {
    const allItems = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.sold, false));
    const items = allItems as Item[];

    const settingsData = await db.select().from(settingsTable).limit(1);
    const settings = (settingsData[0] || null) as Settings | null;

    // Get the origin from request headers
    const origin = request.headers.get("origin") || "http://localhost:5173";

    const doc = await generateItemsPDF(items, origin, settings);

    // Convert to buffer
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const pdf = Buffer.concat(chunks);
        resolve(
          new Response(pdf, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": "attachment; filename=items-list.pdf",
            },
          }),
        );
      });
      doc.on("error", reject);

      doc.end();
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
