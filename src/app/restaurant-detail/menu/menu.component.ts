import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from '../menu-item/menu-item.model';
import { trigger, state, style, transition , animate } from '@angular/animations';


@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate('300ms 0s ease-in')
      ]),

    ])
  ]
})
export class MenuComponent implements OnInit {

  menuItemState = 'ready'

  menu: Observable<MenuItem[]>

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantsService
      .menuOfRestaurant(this.route.parent.snapshot.params['id'])
  }

  addMenuItem(item: MenuItem) {
    console.log(item)
  }
}
