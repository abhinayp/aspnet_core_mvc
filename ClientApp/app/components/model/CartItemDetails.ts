import { ShoppingItem } from "./ShoppingItem";

export class CartItemDetails {
    constructor(
        public CItem: ShoppingItem,
        public CQty: number,
        public CTotalPrice: number
    ) { }
}
