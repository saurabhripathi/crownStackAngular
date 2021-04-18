import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// import * as a from '../../assets/images'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  locationArray: any;
  selectedMenu: any;
  categoryArray: any[];
  subscribe: Subscription

  constructor(private readonly dataService: DataService, private readonly router: Router) { }

  ngOnInit() {
    this.initialFn()
  }

  // to fetch category by Location//
  fetchCategorybyLoacation() {
    const cloneLocationArray = [...this.locationArray]
    let categoryArray = []
    for (let x of cloneLocationArray) {
      if (x.name === this.selectedMenu) {
        x.branches.forEach((item, index) => {
          categoryArray = categoryArray.concat(item.categories)
        })
      }
    }
    this.categoryArray = this.removeDuplicate(categoryArray)
  }

  // to fetch category by Branch//
  fetchCategorybyBranch() {
    const cloneLocationArray = [...this.locationArray]
    const categoryArray = []
    cloneLocationArray.forEach((item, index) => {
      item.branches.forEach((branch, index) => {
        if (branch.name === this.selectedMenu) {
          branch.categories.forEach((category, index) => {
            let obj = {
              ...category,
              imgPath: "../../assets/images/" + category.image
            }
            categoryArray.push(obj)
          })
        }
      })
    })
    this.categoryArray = categoryArray
  }

  initialFn() {
    // getting data from  BehaviorSubject //
    this.subscribe = this.dataService.passData.subscribe((data) => {
      this.locationArray = data.location
      this.selectedMenu = data.value
      data.type === '1st level' ? this.fetchCategorybyLoacation() : this.fetchCategorybyBranch()
    })
  }

  // remove duplicates //
  removeDuplicate(categoryArray) {
    let uniqueCategoryArray = []
    categoryArray.forEach((item, index) => {
      let flag = 0
      for (let i of uniqueCategoryArray) {
        if (i.name === item.name) {
          flag = 1
          break
        }
      }
      if (flag === 0) {
        uniqueCategoryArray.push({
          ...item,
          imgPath: "../../assets/images/" + item.image
        })
      }
    })
    return uniqueCategoryArray
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
  categoryClickedFn(name) {
    this.router.navigate(['/subcategory'])
    this.dataService.passDataFn({ location: this.locationArray, category: name })
  }

}
