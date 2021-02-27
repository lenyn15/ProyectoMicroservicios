package com.uns.servicecliente.controller;

import com.uns.servicecliente.entity.Tipo;
import com.uns.servicecliente.service.TipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( path = "/tipo",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class TipoController {
	
	private final TipoService tipoService;
	
	@Autowired
	public TipoController( TipoService tipoService ) {
		this.tipoService = tipoService;
	}
	
	@GetMapping( "/listar" )
	public ResponseEntity<List<Tipo>> listarTipos() {
		return new ResponseEntity<>( tipoService.listAll(),
		                             HttpStatus.OK );
	}
}
