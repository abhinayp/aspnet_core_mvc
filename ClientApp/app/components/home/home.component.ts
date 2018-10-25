import { Component, Injectable, Inject, EventEmitter, Input, OnInit, Output, NgModule  } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http,Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { ShoppingItem } from '../model/ShoppingItem';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})

export class HomeComponent {

    public shoppingItems: ShoppingItem[] = [];
    public shoppingItem = new ShoppingItem(-1, "", "", "", 0);
    public createShoppingItem = new ShoppingItem(-1, "", "", "", 0);

    public showAll: boolean = true;
    public editItem: boolean = false;
    public title: string = "";
    public description: string = "";

    //Inital Load
    constructor(public http: Http) {
        this.getItemsDetails('');
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
                this.updateTitleBar(true);
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
                this.updateTitleBar();
            });
        }
    }

    // Create a new item
    createItem() {
        let item = this.createShoppingItem;
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
            this.getItemsDetails('');
        });
    }

    onClickItem(itemId: number) {
        this.getItemsDetails(itemId.toString());
    }

    onClickEdit(status: boolean = false) {
        this.editItem = status;
        this.updateTitleBar();
    }

    updateTitleBar(defaultValues?:boolean, title?: string, description?: string) {
        this.title = title || this.shoppingItem.title;
        this.description = description || this.shoppingItem.description;

        if (defaultValues) {
            this.title = "Shopping List";
            this.description = "List of items that are avaialble to shop";
        }
    }
}
