import { useLoaderData } from "react-router";
import { db } from "~/server/db/index.js";
import {
  items as itemsTable,
  settings as settingsTable,
} from "~/server/db/schema.js";
import { eq } from "drizzle-orm";

export type Item = {
  id: number;
  label: string;
  description: string;
  price: number;
  image_path: string;
};

export type Settings = {
  id: number;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
};

export async function loader() {
  try {
    const allItems = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.sold, false));

    const settingsData = await db.select().from(settingsTable).limit(1);
    const settings = settingsData[0] || null;

    return { items: allItems, settings };
  } catch (error) {
    console.error("Error loading items:", error);
    return { items: [], settings: null };
  }
}

const renderItem = (item: Item) => {
  const { id, label, description, price, image_path } = item;
  return (
    <div
      key={String(id)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={image_path}
        alt={label}
        className="w-full h-40 sm:h-48 object-contain bg-gray-100"
      />
      <div className="p-4 sm:p-6">
        <h3 className="card-title text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          {description}
        </h3>
        <p className="card-price text-xl sm:text-2xl font-bold text-blue-600">
          ${String(price)}
        </p>
      </div>
    </div>
  );
};

function ContactInfo({ settings }: { settings: Settings | null }) {
  if (
    !settings ||
    (!settings.contactName && !settings.contactPhone && !settings.contactEmail)
  ) {
    return null;
  }

  // Simple obfuscation: reverse the strings in the data attribute
  const obfuscate = (str: string) => str.split("").reverse().join("");

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8 text-center">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
        Contact Information
      </h2>
      <div className="space-y-2 text-sm sm:text-base text-gray-700">
        {settings.contactName && (
          <p>
            <strong>Name:</strong> {settings.contactName}
          </p>
        )}
        {settings.contactPhone && (
          <p>
            <strong>Phone:</strong>{" "}
            <a
              href={`tel:${settings.contactPhone.replace(/[^0-9]/g, "")}`}
              className="text-blue-600 hover:underline"
              data-obf={obfuscate(settings.contactPhone)}
            >
              {settings.contactPhone}
            </a>
          </p>
        )}
        {settings.contactEmail && (
          <p>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${settings.contactEmail}`}
              className="text-blue-600 hover:underline"
              data-obf={obfuscate(settings.contactEmail)}
            >
              {settings.contactEmail}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export function Welcome() {
  const data = useLoaderData<typeof loader>();
  const { items, settings } = data;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <ContactInfo settings={settings} />

        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            For Sale
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Please email or text if interested
          </p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No items available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item) => renderItem(item))}
          </div>
        )}

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
}
