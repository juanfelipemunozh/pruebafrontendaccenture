import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RemoteConfig } from '@angular/fire/remote-config';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, IonicStorageModule.forRoot()],
      providers: [
        provideIonicAngular(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
        {
          provide: RemoteConfig,
          useValue: {
            settings: {},
            defaultConfig: {},
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
