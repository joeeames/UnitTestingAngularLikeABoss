import { HeroSearchComponent } from './hero-search.component';
import { of } from 'rxjs';
import { doesNotThrow } from 'assert';
import { tap, catchError } from 'rxjs/operators';

describe('hero-search', () => {
  describe('search', () => {
    let component, mockHeroService;

    beforeEach(() => {
      mockHeroService = jasmine.createSpyObj('', ['searchHeroes'])
      component = new HeroSearchComponent(mockHeroService);
    })

    it('should set heroes$ to the returned value when called', (done) => {
      mockHeroService.searchHeroes.and.returnValue(of([{id:3, name:'bob'}]))

      component.ngOnInit();

      component.heroes$
      .subscribe((heroes) => {
        expect(heroes.length).toBe(1);
        expect(heroes[0].id).toBe(3);
        expect(heroes[0].name).toBe('bob');
        done();
      })

      component.search('bob');

    })
  })
})