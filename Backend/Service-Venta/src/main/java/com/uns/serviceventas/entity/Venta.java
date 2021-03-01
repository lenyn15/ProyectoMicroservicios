package com.uns.serviceventas.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.uns.serviceventas.model.Cliente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table( name = "venta" )
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Venta {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_venta",
	         updatable = false )
	private int id;
	
	@Column( name = "total",
	         columnDefinition = "DECIMAL(7,2)",
	         nullable = false )
	private Double total;
	
	@Column( name = "fecha_venta",
	         nullable = false )
	@Temporal( TemporalType.DATE )
	private Date fecha;
	
	@ManyToOne( fetch = FetchType.EAGER )
	@JoinColumn( name = "empleado_id" )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private Empleado empleado;
	
	@Transient
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private Cliente cliente;
	
	@ManyToOne( fetch = FetchType.EAGER )
	@JoinColumn( name = "comprobante_id" )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private Comprobante comprobante;
	
	@ManyToOne( fetch = FetchType.EAGER )
	@JoinColumn( name = "estado_venta_id" )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private EstadoVenta estadoVenta;
	
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "venta_id")
	private List<VentaDetalle> ventaDetalles;
}
