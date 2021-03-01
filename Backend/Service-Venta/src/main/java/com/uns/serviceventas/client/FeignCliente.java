package com.uns.serviceventas.client;

import com.uns.serviceventas.model.Cliente;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient( name = "servicio-cliente",
              url = "http://localhost:8092/cliente" )
public interface FeignCliente {
	
	@GetMapping( "/listar" )
	ResponseEntity<List<Cliente>> listarClientes();
	
	@GetMapping( "/listar/{filtro}" )
	ResponseEntity<List<Cliente>> filtrarClientes( @PathVariable( "filtro" ) String filtro );
	
	@GetMapping( "/buscar/{idCliente}" )
	ResponseEntity<Cliente> buscarCliente( @PathVariable( "idCliente" ) Integer id );
}