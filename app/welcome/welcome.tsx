type Item = {
  id: Number;
  label: string;
  description: string;
  price: Number;
  image_path: string;
};

const data: Item[] = [
  {
    id: 1,
    label: "bed_1",
    description: "IKEA Bed Frame",
    price: 150.5,
    image_path: "/images/bed.jpg",
  },
  {
    id: 2,
    label: "bed_2",
    description: "Other IKEA Bed Frame",
    price: 250.5,
    image_path: "/images/bed.jpg",
  },
];

const renderItem = (item: Item) => {
  const { id, label, description, price, image_path } = item;
  return (
    <section key={String(id)} className="item-card">
      <img src={image_path} alt={label} className="item-image" />
      <div className="item-info">
        <p className="item-title">{description}</p>
        <p className="item-price">${String(price)}</p>
      </div>
    </section>
  );
};
export function Welcome() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Stuff</h1>
      <div className="items-grid">{data.map((item) => renderItem(item))}</div>
    </main>
  );
}
