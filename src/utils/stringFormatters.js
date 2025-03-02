export const formatModelName = (text) => {
    if (!text) return "";
    return text.replace(/_/g, " ");
};

export const formatDisplayText = (text) => {
    if (!text) return "";

    const withSpaces = text.replace(/_/g, " ");

    return withSpaces
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};
