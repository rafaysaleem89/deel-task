//This debounce function is used to delay the execution of the search function
//so that it is not called on every key press. Instead, it is called after the user
//has stopped typing for some amount of milliseconds.
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
