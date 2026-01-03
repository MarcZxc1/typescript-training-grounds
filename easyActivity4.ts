type OrderStatus = "pending" | "shipped" | "delivered";

interface Order {
  id: number;
  status: OrderStatus;
}
/**
 *@param order
 * @param newStatus
 * */
function updateStatus(order: Order, newStatus: OrderStatus) {
  return { ...order, status: newStatus };
}

const myOrder: Order = { id: 101, status: "pending" };
const myOrder1: Order = { id: 102, status: "shipped" };

console.log(myOrder);

console.log(updateStatus(myOrder, "delivered"));

console.log("======================================");
console.log(myOrder, myOrder1);
console.log(updateStatus(myOrder1, "delivered"));
