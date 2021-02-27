package com.uns.serviceproducto.controller;

import com.uns.serviceproducto.entity.Marca;
import com.uns.serviceproducto.services.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( path = "/marca",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class MarcaController {
	
	private final MarcaService marcaService;
	
	@Autowired
	public MarcaController( MarcaService marcaService ) {
		this.marcaService = marcaService;
	}
	
	@GetMapping( "/listar" )
	public ResponseEntity<List<Marca>> listarMarcas() {
		return new ResponseEntity<>( marcaService.listAll(),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/listar/{idMarca}" )
	public ResponseEntity<Marca> buscarMarca( @PathVariable( "idMarca" ) Integer id ) {
		return new ResponseEntity<>( marcaService.findByID( id ),
		                             HttpStatus.OK );
	}
	
	@PostMapping( "/registrar" )
	public ResponseEntity<Marca> registrarMarca( @RequestBody Marca marca ) {
		Marca nuevo = marcaService.addNew( marca );
		return new ResponseEntity<>( nuevo,
		                             HttpStatus.CREATED );
	}
	
	@PutMapping( "/actualizar" )
	public ResponseEntity<Marca> actualizarMarca( @RequestBody Marca marca ) {
		Marca actualizado = marcaService.update( marca );
		return new ResponseEntity<>( actualizado,
		                             HttpStatus.OK );
	}
	
	@DeleteMapping( "/eliminar/{idMarca}" )
	public ResponseEntity<Marca> eliminarMarca( @PathVariable( "idMarca" ) Integer id ) {
		marcaService.delete( id );
		return new ResponseEntity<>( null,
		                             HttpStatus.GONE );
	}
}
