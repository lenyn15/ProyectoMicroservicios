package com.uns.serviceproducto.controller;

import com.uns.serviceproducto.entity.Categoria;
import com.uns.serviceproducto.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( path = "/categoria",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class CategoriaController {
	
	private final CategoriaService categoriaService;
	
	@Autowired
	public CategoriaController( CategoriaService categoriaService ) {
		this.categoriaService = categoriaService;
	}
	
	@GetMapping( "/listar" )
	public ResponseEntity<List<Categoria>> listarCategoria() {
		return new ResponseEntity<>( categoriaService.listAll(),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/listar/{idCategoria}" )
	public ResponseEntity<Categoria> buscarCategoria( @PathVariable( "idCategoria" ) Integer id ) {
		return new ResponseEntity<>( categoriaService.findByID( id ),
		                             HttpStatus.OK );
	}
	
	@PostMapping( "/registrar" )
	public ResponseEntity<Categoria> registrarCategoria( @RequestBody Categoria categoria ) {
		Categoria nuevo = categoriaService.addNew( categoria );
		return new ResponseEntity<>( nuevo,
		                             HttpStatus.CREATED );
	}
	
	@PutMapping( "/actualizar" )
	public ResponseEntity<Categoria> actualizarCategoria( @RequestBody Categoria categoria ) {
		Categoria actualizado = categoriaService.update( categoria );
		return new ResponseEntity<>( actualizado,
		                             HttpStatus.OK );
	}
	
	@DeleteMapping( "/eliminar/{idCategoria}" )
	public ResponseEntity<Categoria> eliminarCategoria( @PathVariable( "idCategoria" ) Integer id ) {
		categoriaService.delete( id );
		return new ResponseEntity<>( null,
		                             HttpStatus.GONE );
	}
}
