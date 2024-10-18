import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesComponent } from './employees.component';
import { EmployeeService } from '../service/employee.service';
import { of } from 'rxjs';
import { Employee } from '../model/employee';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    // Create a spy for EmployeeService
    const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

    TestBed.configureTestingModule({
      imports: [EmployeesComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);

    // Mock the getEmployees method to return an observable of mock employee data
    const mockEmployees: Employee[] = [
      { name: 'John Doe', dateOfBirth: new Date('1990-01-01'), city: 'New York', salary: 50000, gender: 'M', email: 'john@example.com' },
      { name: 'Jane Smith', dateOfBirth: new Date('1992-02-02'), city: 'Los Angeles', salary: 60000, gender: 'F', email: 'jane@example.com' },
    ];
    employeeService.getEmployees.and.returnValue(of(mockEmployees)); // Return mock data

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize employees$ with employee data', () => {
    component.employees$.subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees[0].name).toBe('John Doe');
      expect(employees[1].name).toBe('Jane Smith');
    });
  });
});
