package com.uns.servicecliente.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table( name = "tipo" )
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tipo {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_tipo",
	         updatable = false )
	private int id;
	
	@Column( name = "tipo",
	         length = 45,
	         nullable = false )
	private String tipo;
}
