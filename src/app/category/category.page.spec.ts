import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPage } from './category.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoryPage', () => {
  let component: CategoryPage;
  let fixture: ComponentFixture<CategoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPage, IonicStorageModule.forRoot()],
      providers: [
        provideIonicAngular(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
