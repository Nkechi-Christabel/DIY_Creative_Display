export const disableNavFooter = ["/signup", "/login"];

export const nameToCamelCase = (name: string) => {
  return name
    ?.split(" ")
    ?.map((n: string) => `${n[0]?.toUpperCase()}${n?.slice(1)}`)
    .join(" ");
};

export function timeAgo(dateString: string, ending: string): string {
  const now = new Date();
  const commentDate = new Date(dateString);

  // Calculate the difference in milliseconds
  const differenceMs = now.getTime() - commentDate.getTime();

  // Convert milliseconds to seconds, minutes, hours, days, weeks, months, and years
  const secondsAgo = Math.floor(differenceMs / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(monthsAgo / 12);

  if (yearsAgo > 0) {
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ${ending}`;
  } else if (monthsAgo > 0) {
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ${ending}`;
  } else if (weeksAgo > 0) {
    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ${ending}`;
  } else if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ${ending}`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ${ending}`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ${ending}`;
  } else {
    return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ${ending}`;
  }
}
