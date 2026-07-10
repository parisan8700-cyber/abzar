export default async function sitemap() {
    const baseUrl = "https://abzarkashmar.ir";

    let products = [];
    let categories = [];

    try {
        const productsRes = await fetch(`${baseUrl}/api/products/`, {
            cache: "no-store",
        });

        products = await productsRes.json();
    } catch (error) {
        console.error("Products sitemap error:", error);
    }

    try {
        const categoriesRes = await fetch(`${baseUrl}/api/categories/tree`, {
            cache: "no-store",
        });

        categories = await categoriesRes.json();
    } catch (error) {
        console.error("Categories sitemap error:", error);
    }


    const productUrls = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));


    const categoryUrls = categories.flatMap((category) => {
        const urls = [
            {
                url: `${baseUrl}/shop/${category.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
            },
        ];

        if (category.subs) {
            category.subs.forEach((sub) => {
                urls.push({
                    url: `${baseUrl}/shop/${category.slug}/${sub.slug}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.6,
                });
            });
        }

        return urls;
    });


    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },

        {
            url: `${baseUrl}/shop`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },

        ...categoryUrls,
        ...productUrls,
    ];
}