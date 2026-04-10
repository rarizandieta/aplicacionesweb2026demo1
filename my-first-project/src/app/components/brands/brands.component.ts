import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/interfaces/inventory';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  items: Brand[] = [];
  loading = false;
  showForm = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  editingId: number | null = null;

  formData: Partial<Brand> = { nombre: '', descripcion: '' };

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.brandService.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: () => { this.errorMessage = 'Error al cargar marcas.'; this.loading = false; }
    });
  }

  onNew(): void {
    this.editingId = null;
    this.formData = { nombre: '', descripcion: '' };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onEdit(item: Brand): void {
    this.editingId = item.id;
    this.formData = { nombre: item.nombre, descripcion: item.descripcion || '' };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onCancel(): void {
    this.showForm = false;
    this.formData = { nombre: '', descripcion: '' };
    this.editingId = null;
  }

  onSave(): void {
    if (!this.formData.nombre) { this.errorMessage = 'El nombre es obligatorio.'; return; }
    this.saving = true;
    const obs = this.editingId
      ? this.brandService.update(this.editingId, this.formData)
      : this.brandService.create(this.formData);
    obs.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Marca actualizada.' : 'Marca creada.';
        this.saving = false;
        this.showForm = false;
        this.formData = { nombre: '', descripcion: '' };
        this.editingId = null;
        this.load();
      },
      error: () => { this.errorMessage = 'Error al guardar.'; this.saving = false; }
    });
  }

  onDelete(id: number): void {
    if (!confirm('¿Eliminar esta marca?')) return;
    this.brandService.delete(id).subscribe({
      next: () => { this.successMessage = 'Marca eliminada.'; this.load(); },
      error: () => { this.errorMessage = 'Error al eliminar.'; }
    });
  }

  onBack(): void { this.router.navigate(['/dashboard']); }
}
