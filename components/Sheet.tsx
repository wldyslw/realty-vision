import {
    memo,
    forwardRef,
    useState,
    useCallback,
    useRef,
    type TouchEvent,
    type ReactNode,
    useImperativeHandle,
} from 'react';

export type SheetRef = {
    scrollTo: (x: number) => void;
    storeScroll: () => void;
    restoreScroll: () => void;
    toggle: () => void;
};

type SheetProps = {
    children?: ReactNode;
    expandedClass?: string;
    collapsedClass?: string;
    className?: string;
};

const isMobile = () => window.innerWidth < 1024;

const Sheet = forwardRef<SheetRef, SheetProps>(function Sheet(
    {
        expandedClass = 'var(--search-sheet-translate-expanded)',
        collapsedClass = 'var(--search-sheet-translate-collapsed)',
        children,
        className = '',
    },
    ref
) {
    const [expanded, expand] = useState(false);
    const [persistedScroll, setPersistedScroll] = useState<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [origin, setOrigin] = useState<number | null>(null);
    const [transform, setTransform] = useState<number>(0);

    const toggleExpansion = useCallback(() => {
        if (expanded && isMobile()) {
            scrollContainerRef.current?.scrollTo(0, 0);
        }
        expand((v) => !v);
    }, [expanded]);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        const scrollTop = scrollContainerRef.current?.scrollTop;
        if (isMobile() && scrollTop !== undefined && scrollTop <= 0) {
            setOrigin(e.touches[0].pageY);
        }
    }, []);

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (origin !== null) {
                const delta = e.touches[0].pageY - origin;
                if (expanded && delta >= 0) {
                    setTransform(delta);
                } else if (!expanded) {
                    // asymptotically approaches 50
                    setTransform(delta <= 0 ? delta : delta / (delta / 50 + 1));
                }
            }
        },
        [expanded, origin]
    );

    const handleTouchEnd = useCallback(() => {
        if (transform > 50) {
            expand(false);
            scrollContainerRef.current?.scrollTo(0, 0);
        } else if (transform < -50) {
            expand(true);
        }
        setOrigin(null);
        setTransform(0);
    }, [transform]);

    const handleTouchCancel = useCallback(() => {
        setOrigin(null);
        setTransform(0);
    }, []);

    useImperativeHandle(
        ref,
        () => {
            return {
                scrollTo(x: number) {
                    scrollContainerRef.current?.scrollTo(x, 0);
                },
                storeScroll() {
                    if (isMobile()) {
                        setPersistedScroll(
                            scrollContainerRef.current?.scrollTop ?? null
                        );
                        scrollContainerRef.current?.scrollTo(0, 0);
                        expand(false);
                    }
                },
                restoreScroll() {
                    if (isMobile() && persistedScroll !== null) {
                        expand(true);
                        scrollContainerRef.current?.scrollTo({
                            top: persistedScroll,
                            behavior: 'smooth',
                        });
                        setPersistedScroll(null);
                    }
                },
                toggle() {
                    if (isMobile()) {
                        expand((v) => !v);
                    }
                },
            };
        },
        [persistedScroll]
    );

    return (
        <div
            style={{
                transform: `translateY(${
                    expanded ? expandedClass : collapsedClass
                }) translateY(${transform}px)`,
            }}
            className={`${
                origin === null ? 'bottom-sheet' : ''
            } absolute inset-x-0 -bottom-full z-[100000000] flex h-full w-full max-w-full shrink-0 flex-col rounded-t-3xl ${
                expanded ? 'rounded-t-none' : ''
            } bg-base-darker/90 drop-shadow-xl backdrop-blur-md lg:static lg:h-full lg:max-h-full lg:w-128 lg:rounded-t-none ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
        >
            <div
                role="button"
                onClick={toggleExpansion}
                className="flex shrink-0 cursor-pointer justify-center py-3 lg:hidden"
            >
                <span className="h-1 w-8 rounded-full bg-typo-secondary"></span>
            </div>
            <div
                ref={scrollContainerRef}
                className={`h-full ${
                    transform !== 0 ? 'overscroll-none' : ''
                } ${
                    expanded ? '' : 'touch-none'
                } overflow-y-auto px-3 lg:h-full lg:touch-auto`}
            >
                {children}
            </div>
        </div>
    );
});

export default memo(Sheet);
