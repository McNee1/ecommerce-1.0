export default function (item) {
	const callback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.remove("lazy-img");
				entry.target.src = entry.target.dataset.src;
				// entry.target.removeAttribute("data-src");
				observer.unobserve(entry.target);
			}
		});
	};

	const options = {
		rootMargin: "0px",
		threshold: 0.1,
	};
	const observer = new IntersectionObserver(callback, options);

	if (Array.isArray(item)) {
		item.forEach((el) => observer.observe(el));
	} else {
		observer.observe(item);
	}
}
