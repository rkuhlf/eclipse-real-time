
type UpdateWatchtimeInfo = {
    time: number;
}

export function emitUpdateWatchtime(time: number) {
    const detail: UpdateWatchtimeInfo = {
        time,
    }
    document.dispatchEvent(new CustomEvent('updateWatchtime', {
        detail,
    }));
}

export function handleUpdateWatchtime(callback: (data: UpdateWatchtimeInfo) => {}) {
    const handle = (e_: Event) => {
        const e = e_ as CustomEvent;
        const info = e.detail as UpdateWatchtimeInfo;

        callback(info);
    }

    document.addEventListener('updateWatchtime', handle);

    return () => document.removeEventListener('updateWatchtime', handle);
}
