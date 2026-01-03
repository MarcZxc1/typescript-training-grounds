function calculateTotal(price: number, tax: number) {
  return price + price * tax;
}
const total = calculateTotal(100, 0.12);
console.log("Total is:", total);
