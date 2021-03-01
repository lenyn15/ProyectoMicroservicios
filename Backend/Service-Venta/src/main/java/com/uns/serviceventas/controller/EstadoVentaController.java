package com.uns.serviceventas.controller;

import com.uns.serviceventas.entity.EstadoVenta;
import com.uns.serviceventas.service.EstadoVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( path = "/estadoventa",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class EstadoVentaController {
	
	private final EstadoVentaService estadoVentaService;
	
	@Autowired
	public EstadoVentaController( EstadoVentaService estadoVentaService ) {
		this.estadoVentaService = estadoVentaService;
	}
	
	@GetMapping( "/listar" )
	public ResponseEntity<List<EstadoVenta>> listarEstadosdeVenta() {
		return new ResponseEntity<>( estadoVentaService.listAll(),
		                             HttpStatus.OK );
	}
}
