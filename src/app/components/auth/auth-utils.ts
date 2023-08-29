const deepLinkKey = 'deep-link';
export const storeDeepLink = (link: string) => {
    localStorage.setItem(deepLinkKey, link)
}

export const getDeepLink = () => {
    const deepLink = localStorage.getItem(deepLinkKey);
    localStorage.removeItem(deepLinkKey)
    return deepLink
}