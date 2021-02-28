package com.uns.serviceventas.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Producto {
	
	private int       id;
	private String    nombre;
	private Double    precioCompra;
	private Double    precioVenta;
	private int       cantidad;
	private String    estado;
	private Categoria categoria;
	private Marca     marca;
}
