package com.uns.serviceventas.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.uns.serviceventas.model.Producto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table( name = "venta_detalle" )
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VentaDetalle {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_venta_detalle",
	         updatable = false )
	private int id;
	
	@Column( name = "cantidad",
	         nullable = false )
	private int cantidad;
	
	@Column( name = "precio",
	         columnDefinition = "DECIMAL(7,2)",
	         nullable = false )
	private Double precio;
	
	@Column( name = "descuento",
	         columnDefinition = "DECIMAL(7,2)",
	         nullable = false )
	private Double descuento;
	
	@Transient
	@Column( name = "sub_total",
	         columnDefinition = "DECIMAL(7,2)",
	         nullable = false )
	private Double subtotal;
	
	@Transient
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private Producto producto;
	
	public Double getSubtotal() {
		if ( this.precio > 0 && this.cantidad > 0 ) {
			return this.precio * this.cantidad;
		} else {
			return ( double ) 0;
		}
	}
}
