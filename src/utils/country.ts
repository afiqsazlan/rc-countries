/*
* Converts string such as 'San Marino' to 'san-marino'
**/
export function convertStringToUrlFriendly(str: string): string {
    // Replace spaces with dashes
    const url = str.replace(/\s+/g, '-');

    // Remove special characters
    const urlFriendly = url.replace(/[^a-zA-Z0-9-]/g, '');

    return urlFriendly.toLowerCase();
}

export function convertUrlFriendlyToText(url: string): string {
    // Replace dashes with spaces
    const string = url.replace(/-/g, ' ');
    return string.toLowerCase();
}
