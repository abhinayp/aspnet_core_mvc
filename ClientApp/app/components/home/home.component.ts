import { Component, Injectable, Inject, EventEmitter, Input, OnInit, Output, NgModule  } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http,Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { ShoppingItem } from '../model/ShoppingItem';
import { CartItemDetails } from "../model/CartItemDetails";
import { User } from '../model/User';
import * as $ from 'jquery';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})

export class HomeComponent {

    public shoppingItems: ShoppingItem[] = [];
    public cartItem: CartItemDetails[] = [];

    public shoppingItem = new ShoppingItem(-1, "", "", "", 0);
    public createShoppingItem = new ShoppingItem(-1, "", "", "", 0);

    public showAll: boolean = true;
    public editItem: boolean = false;
    public showCart: boolean = false;

    public title: string = "";
    public description: string = "";
    public cartTotalPrice: number = 0;

    public userLogin: User = new User("", "");
    public userRegister = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        UserRoles: ""
    }
    public registrationError: string = "";
    public userDetails = {
        status: false,
        user: new User("", ""),
        error: "",
        roles: new Array
    };
    public adminstrator: boolean = false;
    public roles = [];

    //Inital Load
    constructor(public http: Http) {
        this.updateTitleBar();
        this.getItemsDetails('');
        this.checkCurrentUser();
        this.getRoles(this.setRole.bind(this));
    }

    formatter() {
        // Create our number formatter.
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            // the default value for minimumFractionDigits depends on the currency
            // and is usually already 2
        });
        return formatter;
    }

    //Get all the Item Details and Item Details by Item Id
    getItemsDetails(itemName: string) {
        this.onClickEdit(false);

        if (itemName == "") {
            this.http.get('/item').subscribe(result => {
                // this.updateTitleBar(true);
                this.showAll = true;
                this.shoppingItems = result.json();
            });
        }
        else {
            this.http.get('/item/' + itemName).subscribe(result => {
                if (!result.json()) {
                    this.getItemsDetails('');
                    return
                }

                this.showAll = false;
                let shoppingItem: ShoppingItem = result.json();
                this.shoppingItem = shoppingItem;
                // this.updateTitleBar();
            });
        }
    }

    // Create a new item
    createItem() {
        let item = this.createShoppingItem;
        delete item.id;

        this.http.post('/item', item).subscribe(result => {
            if (!result.json()) {
                this.getItemsDetails('');
                return
            }

            this.showAll = false;
            let shoppingItem: ShoppingItem = result.json();
            this.getItemsDetails(shoppingItem.id.toString());
        });

    }

    updateItem(item: ShoppingItem) {
        this.http.post(`/item/update/${item.id}`, item).subscribe(result => {
            if (!result.json()) {
                this.getItemsDetails(item.id.toString());
                return
            }

            this.showAll = false
            let shoppingItem: ShoppingItem = result.json();
            this.shoppingItem = shoppingItem;
            this.onClickEdit(false);

        });
    }

    deleteItem(item: ShoppingItem) {
        this.http.post(`/item/delete/${item.id}`, null).subscribe(result => {
            this.deleteFromCart(item);
            this.getItemsDetails('');
        });
    }

    onClickItem(itemId: number) {
        this.getItemsDetails(itemId.toString());
    }

    onClickEdit(status: boolean = false) {
        this.editItem = status;
        // this.updateTitleBar();
    }

    updateTitleBar(defaultValues?:boolean, title?: string, description?: string) {
        // this.title = title || this.shoppingItem.title;
        // this.description = description || this.shoppingItem.description;

        // if (defaultValues) {
            this.title = "Shopping List";
            this.description = "List of items that are avaialble to shop";
        // }
    }


    addToCart(item: ShoppingItem) {
        let find_item_index = this.cartItem.findIndex(i => i.CItem.id == item.id);
        if (find_item_index > -1) {
            this.cartItem[find_item_index].CQty = this.cartItem[find_item_index].CQty + 1;
            this.cartItem[find_item_index].CTotalPrice = this.cartItem[find_item_index].CItem.price * this.cartItem[find_item_index].CQty;
        }
        else {
            this.cartItem.push(new CartItemDetails(item, 1, item.price));
        }
        this.calCartTotalPrice();
    }

    deleteFromCart(item: ShoppingItem) {
      let find_item_index = this.cartItem.findIndex(i => i.CItem.id == item.id);
      if (find_item_index > -1) {
        this.cartItem.splice(find_item_index, 1);
      }
      this.calCartTotalPrice()
    }

    decrementFromCart(index: number) {
        this.cartItem[index].CQty = this.cartItem[index].CQty - 1;
        this.cartItem[index].CTotalPrice = this.cartItem[index].CItem.price * this.cartItem[index].CQty
        if (this.cartItem[index].CQty == 0) {
            this.cartItem.splice(index, 1);
        }
        this.calCartTotalPrice();
    }

    onShowCart(status: boolean) {
        this.showCart = status;
        this.calCartTotalPrice();
    }

    calCartTotalPrice() {
        let totalPrice = 0;
        for (let i in this.cartItem) {
            let c = this.cartItem[i];
            totalPrice = totalPrice + c.CTotalPrice;
        }
        this.cartTotalPrice = totalPrice;
    }

    /**
     * LOGIN
     */

    loginD() {
        let user: User = this.userLogin;
        this.http.post('/account/sign-in', user).subscribe(result => {
            if (result.json() && result.json().user) {
                this.checkCurrentUser()
                $('#closeLoginModal').click();
                $('.modal-backdrop').remove();
                return
            }

            this.userDetails.status = false;
            this.userDetails.error = "Login Failed";

        });
    }

    currentUser(callback: any) {
        this.http.get('/account/current-user').subscribe(result => {
            callback(result.json());
        });
    }

    logout() {
        this.http.post('/account/logout', {}).subscribe(result => {
            this.userDetails.status = false;
            this.userDetails.user = new User("", "");
            this.userDetails.roles = [];
            this.adminstrator = false;
        });
    }

    checkCurrentUser() {
        this.currentUser((result: any) => {
            if (result && result["user"]) {
                let email: string = result["user"]
                let user: User = new User(email, "");
                this.userDetails.status = true;
                this.userDetails.user = user;
                this.userDetails.roles = result["roles"]
                this.userDetails.error = "";
                if (this.userDetails.roles.indexOf("Administrator") > -1) {
                    this.adminstrator = true;
                }
                else {
                    this.adminstrator = false;
                }
            }
            else {
                this.adminstrator = false;
            }
            this.registrationError = "";
        });
    }

    registerD() {
        this.http.post('/account', this.userRegister).subscribe(result => {
            if (result.json() && result.json().user) {
                this.checkCurrentUser()
                $('#closeRegisterModal').click();
                $('.modal-backdrop').remove();
                return
            }

            this.registrationError = "Registration error"

        });
    }

    getRoles(callback?: any) {
        this.http.post('/account/get-roles', {}).subscribe(result => {
            let roles = [];
            if (result.json() && result.json()['roles']) {
                roles = result.json()['roles'].map((r: any) => {
                    return r.name;
                });
            }
            this.roles = roles;
            if (callback) {
                callback();
            }
        });
    }

    setRole() {
        this.userRegister.UserRoles = this.roles[0];
    }

}
