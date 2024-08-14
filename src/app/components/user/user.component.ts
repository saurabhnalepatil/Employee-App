import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] // Fixed styleUrls
})
export class UserComponent implements OnInit {
  userList: User[] = [];
  editMode: boolean = false;
  user: User = {
    department: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    doj: "",
    address: "",
    city: "",
    salary: 0,
    action: "",
    status: false,
  };

  cityList: string[] = ["Mumbai", "Pune", "Ahemadabad", "Kolkata", "Noida", "Amravati"];
  departmentList: string[] = ["IT", "HR", "Account", "Sales", "Management"];

  constructor(
    private _userService: EmployeeService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this._userService.getUsers().subscribe((res) => {
      this.userList = res;
    });
  }

  onSubmit(form: NgForm): void {
    debugger;
    if (this.editMode) {
      this._userService.updateUser(this.user).subscribe((res) => {
        this.getUserList();
        this.editMode = false;
        form.resetForm();
        this._toastrService.success('User updated successfully.', 'Success')
      });
    } else {
      this._userService.addUser(this.user).subscribe((res) => {
        this.getUserList();
        form.resetForm();
        this._toastrService.success('User added successfully.', 'Success')
      });
    }
  }

  onResetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.getUserList();
  }

  onEdit(userData: User) {
    this.user = userData;
    this.editMode = true;
  }
  
  onDelete(id: any) {
    const isConfirm = confirm('Are you sure want to delete this user?');
    if (isConfirm) {
      this._userService.deleteUser(id).subscribe((res) => {
        this._toastrService.error('User deleted successfully', 'Deleted')
        this.getUserList();
      })
    }
  }
}
