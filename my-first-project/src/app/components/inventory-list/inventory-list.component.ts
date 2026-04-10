import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryItem } from 'src/app/interfaces/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  items: InventoryItem[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.loading = true;
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el inventario.';
        this.loading = false;
      }
    });
  }

  onEdit(productId: number): void {
    this.router.navigate(['/inventory', productId]);
  }

  onViewLowStock(): void {
    this.router.navigate(['/inventory/low-stock']);
  }

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
