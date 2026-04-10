import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryItem } from 'src/app/interfaces/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-low-stock',
  templateUrl: './low-stock.component.html',
  styleUrls: ['./low-stock.component.css']
})
export class LowStockComponent implements OnInit {

  items: InventoryItem[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.inventoryService.getLowStock().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al obtener productos con stock bajo.';
        this.loading = false;
      }
    });
  }

  onEdit(productId: number): void {
    this.router.navigate(['/inventory', productId]);
  }

  onBack(): void {
    this.router.navigate(['/inventory']);
  }
}
