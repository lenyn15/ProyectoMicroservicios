package com.uns.serviceventas.controller;

import com.uns.serviceventas.entity.Comprobante;
import com.uns.serviceventas.service.ComprobanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( path = "/comprobante",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class ComprobanteController {
	
	private final ComprobanteService comprobanteService;
	
	@Autowired
	public ComprobanteController( ComprobanteService comprobanteService ) {
		this.comprobanteService = comprobanteService;
	}
	
	@GetMapping("/listar")
	public ResponseEntity<List<Comprobante>> listarComprobantes() {
		return new ResponseEntity<>( comprobanteService.listAll(),
		                             HttpStatus.OK );
	}
}
