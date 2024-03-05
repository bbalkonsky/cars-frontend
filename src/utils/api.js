const tg = window.Telegram.WebApp;
const currentUserId = tg.initDataUnsafe?.user?.id;

const basicPort = '3030';
const basicUrl = `http://localhost:${basicPort}`;

const getCars = () => {
    return fetch(`${basicUrl}/cars`)
        .then(response => response.json());
};

const getCarById = (id) => {
    return fetch(`${basicUrl}/cars/${id}`)
        .then(response => response.json());
};

const startNewRide = async (carId, body) => {
    const response = await fetch(`${basicUrl}/cars/start/${carId}`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

const finishRide = async (carId, body) => {
    const response = await fetch(`${basicUrl}/cars/finish/${carId}`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

const getCardStatus = () => {
    return fetch(`${basicUrl}/card`)
        .then(response => response.json());
};

const takeCard = async (body) => {
    const response = await fetch(`${basicUrl}/card/start`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

const returnCard = async () => {
    const response = await fetch(`${basicUrl}/card/finish`, {
        method: "POST",
        cache: "no-cache",
        headers: {}
    });
    return await response.json();
};

const getBookingsByCarId = (id) => {
    return fetch(`${basicUrl}/cars/book/${id}`)
        .then(response => response.json());
};

const removeBooking = async (id) => {
    const response = await fetch(`${basicUrl}/cars/book/remove/${id}`, {
        method: "POST",
        cache: "no-cache",
        headers: {}
    });
    return await response.json();
};

export { getCars, getCarById, startNewRide, finishRide, getCardStatus, takeCard, returnCard, getBookingsByCarId, removeBooking };
