import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FakeAuthService } from 'src/app/services/fake-auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string = '';
  totalInventario: number = 0;
  stockBajo: number = 0;
  loadingStats: boolean = true;

  constructor(
    private router: Router,
    private authService: FakeAuthService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) this.username = user.nombre || user.usuario;
    this.loadStats();
  }

  loadStats(): void {
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.totalInventario = data.length;
        this.loadingStats = false;
      },
      error: () => { this.loadingStats = false; }
    });

    this.inventoryService.getLowStock().subscribe({
      next: (data) => { this.stockBajo = data.length; },
      error: () => {}
    });
  }

  onInventario(): void {
    this.router.navigate(['/inventory']);
  }

  onLowStock(): void {
    this.router.navigate(['/inventory/low-stock']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

