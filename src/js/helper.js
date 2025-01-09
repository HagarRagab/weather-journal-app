// formatting date or time
export function formatDateTime(date, isTime = true) {
    let options = {
        hour: "numeric",
        minute: "numeric",
    };
    if (!isTime)
        options = {
            weekday: "short",
        };

    return new Intl.DateTimeFormat("en-us", options).format(date);
}

// Convert country code to country name
export function getRegionNameFromCode(countryCode) {
    const regionName = new Intl.DisplayNames(["en"], { type: "region" });
    return regionName.of(countryCode);
}
