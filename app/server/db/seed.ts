import { db } from "./index.js";
import { items } from "./schema.js";

async function seed() {
  console.log("Seeding database...");

  await db.insert(items).values([
    {
      label: "anime_poster",
      description: "Sniper Ragnarok Online Poster",
      price: 15.99,
      image_path: "/images/1768784343997_Sniper._Ragnarok.Online_.full.638118.jpg",
    },
    {
      label: "banana_bed_1",
      description: "Banana Bed Frame - Yellow",
      price: 199.99,
      image_path: "/images/1768842635419_banana_bed.jpeg",
    },
    {
      label: "banana_bed_2",
      description: "Banana Bed Frame - Classic",
      price: 189.99,
      image_path: "/images/1768842739125_banana_bed.jpeg",
    },
  ]);

  console.log("Seeding complete!");
}

seed().catch(console.error);
