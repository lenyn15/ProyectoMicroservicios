package com.uns.serviceventas.controller;

import com.uns.serviceventas.entity.Venta;
import com.uns.serviceventas.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( path = "/venta",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class VentaController {
	
	private final VentaService ventaService;
	
	@Autowired
	public VentaController( VentaService ventaService ) {
		this.ventaService = ventaService;
	}
	
	@GetMapping( "/listar" )
	public ResponseEntity<List<Venta>> listarVentas() {
		return new ResponseEntity<>( ventaService.listAll(),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/buscar/{idVenta}" )
	public ResponseEntity<Venta> buscarVenta( @PathVariable( "idVenta" ) Integer id ) {
		return new ResponseEntity<>( ventaService.findByID( id ),
		                             HttpStatus.OK );
	}
	
	@PostMapping( "/registrar" )
	public ResponseEntity<Venta> registrarVenta( @RequestBody Venta venta ) {
		Venta nueva = ventaService.addNew( venta );
		return new ResponseEntity<>( nueva,
		                             HttpStatus.CREATED );
	}
	
	@PutMapping( "/actualizar" )
	public ResponseEntity<Venta> actualizarVenta( @RequestBody Venta venta ) {
		Venta actualizada = ventaService.update( venta );
		return new ResponseEntity<>( actualizada,
		                             HttpStatus.OK );
	}
	
	@DeleteMapping( "/eliminar/{idVenta}" )
	public ResponseEntity<Venta> eliminarVenta( @PathVariable( "idVenta" ) Integer id ) {
		ventaService.findByID( id );
		return new ResponseEntity<>( null,
		                             HttpStatus.GONE );
	}
}
