import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { SublistComponent } from './sublist/sublist.component';


const routes: Routes = [ {path: 'header', component:HeaderComponent},
{path: 'category', component:ListComponent},
{path: 'subcategory', component:SublistComponent},
{path: '', component:HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
