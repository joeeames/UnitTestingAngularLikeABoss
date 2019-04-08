import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (shallow tests)', () => {
  let mockHeroService;
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero;
  }

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]
    mockHeroService = jasmine.createSpyObj('heroService', ['getHeroes', 'addHero', 'deleteHero']);
    
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroService}]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it(`should set heroes correctly from service`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3)
  });

  it('should have the right count of li tags', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });

  // PROBLEM 4 - Add Missing Code
  // it('should add a new li when add is called', () => {
  //   mockHeroService.getHeroes.and.returnValue(of(HEROES))
  //   mockHeroService.addHero.and.returnValue(of({id:1, name: 'Bob', strength: 2}))

  //   fixture.componentInstance.add('Bob');
  //   expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(4);
  // })
});
