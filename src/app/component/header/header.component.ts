import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from '../../shared/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  }
  items: MenuItem[] = [{ label: 'Select Location' }]
  constructor(private readonly dataService: DataService, private readonly router: Router) { }
  @Input() location
  
  ngOnInit() {
    this.initilizationFn()
  }

  // to set up the initial data//
  initilizationFn() {
    const locationArray = []
    const locationClone = this.location.data.locations
    for (let x of locationClone) {
      const branchArray = []
      for (let y of x.branches) {
        branchArray.push({
          label: y.name, command: (event) => {
            this.router.navigate(['/category'])
            this.dataService.passDataFn({ value: event.item.label, location: locationClone, type: '2nd level' })
          }
        })
      }
      const obj = {
        label: x.name, items: branchArray, command: (event) => {
          this.router.navigate(['/category'])
          this.dataService.passDataFn({ value: event.item.label, location: locationClone, type: '1st level' })
        }
      }
      locationArray.push(obj)
    }
    this.items[0]['items'] = locationArray
  }

}
