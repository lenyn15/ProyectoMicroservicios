package com.uns.serviceventas.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table( name = "estado_venta" )
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EstadoVenta {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_estado_venta" )
	private int id;
	
	@Column( name = "estado",
	         length = 45,
	         nullable = false )
	private String estado;
}
