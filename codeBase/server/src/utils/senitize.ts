import sentizeHtml from "sanitize-html";

export const sentizePlainText = (text: string): string => {
    return sentizeHtml(text, {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();
}

export const sentizeRichText = (html: string): string => {
    return sentizeHtml(html, {
        allowedTags: sentizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
        allowedAttributes: {
            ...sentizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt'],
            a: ['href', 'target', 'rel'],
        },
        allowedSchemes: ['http', 'https'],
        transformTags: {
            a : sentizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
        }
    }).trim();
}