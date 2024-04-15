import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProductoResponse } from '@mantenimientos/interfaces/IProducto.interface';
import { ProductoService } from '@mantenimientos/services/producto.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [NgxPaginationModule,NgSelectModule,ReactiveFormsModule,FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  p = 1;
  itemsPerPage = 5;
  formulario!:FormGroup;
  isEditar:boolean=false;
  @ViewChild('cerrar') cerrar!: ElementRef;

  constructor( private productoService: ProductoService, private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.formulario=this.iniciarFormulario();
    this.getPages(0);
    this.productoService.getAllCategorias();
    this.productoService.getAllUnidades();
  }

  private iniciarFormulario(){
    return this.fb.group({
      idProducto:[''],
      estado:[''],
      codigo:[''],
      nombreProducto:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      tipoProducto:['',[Validators.required]],
      unidad:[null,[Validators.required]],
      categoriaProducto:[null,[Validators.required]],
      cantidad:['',[Validators.required]]
    })
  }

  get listProductos(){
    return this.productoService.listProductos;
  }
  get isLoading(){
    return this.productoService.isLoading;
  }

  get listCategorias(){
    return this.productoService.listCategorias;
  }

  get listUnidades(){
    return this.productoService.listUnidades;
  }


  getPages(page: number) {
    this.productoService.getProductosByPage(page, this.itemsPerPage);
  }

  pageChange(newPage: number) {
    this.p = newPage;
    this.getPages(this.p - 1);
  }

  abrirModal(){
    this.isEditar=false;
    this.formulario.reset();
  }


  guardarProducto(){
    console.log(this.formulario.value);
    if(this.formulario.valid){
        if(this.isEditar){
          this.productoService.editarProducto(this.formulario.get('idProducto')?.value,this.formulario.value).subscribe({
            next:()=>{

              this.formulario.reset();
              Swal.fire({
                title: "Éxito",
                text: "El producto se ha editado exitosamente",
                icon: "success"
              });
              this.cerrar.nativeElement.click();
              this.getPages(0);
          this.isEditar=false;

            },
            error:()=>{
              Swal.fire({
                title: "Error",
                text: "El registro no se ha logrado editar",
                icon: "warning"
              });
          this.isEditar=false;

            }
          });
        }else{
          this.productoService.crearProducto(this.formulario.value).subscribe({
            next:()=>{
              this.formulario.reset();
              Swal.fire({
                title: "Éxito",
                text: "El producto se ha registrado exitosamente",
                icon: "success"
              });
              this.cerrar.nativeElement.click();
              this.getPages(0);
            },
            error:(resp)=>{
              Swal.fire({
                title: "Error",
                text: "El registro no se ha registrado",
                icon: "warning"
              });
            }
          });
        }
    }
  }

  editar(producto:IProductoResponse){
    this.formulario.reset();
    this.isEditar=true;


    this.formulario.setValue({
    idProducto: producto.idProducto,
    estado: producto.estado === 'Activo' ? true: false,
    codigo: producto.codigo,
    nombreProducto: producto.nombreProducto,
    descripcion: producto.descripcion,
    tipoProducto: producto.idTipoProducto.toString(),
    unidad: producto.idUnidad.toString(),
    categoriaProducto: producto.categoriaProducto.toString(),
    cantidad: producto.cantidad,

    });
  }

  eliminar(id:number){
    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar este registro?",
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id).subscribe({
          next:()=>{
            this.formulario.reset();
            Swal.fire({
              title: "Éxito",
              text: "El producto se ha eliminado exitosamente",
              icon: "success"
            });
            this.cerrar.nativeElement.click();
            this.getPages(0);
          },
          error:(resp)=>{
            Swal.fire({
              title: "Error",
              text: "Este producto tiene órdenes de producción asociadas y no puede ser eliminado del inventario.",
              icon: "warning"
            });
          }
        });
      }
    });
  }

}
