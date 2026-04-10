import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/inventory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  items: Category[] = [];
  loading = false;
  showForm = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  editingId: number | null = null;

  formData: Partial<Category> = { nombre: '', descripcion: '' };

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: () => { this.errorMessage = 'Error al cargar categorías.'; this.loading = false; }
    });
  }

  onNew(): void {
    this.editingId = null;
    this.formData = { nombre: '', descripcion: '' };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onEdit(item: Category): void {
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
      ? this.categoryService.update(this.editingId, this.formData)
      : this.categoryService.create(this.formData);
    obs.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Categoría actualizada.' : 'Categoría creada.';
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
    if (!confirm('¿Eliminar esta categoría?')) return;
    this.categoryService.delete(id).subscribe({
      next: () => { this.successMessage = 'Categoría eliminada.'; this.load(); },
      error: () => { this.errorMessage = 'Error al eliminar.'; }
    });
  }

  onBack(): void { this.router.navigate(['/dashboard']); }
}
