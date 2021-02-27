package com.uns.servicecliente.controller;

import com.uns.servicecliente.entity.Cliente;
import com.uns.servicecliente.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( path = "/cliente",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class ClienteController {
	
	private final ClienteService clienteService;
	
	@Autowired
	public ClienteController( ClienteService clienteService ) {
		this.clienteService = clienteService;
	}
	
	@GetMapping( "/listar" )
	public ResponseEntity<List<Cliente>> listarClientes() {
		return new ResponseEntity<>( clienteService.listAll(),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/buscar/{idCliente}" )
	public ResponseEntity<Cliente> buscarCliente( @PathVariable( "idCliente" ) Integer id ) {
		return new ResponseEntity<>( clienteService.findByID( id ),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/listar/tipo/{idTipo}" )
	public ResponseEntity<List<Cliente>> listarPorTipo( @PathVariable( "idTipo" ) Integer id ) {
		return new ResponseEntity<>( clienteService.ClienteByTipo( id ),
		                             HttpStatus.OK );
	}
	
	@GetMapping( "/listar/{filtro}" )
	public ResponseEntity<List<Cliente>> filtrarClientes( @PathVariable( "filtro" ) String filtro ) {
		return new ResponseEntity<>( clienteService.findClients( filtro ),
		                             HttpStatus.OK );
	}
	
	@PostMapping( "/registrar" )
	public ResponseEntity<Cliente> registrarCliente( @RequestBody Cliente cliente ) {
		Cliente nuevo = clienteService.addNew( cliente );
		return new ResponseEntity<>( nuevo,
		                             HttpStatus.CREATED );
	}
	
	@PutMapping( "/actualizar" )
	public ResponseEntity<Cliente> actualizarCliente( @RequestBody Cliente cliente ) {
		Cliente actualizado = clienteService.update( cliente );
		return new ResponseEntity<>( actualizado,
		                             HttpStatus.OK );
	}
	
	@DeleteMapping( "/eliminar/{idCliente}" )
	public ResponseEntity<Cliente> eliminarCliente( @PathVariable( "idCliente" ) Integer id ) {
		clienteService.delete( id );
		return new ResponseEntity<>( null,
		                             HttpStatus.GONE );
	}
}
