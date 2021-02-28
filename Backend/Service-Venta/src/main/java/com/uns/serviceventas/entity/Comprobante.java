package com.uns.serviceventas.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table( name = "comprobante" )
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comprobante {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_comprobante" )
	private int id;
	
	@Column( name = "tipo",
	         length = 45,
	         nullable = false )
	private String tipo;
}
