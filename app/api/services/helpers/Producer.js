
export function getMinMaxDetailsIntervalInYears(years) {
    let min = Infinity;
    let max = -Infinity;

    const details = {
        min: {},
        max: {}
    }

    for (let i = 1; i < years.length; i++) {
        const interval = years[i] - years[i - 1];
        const followingWin = years[i];
        const previousWin = years[i - 1];

        

        const infos = {
            interval,
            previousWin,
            followingWin
        }

        if (interval < min) {
            min = interval;
            details.min = infos;
        }

        if (interval > max) {
            max = interval;
            details.max = infos;
        }   
    }

    return details;
}