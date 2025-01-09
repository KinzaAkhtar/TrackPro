const getTimeAsDate = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const now = new Date(); // Get the current date
    now.setHours(hours, minutes, 0, 0); // Set the time on the current date
    return now;
};

export {getTimeAsDate};