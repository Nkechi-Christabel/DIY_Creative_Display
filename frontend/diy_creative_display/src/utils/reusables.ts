export const disableNavFooter = ["/signup", "/login"];

export const nameToCamelCase = (name: string) => {
  return name
    ?.split(" ")
    ?.map((n: string) => `${n[0]?.toUpperCase()}${n?.slice(1)}`)
    .join(" ");
};
