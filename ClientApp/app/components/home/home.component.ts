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

    public shoppingItem: ShoppingItem[] = [];

    //Inital Load
    constructor(public http: Http) {
        this.getItemsDetails('');
    }

    //Get all the Item Details and Item Details by Item name
    getItemsDetails(newItemName: string) {
     
        if (newItemName == "") {
            this.http.get('/item').subscribe(result => {
                this.shoppingItem = result.json();
            });
        }
        else {
            this.http.get('/item' + newItemName).subscribe(result => {
                this.shoppingItem = result.json();
            });
        }
    }
}
