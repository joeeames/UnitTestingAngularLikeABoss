import { TestBed, async, fakeAsync, tick, flush, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('HeroDetailComponent (shallow tests)', () => {

  let fixture, mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return 3; }}}
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back'])

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation}
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude'}))
  });

  it(`should have the correct hero`, () => {
    // run ngOnInit
    fixture.detectChanges();
    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });

  it('should render hero name in a h2 tag', () => {
    // run ngOnInit
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  // version 1 with done function
  // it('should updateHero when save is called', (done) => {
  //   mockHeroSerivce.updateHero.and.returnValue(of({}))

  //   fixture.detectChanges();
  //   fixture.componentInstance.save()
  //   console.log(1)
  //   setTimeout(() => {
  //     expect(mockHeroSerivce.updateHero).toHaveBeenCalled()
  //     console.log('done')
  //     done();
  //   }, 300);
  //   console.log(2)
  // })

  // version 2 using fakeAsync
  // it('should updateHero when save is called', fakeAsync(() => {
  //   mockHeroSerivce.updateHero.and.returnValue(of({}))

  //   fixture.detectChanges();
  //   fixture.componentInstance.save();
  //   // tick(250);
  //   flush();
  //   expect(mockHeroSerivce.updateHero).toHaveBeenCalled()
  // }))

  // version 3 using async and a promise in the component
  it('should updateHero when save is called', waitForAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}))

    fixture.detectChanges();
    fixture.componentInstance.save();
    fixture.whenStable().then(() => {
      // console.log(1)
      expect(mockHeroService.updateHero).toHaveBeenCalled()
    });
    // console.log(2)
  }))
});
