export type Item = {
  id: number;
  label: string;
  description: string;
  price: number;
  image_path: string;
};

export function ItemCard({ item }: { item: Item }) {
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
}
