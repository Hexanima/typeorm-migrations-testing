import { HOUR_TO_MS, MINUTE_TO_MS, SECOND_TO_MS } from "./time-constants.js";

export function ms(timeout: number) {
    return new Promise<void>((resolve) => {
        const start = Date.now();
        setTimeout(() => {
            const end = Date.now();
            const remaining = timeout - (end - start);
            if (remaining > 0) {
                ms(remaining).then(resolve);
            } else {
                resolve();
            }
        }, timeout);
    });
}

export function seconds(seconds: number) {
    return ms(seconds * SECOND_TO_MS);
}

export function minutes(minutes: number) {
    return ms(minutes * MINUTE_TO_MS);
}

export function hours(hours: number) {
    return ms(hours * HOUR_TO_MS);
}
