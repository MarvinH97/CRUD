import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { 
    this.productoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  agregarProducto(){
    const PRODUCTO: Producto = {
      Name: this.productoForm.get('name')?.value,
      Description: this.productoForm.get('description')?.value,
      Quantity: this.productoForm.get('quantity')?.value
    };
    this.toastr.success('El producto fue registrado con exito!', 'Producto registrado');
    //Le decimos que vaya a la ruta raíz
    this.router.navigate(['/']);
  }
}
