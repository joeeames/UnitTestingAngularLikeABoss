import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}


describe('HeroDetailComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;
  let mockHeroService;
  let mockRouter;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]

    mockHeroService = jasmine.createSpyObj('heroService', ['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
        HeroesComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    
    fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponents.length).toEqual(HEROES.length);
    for (let i = 0; i < heroComponents.length; i++) {
      expect(heroComponents[i].componentInstance.hero).toBe(HEROES[i]);
    }
  });

  it(`should call heroservice.deleteHero when the HeroComponent's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    
    // Method 1 for raising the event    
    // this method is just causing the event on a HTML element
    // heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {} })

    // Method 2 of raising the event
    // this method gets a handle to the event emitter and calls it
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    // Method 3 of raising the event
    // this method will raise ANY event you put in here. If there is no listener in the template (eventname)="blah" then nothing will listen. so if we raise "crap" then there must be (crap)="blah()" in the parent template. That's all that matter. So technically this doesn't dig very far into the child and doesn't really care about the implementation of the child.
    heroComponents[0].triggerEventHandler('delete', null);


    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to this list when one is added', () => {
    var name = "Mr. Ice";
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}))

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    
    inputElement.value = name;      
    addButton.triggerEventHandler('click', null)
    fixture.detectChanges();

    expect(getHeroesText(fixture)).toContain(name);
  });

  it('has the correct route for the first hero', () => {
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    // get the routerLinkDirective
    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    // click the link
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null)

    expect(routerLink.navigatedTo).toBe('/detail/1')
  })

  function getHeroesText(fixture) {
    return fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
  }
});
