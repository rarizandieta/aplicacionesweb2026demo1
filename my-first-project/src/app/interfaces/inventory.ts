export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Brand {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  sku?: string;
  codigo_barras?: string;
  category_id: number;
  brand_id?: number;
  category?: Category;
  brand?: Brand;
}

export interface UnitOfMeasure {
  id: number;
  nombre: string;
  abreviatura?: string;
}

export interface Location {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface InventoryItem {
  id: number;
  product_id: number;
  cantidad_disponible: number;
  stock_minimo?: number;
  stock_maximo?: number;
  unit_id: number;
  location_id?: number;
  product?: Product;
  unit?: UnitOfMeasure;
  location?: Location;
}

export interface InventoryUpsertDto {
  cantidad_disponible: number;
  stock_minimo?: number;
  stock_maximo?: number;
  unit_id: number;
  location_id?: number;
}
