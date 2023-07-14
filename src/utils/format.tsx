export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  export const formatName = (string: string, number: number) => {
    if (string.length > number - 2) {
      return string.substring(0, number).concat("...");
    } else return string;
  };
  
  export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  
  export const formatAsNgnMoney = (value: number | string) => {
    if (!value) return "";
    return `₦${value
      .toLocaleString("en-US")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };
  