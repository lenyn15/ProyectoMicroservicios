package com.uns.serviceproducto.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Entity
@Table( name = "producto" )
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Producto {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_producto",
	         updatable = false )
	private int id;
	
	@Column( name = "nombre",
	         length = 45,
	         nullable = false )
	private String nombre;
	@Column( name = "precio_compra",
	         columnDefinition = "DECIMAL(7,2)",
	         nullable = false )
	private Double precioCompra;
	
	@Column( name = "precio_venta",
	         columnDefinition = "DECIMAL(7,2)",
	         nullable = false )
	private Double precioVenta;
	
	@Column( name = "cantidad",
	         nullable = false )
	@Min( value = 0 )
	private int cantidad;
	
	@Column( name = "estado",
	         length = 45,
	         nullable = false )
	private String estado;
	
	@ManyToOne( fetch = FetchType.EAGER )
	@JoinColumn( name = "categoria_id" )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private Categoria categoria;
	
	@ManyToOne( fetch = FetchType.EAGER )
	@JoinColumn( name = "marca_id" )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private Marca marca;
}
