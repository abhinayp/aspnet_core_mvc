import { CartItemDetails } from "./CartItemDetails";
import { ShoppingItem } from "./ShoppingItem";

export class CartClient {

  public cartItem: CartItemDetails[] = [];

  addToCart(item: ShoppingItem) {
    if (this.cartItem.length > 0) {
      let find_item_index = this.cartItem.findIndex(i => i.CItem.id == item.id);
      if (find_item_index > -1) {
        this.cartItem[find_item_index].CQty = this.cartItem[find_item_index].CQty + 1;
        this.cartItem[find_item_index].CTotalPrice = this.cartItem[find_item_index].CItem.price * this.cartItem[find_item_index].CQty;
      }
    }
    else {
      this.cartItem.push(new CartItemDetails(item, 0, item.price));
    }
  }

  deleteFromCart(item: ShoppingItem) {
    let find_item_index = this.cartItem.findIndex(i => i.CItem.id == item.id);
    if (find_item_index > -1) {
      this.cartItem.splice(find_item_index, 1);
    }
  }
}
