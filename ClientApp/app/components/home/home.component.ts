import { Component, Injectable, Inject, EventEmitter, Input, OnInit, Output, NgModule  } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http,Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { ShoppingItem } from '../model/ShoppingItem';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent {

    public shoppingItems: ShoppingItem[] = [];
    public shoppingItem = new ShoppingItem(0, "", "", "");

    public showAll: boolean = true;
    public editItem: boolean = false;
    public title: string = "";
    public description: string = "";

    //Inital Load
    constructor(public http: Http) {
        this.getItemsDetails('');
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
                this.showAll = false;
                let shoppingItem: ShoppingItem = result.json();
                this.shoppingItem = shoppingItem;
                this.updateTitleBar();
            });
        }
    }

    // Create a new item
    createItem(item: ShoppingItem) {

        this.http.post('/item', item).subscribe(result => {
            this.showAll = false
            let shoppingItem: ShoppingItem = result.json();
            this.shoppingItem = shoppingItem;
        });

    }

    updateItem(item: ShoppingItem) {
        this.http.post(`/item/update/${item.id}`, item).subscribe(result => {
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
        this.updateTitleBar(!status);
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
