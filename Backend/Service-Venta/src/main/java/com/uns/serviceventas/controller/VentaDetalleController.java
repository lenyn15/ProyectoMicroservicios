package com.uns.serviceventas.controller;

import com.uns.serviceventas.entity.VentaDetalle;
import com.uns.serviceventas.model.Producto;
import com.uns.serviceventas.service.VentaDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( path = "/ventadetalle",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class VentaDetalleController {
	
	private final VentaDetalleService ventaDetalleService;
	
	@Autowired
	public VentaDetalleController( VentaDetalleService ventaDetalleService ) {
		this.ventaDetalleService = ventaDetalleService;
	}
	
	@GetMapping( "/listar" )
	public ResponseEntity<List<VentaDetalle>> listarDetalles() {
		return new ResponseEntity<>( ventaDetalleService.listAll(),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/productos" )
	public ResponseEntity<List<Producto>> listarProductos() {
		return new ResponseEntity<>( ventaDetalleService.listarProductos(),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/productos/filtro/{nombreProducto}" )
	public ResponseEntity<List<Producto>> filtrarProductos( @PathVariable( "nombreProducto" ) String nombre ) {
		return new ResponseEntity<>( ventaDetalleService.filtrarProductos( nombre ),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/producto/buscar/{idProducto}" )
	public ResponseEntity<Producto> buscarProducto( @PathVariable( "idProducto" ) Integer id ) {
		return new ResponseEntity<>( ventaDetalleService.buscarProducto( id ),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/buscar/{idVentaDetalle}" )
	public ResponseEntity<VentaDetalle> buscarDetalle( @PathVariable( "idVentaDetalle" ) Integer id ) {
		return new ResponseEntity<>( ventaDetalleService.findByID( id ),
		                             HttpStatus.OK );
	}
	
	@PostMapping( "/registrar" )
	public ResponseEntity<VentaDetalle> registrarDetalle( @RequestBody VentaDetalle detalle ) {
		VentaDetalle nuevoDetalle = ventaDetalleService.update( detalle );
		return new ResponseEntity<>( nuevoDetalle,
		                             HttpStatus.CREATED );
	}
	
	@PutMapping( "/actualizar" )
	public ResponseEntity<VentaDetalle> actualizarDetalle( @RequestBody VentaDetalle detalle ) {
		VentaDetalle actualizadoDetalle = ventaDetalleService.update( detalle );
		return new ResponseEntity<>( actualizadoDetalle,
		                             HttpStatus.OK );
	}
	
	@DeleteMapping( "/eliminar/{idVentaDetalle}" )
	public ResponseEntity<VentaDetalle> eliminarDetalle( @PathVariable( "idVentaDetalle" ) Integer id ) {
		ventaDetalleService.delete( id );
		return new ResponseEntity<>( null,
		                             HttpStatus.GONE );
	}
}
