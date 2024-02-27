export default (products, el) => {
	return products.map((product) =>
		product.id === el.id
			? { ...product, count: product.count + 1 }
			: { ...product }
	);
};
