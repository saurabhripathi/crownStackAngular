import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-sublist',
  templateUrl: './sublist.component.html',
  styleUrls: ['./sublist.component.scss']
})
export class SublistComponent implements OnInit {
  location: any;
  locationClone: any[];
  categoryArray: any[];
  subCategoryArray: any[];

  constructor(private readonly dataService: DataService) { }

  ngOnInit() {
    this.dataService.passData.subscribe((data)=>{
      this.location = data.location
      this.locationClone = [...this.location]
      this.fetchSubCategory(data)
    })
  }

  // fetch the sub categories ??
  fetchSubCategory(data){
    let subcCategoryArray = []
    this.locationClone.forEach((item, index)=>{
      item.branches.forEach((branch, index)=>{
        for(let x of branch.categories){
          if(x.name === data.category){
            subcCategoryArray = subcCategoryArray.concat(x.subcategories)
          }
        }
      })
    }) 
    this.subCategoryArray = this.dataService.removeDuplicate(subcCategoryArray)
  }

}
