import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { EmployeeComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeComponent, ReactiveFormsModule] // Include ReactiveFormsModule for form handling
    });
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the employee form with default values', () => {
    expect(component.employeeForm).toBeDefined();
    expect(component.employeeForm.get('name').value).toBe('');
    expect(component.employeeForm.get('dateOfBirth').value).toBe('');
    expect(component.employeeForm.get('city').value).toBe('');
    expect(component.employeeForm.get('salary').value).toBe(0);
    expect(component.employeeForm.get('gender').value).toBe('');
    expect(component.employeeForm.get('email').value).toBe('');
  });
});
