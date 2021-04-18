import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { ListComponent } from './component/list/list.component';
import { SublistComponent } from './component/sublist/sublist.component';


const routes: Routes = [ {path: 'header', component:HeaderComponent},
{path: 'category', component:ListComponent},
{path: 'subcategory', component:SublistComponent},
{path: '', component:HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
