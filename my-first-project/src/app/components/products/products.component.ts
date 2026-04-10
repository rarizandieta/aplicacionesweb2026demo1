import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Category, Brand } from 'src/app/interfaces/inventory';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  items: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  loading = false;
  showForm = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  editingId: number | null = null;

  formData: Partial<Product> = { nombre: '', descripcion: '', sku: '', codigo_barras: '', category_id: undefined, brand_id: undefined };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
    this.categoryService.getAll().subscribe({ next: (data) => { this.categories = data; }, error: () => {} });
    this.brandService.getAll().subscribe({ next: (data) => { this.brands = data; }, error: () => {} });
  }

  load(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: () => { this.errorMessage = 'Error al cargar productos.'; this.loading = false; }
    });
  }

  onNew(): void {
    this.editingId = null;
    this.formData = { nombre: '', descripcion: '', sku: '', codigo_barras: '', category_id: undefined, brand_id: undefined };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onEdit(item: Product): void {
    this.editingId = item.id;
    this.formData = {
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      sku: item.sku || '',
      codigo_barras: item.codigo_barras || '',
      category_id: item.category_id,
      brand_id: item.brand_id
    };
    this.showForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onCancel(): void {
    this.showForm = false;
    this.formData = { nombre: '', descripcion: '', sku: '', codigo_barras: '', category_id: undefined, brand_id: undefined };
    this.editingId = null;
  }

  onSave(): void {
    if (!this.formData.nombre) { this.errorMessage = 'El nombre es obligatorio.'; return; }
    if (!this.formData.category_id) { this.errorMessage = 'La categoría es obligatoria.'; return; }
    this.saving = true;
    const obs = this.editingId
      ? this.productService.update(this.editingId, this.formData)
      : this.productService.create(this.formData);
    obs.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Producto actualizado.' : 'Producto creado.';
        this.saving = false;
        this.showForm = false;
        this.formData = { nombre: '', descripcion: '', sku: '', codigo_barras: '', category_id: undefined, brand_id: undefined };
        this.editingId = null;
        this.load();
      },
      error: () => { this.errorMessage = 'Error al guardar.'; this.saving = false; }
    });
  }

  onDelete(id: number): void {
    if (!confirm('¿Eliminar este producto?')) return;
    this.productService.delete(id).subscribe({
      next: () => { this.successMessage = 'Producto eliminado.'; this.load(); },
      error: () => { this.errorMessage = 'Error al eliminar.'; }
    });
  }

  onBack(): void { this.router.navigate(['/dashboard']); }
}
