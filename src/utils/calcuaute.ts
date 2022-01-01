export const calcauteParkingPrice = (entranceTime: Date, exitTime: Date) => {
    const timestamp = exitTime.getTime() - entranceTime.getTime();
    const hours = Math.floor(timestamp / (1000 * 3600));
    return hours < 1 ? 30 : hours * 30;
};
