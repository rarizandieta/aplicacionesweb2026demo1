import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitOfMeasure } from 'src/app/interfaces/inventory';
import { UnitOfMeasureService } from 'src/app/services/unit-of-measure.service';

@Component({
  selector: 'app-units-of-measure',
  templateUrl: './units-of-measure.component.html',
  styleUrls: ['./units-of-measure.component.css']
})
export class UnitsOfMeasureComponent implements OnInit {
  items: UnitOfMeasure[] = [];
  loading = false;
  showForm = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  editingId: number | null = null;

  formData: Partial<UnitOfMeasure> = { nombre: '', abreviatura: '' };

  constructor(private unitService: UnitOfMeasureService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.unitService.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: () => { this.errorMessage = 'Error al cargar unidades de medida.'; this.loading = false; }
    });
  }

  onNew(): void {
    this.editingId = null;
    this.formData = { nombre: '', abreviatura: '' };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onEdit(item: UnitOfMeasure): void {
    this.editingId = item.id;
    this.formData = { nombre: item.nombre, abreviatura: item.abreviatura || '' };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onCancel(): void {
    this.showForm = false;
    this.formData = { nombre: '', abreviatura: '' };
    this.editingId = null;
  }

  onSave(): void {
    if (!this.formData.nombre) { this.errorMessage = 'El nombre es obligatorio.'; return; }
    this.saving = true;
    const obs = this.editingId
      ? this.unitService.update(this.editingId, this.formData)
      : this.unitService.create(this.formData);
    obs.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Unidad actualizada.' : 'Unidad creada.';
        this.saving = false;
        this.showForm = false;
        this.formData = { nombre: '', abreviatura: '' };
        this.editingId = null;
        this.load();
      },
      error: () => { this.errorMessage = 'Error al guardar.'; this.saving = false; }
    });
  }

  onDelete(id: number): void {
    if (!confirm('¿Eliminar esta unidad de medida?')) return;
    this.unitService.delete(id).subscribe({
      next: () => { this.successMessage = 'Unidad eliminada.'; this.load(); },
      error: () => { this.errorMessage = 'Error al eliminar.'; }
    });
  }

  onBack(): void { this.router.navigate(['/dashboard']); }
}
