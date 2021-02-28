package com.uns.serviceventas.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Cliente {
	
	private int    id;
	private String descripcion;
	private String codigo;
}
