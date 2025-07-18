export const calculateTotal = (amounts: string) => {
    const parsedAmounts = amounts
      .split(/[,\n]+/)
      .map((amt) => amt.trim())
      .filter((amt) => amt !== "")
      .map(amt=> parseFloat(amt));

    return parsedAmounts.filter(num => !isNaN(num)).reduce((acc, curr) => acc + curr, 0);
  };