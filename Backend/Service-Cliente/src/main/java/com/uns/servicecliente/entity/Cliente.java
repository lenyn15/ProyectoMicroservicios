package com.uns.servicecliente.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table( name = "cliente" )
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cliente {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_cliente",
	         updatable = false )
	private int id;
	
	@Column( name = "descripcion",
	         length = 80,
	         nullable = false )
	private String descripcion;
	
	@Column( name = "codigo",
	         length = 10,
	         nullable = false )
	private String codigo;
	
	@Column( name = "estado",
	         length = 1,
	         nullable = false )
	private String estado;
	
	@Column( name = "fecha_registro",
	         nullable = false )
	@Temporal( TemporalType.DATE )
	private Date fecha_registro;
	
	@ManyToOne( fetch = FetchType.LAZY )
	@JoinColumn( name = "tipo_id" )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private Tipo tipo;
}
