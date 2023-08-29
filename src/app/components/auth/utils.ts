const deepLinkKey = 'deep-link';
export const storeDeepLink = (link: string) => {
    localStorage.setItem(deepLinkKey, link)
}

export const getDeepLink = () => {
    return localStorage.getItem(deepLinkKey)
}