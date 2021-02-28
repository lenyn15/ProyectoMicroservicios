package com.uns.serviceventas.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Marca {
	
	private int    id;
	private String nombre;
}
