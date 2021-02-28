package com.uns.serviceventas.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
}
