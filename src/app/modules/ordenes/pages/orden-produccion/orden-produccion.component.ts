import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdenesService } from '@ordenes/services/ordenes.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-orden-produccion',
  standalone: true,
  imports: [NgxPaginationModule,RouterModule],
  templateUrl: './orden-produccion.component.html',
  styleUrl: './orden-produccion.component.scss'
})
export class OrdenProduccionComponent {

  p = 1; // Página actual para ngx-pagination
  itemsPerPage = 5;

  constructor( private ordenService: OrdenesService) {
  }
  ngOnInit(): void {
    this.getPages(0);
  }

  get listOrdenes(){
    return this.ordenService.listOrdenes;
  }

  get isLoading(){
    return this.ordenService.isLoading;
  }

  getPages(page: number) {
    this.ordenService.getOrdenesByPage(page, this.itemsPerPage);
  }

  pageChange(newPage: number) {
    this.p = newPage; // Actualizar la página actual
    this.getPages(this.p - 1); // Ajuste para el índice de la página que comienza desde cero
  }
}
