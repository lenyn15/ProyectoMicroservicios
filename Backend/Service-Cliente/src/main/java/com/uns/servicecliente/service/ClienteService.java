package com.uns.servicecliente.service;

import com.uns.servicecliente.entity.Cliente;

import java.util.List;

public interface ClienteService {
	
	List<Cliente> listAll();
	
	Cliente findByID( Integer id );
	
	Cliente addNew( Cliente cliente );
	
	Cliente update( Cliente cliente );
	
	List<Cliente> findClients( String filtro );
	
	List<Cliente> ClienteByTipo( Integer idTipo );
	
	void delete( Integer id );
}
