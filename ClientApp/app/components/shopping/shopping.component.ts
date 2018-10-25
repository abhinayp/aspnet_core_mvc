import { Component, Injectable, Inject, EventEmitter, Input, OnInit, Output, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { ShoppingItem } from "../model/ShoppingItem";
import { CartItemDetails } from "../model/CartItemDetails";

@Component({
  selector: "shopping",
  template: require("./shopping.component.html")
})
export class shoppingComponent {
  //Declare Variables to be used

  //To get the WEb api Item details to be displayed for shopping
  public ShoppingDetails: ShoppingItem[] = [];
  myName: string;

  //Show the Table row for Items,Cart  and Cart Items.
  showDetailsTable: Boolean = true;
  AddItemsTable: Boolean = false;
  CartDetailsTable: Boolean = false;
  public cartDetails: CartItemDetails[] = [];

  //For display Item details and Cart Detail items
  public shoppingItem = new ShoppingItem(-1, "", "", "", 0);
  public Qty: number = 0;

  //For calculate Total Price,Qty and Grand Total price
  public totalPrice: number = 0;
  public totalQty: number = 0;
  public GrandtotalPrice: number = 0;

  public totalItem: number = 0;

  //Inital Load
  constructor(public http: Http) {
    this.myName = "Info 6250";
    this.showDetailsTable = true;
    this.AddItemsTable = false;
    this.CartDetailsTable = false;
    this.getShoppingDetails("");
  }

  //Get all the Item Details and Item Details by Item name
  getShoppingDetails(newItemName: string) {
    if (newItemName == "") {
      this.http.get("/api/ItemDetails/Details").subscribe(result => {
        this.ShoppingDetails = result.json();
      });
    } else {
      this.http
        .get("/api/ItemDetails/Details/" + newItemName)
        .subscribe(result => {
          this.ShoppingDetails = result.json();
        });
    }
  }

  // Show the Selected Item to Cart for add to my cart Items.
  showToCart(item: ShoppingItem) {
    this.showDetailsTable = true;
    this.AddItemsTable = true;
    this.CartDetailsTable = false;
    this.shoppingItem = item;
  }

  // to Show Items to be added in cart
  showCart() {
    this.showDetailsTable = false;
    this.AddItemsTable = true;
    this.CartDetailsTable = true;
    this.addItemstoCart();
  }
  // to show all item details
  showItems() {
    this.showDetailsTable = true;
    this.AddItemsTable = false;
    this.CartDetailsTable = false;
  }

  //to Show our Shopping Items details

  showShoppingItems() {
    if (this.cartDetails.length <= 0) {
      alert(
        "Ther is no Items In your Cart.Add Items to view your Cart Details !"
      );
      return;
    }
    this.showDetailsTable = false;
    this.AddItemsTable = false;
    this.CartDetailsTable = true;
  }

  //Check the Item already exists in Cart,If the Item is exist then add only the quantity else add selected item to cart.
  addItemstoCart() {
    var count: number = 0;
    var ItemCountExist: number = 0;
    this.totalItem = this.cartDetails.length;
    if (this.cartDetails.length > 0) {
      for (count = 0; count < this.cartDetails.length; count++) {
        if (this.cartDetails[count].CItem.id == this.shoppingItem.id) {
          ItemCountExist = this.cartDetails[count].CQty + 1;
          this.cartDetails[count].CQty = ItemCountExist;
        }
      }
    }
    if (ItemCountExist <= 0) {
      this.cartDetails.push(
        new CartItemDetails(this.shoppingItem, 1, this.shoppingItem.price)
      );
    }
    this.getItemTotalresult();
  }

  //to calculate and display the total price information in Shopping cart.
  getItemTotalresult() {
    this.totalPrice = 0;
    this.totalQty = 0;
    this.GrandtotalPrice = 0;
    var count: number = 0;
    this.totalItem = this.cartDetails.length;
    for (count = 0; count < this.cartDetails.length; count++) {
      this.totalPrice += this.cartDetails[count].CItem.price;
      this.totalQty += this.cartDetails[count].CQty;
      this.GrandtotalPrice +=
        this.cartDetails[count].CItem.price * this.cartDetails[count].CQty;
    }
  }

  //remove the selected item from the cart.
  removeFromCart(removeIndex: number) {
    alert(removeIndex);
    this.cartDetails.splice(removeIndex, 1);

    this.getItemTotalresult();
  }
}
