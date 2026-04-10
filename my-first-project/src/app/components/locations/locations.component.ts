import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/interfaces/inventory';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  items: Location[] = [];
  loading = false;
  showForm = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  editingId: number | null = null;

  formData: Partial<Location> = { nombre: '', descripcion: '' };

  constructor(private locationService: LocationService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.locationService.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: () => { this.errorMessage = 'Error al cargar ubicaciones.'; this.loading = false; }
    });
  }

  onNew(): void {
    this.editingId = null;
    this.formData = { nombre: '', descripcion: '' };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onEdit(item: Location): void {
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
      ? this.locationService.update(this.editingId, this.formData)
      : this.locationService.create(this.formData);
    obs.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Ubicación actualizada.' : 'Ubicación creada.';
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
    if (!confirm('¿Eliminar esta ubicación?')) return;
    this.locationService.delete(id).subscribe({
      next: () => { this.successMessage = 'Ubicación eliminada.'; this.load(); },
      error: () => { this.errorMessage = 'Error al eliminar.'; }
    });
  }

  onBack(): void { this.router.navigate(['/dashboard']); }
}
