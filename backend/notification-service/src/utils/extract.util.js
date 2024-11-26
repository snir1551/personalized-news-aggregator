export const extractNews = (newsData) => {
    let extractedArticles = [];


    newsData.results.forEach(article => {
        const extractedArticle = {
            title: article.title,
            link: article.link,
            pubDate: article.pubDate,
            imageUrl: article.image_url,
        };
        extractedArticles.push(extractedArticle);
    });

    return extractedArticles;
};


export const formatEmailContent = (extractedNews) => {
    let formattedContent = "<h2>Here are your latest news updates:</h2>";

    extractedNews.forEach(article => {

        const title = article.title ? `<h3>Title: ${article.title}</h3>` : '';
        const link = article.link ? `<p>URL: <a href="${article.link}">${article.title}</a></p>` : '';
        const pubDate = article.pubDate ? `<p>Published: ${article.pubDate}</p>` : '';
        const imageUrl = article.imageUrl ? `<img src="${article.imageUrl}" width="50px" height="50px" alt="${article.title}"/>` : '';

        formattedContent += `
            ${title}
            ${link}
            ${pubDate}
            ${imageUrl}
            <hr />
        `;
    });

    return formattedContent;
};


