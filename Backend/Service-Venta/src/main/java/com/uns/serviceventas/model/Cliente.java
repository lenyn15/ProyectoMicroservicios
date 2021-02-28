package com.uns.serviceventas.model;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class Cliente {
	
	private int    id;
	private String descripcion;
	private String codigo;
	private String estado;
	private Date   fecha_registro;
	private Tipo   tipo;
}
