export const darkModeMatcher =
    typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : undefined;

export const desktopMatcher =
    typeof window !== 'undefined'
        ? window.matchMedia('(min-width: 1024px)')
        : undefined;

export const darkModeObserver = (callback: (isDarkMode: boolean) => void) => {
    const classMutationCallback = (mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'class'
            ) {
                const isDarkMode = (
                    mutation.target as HTMLElement
                ).classList.contains('dark');
                callback(isDarkMode);
            }
        }
    };
    const observer = new MutationObserver(classMutationCallback);
    return {
        observe: () => {
            if (typeof window !== 'undefined') {
                observer.observe(document.documentElement, {
                    attributes: true,
                });
            }
        },
        disconnect: () => observer.disconnect(),
    };
};
