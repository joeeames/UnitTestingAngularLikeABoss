import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]

    mockHeroService = jasmine.createSpyObj('heroService', ['getHeroes', 'addHero', 'deleteHero']);
    
    component = new HeroesComponent(mockHeroService);  
  });

  describe('delete', () => {

    it('should remove the selected hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    })

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalled();
    })


    // PROBLEM 2 - FILL IN THE BLANK
    // it('should add the heroes to the private member returned by getHeroes', () => {
    //   mockHeroService.getHeroes.and.returnValue(of([{name: 'Bob'}]));
    //   component.getHeroes();

    //   expect(WHAT??)
    // })


    // PROBLEM 3 - FIX EVERYTHING
    // it('should add a hero when add is called', () => {
    //   expect(component.heroes.length).toBe(3);
    //   component.heroes = [{id:1,name:'Al',strength:5}, {id:2,name:'Donald',strength:50}]
    //   expect(component.heroes[2]).toEqual({id:3,name: 'Bob', strength: 11});
    //   component.add('Bob');
    //   mockHeroService.addHero.and.returnValue(of(WHAT))
    // })

    // PROBLEM 4 - WRITE THE COMPLETE TEST
    // it('should not add a hero when the name is blank', () => {
    //   component.heroes = [];
    //   component.add(' ');
    //   expect(component.heroes.length).toBe(0);
    // })


    // PROBLEM 5 - WRITE THE COMPLETE TEST
    // it('should not call addHeroes when name is blank', () => {
    //   component.heroes = [];
    //   component.add(' ');
    //   expect(mockHeroService.addHero).not.toHaveBeenCalled();
    // })

  });
});
