package com.uns.serviceventas.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Tipo {
	
	private int    id;
	private String tipo;
}
