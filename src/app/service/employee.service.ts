import { Injectable } from '@angular/core';
import {Firestore, collectionData, collection, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private firestore: Firestore) {}

  getEmployees(): Observable<Employee[]> { // 返回一个包含员工对象的 Observable 数组
    const employeesCollection = collection(this.firestore, 'employees'); //获取 Firestore 中的 'employees' 集合
    return collectionData(employeesCollection, { idField: 'id' }).pipe( // 获取employee的data
      map((employees: any[]) => {
        return employees.map(employee => ({
          ...employee, // 创建新的employee对象
          dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.toDate() : null // Convert Timestamp to Date
        }));
      })
    ) as Observable<Employee[]>;
  }

  addEmployee(employee: Employee): Promise<void> {
    const employeesCollection = collection(this.firestore, 'employees');
    // Add employee document to Firestore
    return addDoc(employeesCollection, employee).then();
  }
}
