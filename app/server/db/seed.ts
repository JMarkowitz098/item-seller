import { db } from "./index.js";
import { items } from "./schema.js";

async function seed() {
  console.log("Seeding database...");

  await db.insert(items).values([
    {
      label: "bed_1",
      description: "IKEA Bed Frame",
      price: 150.5,
      image_path: "/images/bed.jpg",
    },
    {
      label: "bed_2",
      description: "Other IKEA Bed Frame",
      price: 250.5,
      image_path: "/images/bed.jpg",
    },
  ]);

  console.log("Seeding complete!");
}

seed().catch(console.error);
