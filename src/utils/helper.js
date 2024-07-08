export function addDots(numberStr) {
    if (typeof numberStr !== "string") {
      numberStr = String(numberStr);
    }
    return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }