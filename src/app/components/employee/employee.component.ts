import { Component, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('myModel', { static: false }) model: ElementRef | undefined;
  employeeList: Employee[] = [];
  empservices = inject(EmployeeService);

  employeeForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.setFormState();
    this.getEmployees();
  }

  openModel() {
    if (this.model != null) {
      this.model.nativeElement.style.display = 'block';
    }
  }

  closeModel() {
    this.setFormState();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  getEmployees() {
    this.empservices.getAllEmployees().subscribe((res) => {
      this.employeeList = res;
    })
  }
  setFormState() {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      age: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      status: [false, [Validators.required]]
    })
  }

  formValues: any;
  onSumbmit() {
    console.log(this.employeeForm.value)
    if (this.employeeForm.invalid) {
      alert('Please fill the all fields.');
      return;
    }
    if (this.employeeForm.value.id == 0) {
      this.formValues = this.employeeForm.value;
      this.empservices.addEmployee(this.formValues).subscribe((res) => {
        alert('Employee added successfully.');
        this.getEmployees();
        this.employeeForm.reset();
        this.closeModel();
      })
    } else {
      this.formValues = this.employeeForm.value;
      this.empservices.updateEmployee(this.formValues).subscribe((res) => {
        alert('Employee updated successfully.');
        this.getEmployees();
        this.employeeForm.reset();
        this.closeModel();
      })
    }
  }

  onDelete(employee: Employee) {
    const isConfirm = confirm("Are you sure you want to delete this Employee " + employee.name);
    if (isConfirm) {
      this.empservices.deleteEmployee(employee.id).subscribe((res) => {
        alert("Employee Deleted Successfully.");
        this.getEmployees();
      })
    }
  }

  onEdit(employee: Employee) {
    this.openModel();
    this.employeeForm.patchValue(employee);
  }
}
