import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public passData = new BehaviorSubject<any>('')
  constructor() { 
  }
  // to pass data between components //
  passDataFn(data){
    this.passData.next(data)
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
}
