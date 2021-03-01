package com.uns.serviceventas.client;

import com.uns.serviceventas.model.Producto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient( name = "servicio-producto",
              url = "http://localhost:8091/producto" )
public interface FeignProducto {
	
	@GetMapping( "/listar" )
	ResponseEntity<List<Producto>> listarProductos();
	
	@GetMapping( "/listar/{nombre}" )
	ResponseEntity<List<Producto>> filtrarPorNombre( @PathVariable( "nombre" ) String filtroNombre );
	
	@GetMapping( "/buscar/{idProducto}" )
	ResponseEntity<Producto> buscarProducto( @PathVariable( "idProducto" ) Integer id );
	
	@PutMapping( "/actualizarCantidad/{idProducto}" )
	ResponseEntity<Producto> actualizarCantidad( @PathVariable( "idProducto" ) Integer id,
	                                             @RequestParam( name = "cantidad" ) Integer cantidad );
}
