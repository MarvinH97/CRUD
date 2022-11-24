import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const PRODUCTO: Producto = {
      Name: this.productoForm.get('name')?.value,
      Description: this.productoForm.get('description')?.value,
      Quantity: this.productoForm.get('quantity')?.value
    };
    if (this.id !== null) {
      //Editamos productos
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('El producto fue actualizado con exito!', 'Producto actualizado!');
        //Le decimos que vaya a la ruta raíz
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        //Reseteamos el formulario
        this.productoForm.reset();
        this.toastr.error('Ocurrió un error al intentar actualizar el producto.', 'Error actualización');
      });
    } else {
      //Guardamos productos
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto registrado!');
        //Le decimos que vaya a la ruta raíz
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        //Reseteamos el formulario
        this.productoForm.reset();
        this.toastr.error('Ocurrió un error al intentar guardar el producto.', 'Error registro');
      });
    }
    
  }

  esEditar(){
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        console.log(data);
        this.productoForm.setValue({
          name: data.Name,
          description: data.Description,
          quantity: data.Quantity
        });
      });
    }
  }
}
