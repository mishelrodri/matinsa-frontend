import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RequestResponse } from '@security/models/IRequest';
import { IOrden, IOrdenResponse } from '@ordenes/interfaces/IOrden.interface';
import { ICliente } from '@ordenes/interfaces/ICliente.interface';
import { ICategoria } from '@ordenes/interfaces/ICategoria.interface';
import { ICantidad, IProducto } from '@ordenes/interfaces/IProducto.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  clientes = `${environment.urlAPI}/cliente`;
  categorias = `${environment.urlAPI}/categoria`;
  productos = `${environment.urlAPI}/producto`;
  orden = `${environment.urlAPI}/orden-produccion`;
  isLoading: boolean = false;
  listClientes: ICliente[] = [];
  listCategorias: ICategoria[] = [];
  listProductos: IProducto[] = [];
  listMateriaPrima: IProducto[] = [];
  listOrdenes: RequestResponse<IOrdenResponse> = {
    content: [],
    pageable: {
      sort: {
        empty: true,
        unsorted: true,
        sorted: true,
      },
      offset: 0,
      pageSize: 0,
      pageNumber: 0,
      paged: true,
      unpaged: true,
    },
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    sort: {
      empty: true,
      unsorted: true,
      sorted: true,
    },
    empty: true,
    first: true,
    numberOfElements: 0,
  };

  constructor(private http: HttpClient) { }

  getAllClientes() {
    return this.http.get<ICliente[]>(`${this.clientes}/combo`).subscribe((clientes) => {
      this.listClientes = clientes;
    });
  }

  getAllCategorias() {
    return this.http.get<ICategoria[]>(`${this.categorias}/combo`).subscribe((categorias) => {
      this.listCategorias = categorias;
    });
  }

  getProductosByTipo(tipo:any) {
    return this.http.get<IProducto[]>(`${this.productos}/combo/${tipo}`).subscribe((productos) => {
      this.listProductos = productos;
    });
  }

  getAllMateriaPrima() {
    return this.http.get<IProducto[]>(`${this.productos}/combo-materia-prima`).subscribe((materiaprima) => {
      this.listMateriaPrima = materiaprima;
    });
  }

  verificarExistencias(cantidad:ICantidad){
    return this.http.post<string>(`${this.orden}/verificar-existencias`,cantidad);
  }

  crearOrdenProduccion(datos:IOrden){
    return this.http.post<string>(`${this.orden}`,datos);
  }

  getOrdenesByPage(page: number = 0, size: number = 10) {
    this.isLoading = true;
    return this.http
      .get<RequestResponse<IOrdenResponse>>(`${this.orden}`, {
        params: { page: page.toString(), size: size.toString() },
      })
      .subscribe((data) => {
        this.listOrdenes = data;
        this.isLoading = false;
      });
  }

}
