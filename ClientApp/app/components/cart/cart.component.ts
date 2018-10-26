import { Component, Injectable, Inject, EventEmitter, Input, OnInit, Output, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { ShoppingItem } from "../model/ShoppingItem";
import { CartItemDetails } from "../model/CartItemDetails";

@Component({
  selector: "cart",
  template: require("./cart.component.html")
})
export class cartComponent {
  //Declare Variables to be used


}
