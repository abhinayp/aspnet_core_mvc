import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { cartComponent } from './components/cart/cart.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        cartComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: 'home', redirectTo: '', pathMatch: 'full' },
            { path: '', component: HomeComponent },
            { path: '**', redirectTo: 'home' },
            { path: 'cart', component: cartComponent }
        ])
    ]
})
export class AppModuleShared {
}
