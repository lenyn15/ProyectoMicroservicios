package com.uns.serviceventas.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table( name = "empleado" )
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Empleado {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_empleado" )
	private int id;
	
	@Column( name = "nombres",
	         length = 45,
	         nullable = false )
	private String nombres;
	
	@Column( name = "apellidos",
	         length = 45,
	         nullable = false )
	private String apellidos;
	
	@Column( name = "telefono",
	         length = 9,
	         nullable = false )
	private String telefono;
	
	@Column( name = "estado",
	         length = 45,
	         nullable = false )
	private String estado;
	
	@Column( name = "fecha_contrato",
	         nullable = false )
	@Temporal( TemporalType.DATE )
	private Date fecha_contrato;
}
