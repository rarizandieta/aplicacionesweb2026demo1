import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem, InventoryUpsertDto, UnitOfMeasure, Location } from 'src/app/interfaces/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit {

  productId!: number;
  item: InventoryItem | null = null;
  units: UnitOfMeasure[] = [];
  locations: Location[] = [];
  loading: boolean = true;
  saving: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  formData: InventoryUpsertDto = {
    cantidad_disponible: 0,
    stock_minimo: undefined,
    stock_maximo: undefined,
    unit_id: 0,
    location_id: undefined
  };

  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.loadCatalogues();
    this.loadInventory();
  }

  loadCatalogues(): void {
    this.http.get<UnitOfMeasure[]>(`${this.apiUrl}/units-of-measure`).subscribe({
      next: (data) => this.units = data,
      error: () => this.errorMessage = 'Error al cargar unidades de medida.'
    });
    this.http.get<Location[]>(`${this.apiUrl}/locations`).subscribe({
      next: (data) => this.locations = data
    });
  }

  loadInventory(): void {
    this.inventoryService.getByProductId(this.productId).subscribe({
      next: (data) => {
        this.item = data;
        this.formData = {
          cantidad_disponible: data.cantidad_disponible,
          stock_minimo: data.stock_minimo,
          stock_maximo: data.stock_maximo,
          unit_id: data.unit_id,
          location_id: data.location_id
        };
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSave(): void {
    if (!this.formData.unit_id) {
      this.errorMessage = 'La unidad de medida es requerida.';
      return;
    }
    this.saving = true;
    this.errorMessage = '';
    this.inventoryService.upsert(this.productId, this.formData).subscribe({
      next: () => {
        this.successMessage = 'Inventario guardado correctamente.';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/inventory']), 1200);
      },
      error: () => {
        this.errorMessage = 'Error al guardar el inventario.';
        this.saving = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/inventory']);
  }
}
