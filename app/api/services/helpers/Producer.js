
export function getMinMaxDetailsIntervalInYears(years) {
    let min = Infinity;
    let max = -Infinity;

    const details = {
        min: {},
        max: {}
    }

    if (!Array.isArray(years)) {
        return details;
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

export function groupWinYearsByProducers(movies = []) {
    const producerIntervals = {};

    const addYearInProducer = (producer, year) => {
        if (!producerIntervals[producer]) {
            producerIntervals[producer] = [];
        }
        producerIntervals[producer].push(year);
        producerIntervals[producer].sort((a, b) => a - b);
    }

    for (const movie of movies) {
        const { year } = movie;

        try {
            const producersList = movie.producers.replaceAll(' and ', ', ').split(',');
            for (const producer of producersList) {
                addYearInProducer(producer.trim(), year);
            }
        } catch (error) {
            console.log('Erro ao separar produtores.');
            addYearInProducer(movie.producers, year);
        }
    }

    return producerIntervals;
}