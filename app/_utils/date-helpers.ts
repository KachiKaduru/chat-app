export function userDateJoinedFormatted(dateString: string | undefined): string {
  const date = new Date(`${dateString}`);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return `Joined ${date.toLocaleDateString("en-US", options)}`;
}
