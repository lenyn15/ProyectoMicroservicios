package com.uns.servicecliente.service;

import com.uns.servicecliente.entity.Cliente;
import com.uns.servicecliente.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteServiceImpl implements ClienteService {
	
	private final ClienteRepository clienteRepository;
	
	@Autowired
	public ClienteServiceImpl( ClienteRepository clienteRepository ) {
		this.clienteRepository = clienteRepository;
	}
	
	@Override
	public List<Cliente> findClients( String filtro ) {
		return clienteRepository
				.findAll()
				.stream()
				.filter( buscados -> buscados.getDescripcion().contains( filtro ) )
				.collect( Collectors.toList() );
	}
	
	@Override
	public List<Cliente> ClienteByTipo( Integer idTipo ) {
		return new ArrayList<>( clienteRepository.Clientes( idTipo ) );
	}
	
	@Override
	public List<Cliente> listAll() {
		return clienteRepository.findAll();
	}
	
	@Override
	public Cliente findByID( Integer idCliente ) {
		return clienteRepository.findById( idCliente ).orElse( null );
	}
	
	@Override
	public Cliente addNew( Cliente cliente ) {
		Cliente           nuevo   = null;
		Optional<Cliente> buscado = clienteRepository.findByCodigo( cliente.getCodigo() );
		boolean           existe  = buscado.isPresent();
		if ( !existe ) {
			nuevo = clienteRepository.saveAndFlush( cliente );
		}
		return nuevo;
	}
	
	@Override
	public Cliente update( Cliente cliente ) {
		return clienteRepository.saveAndFlush( cliente );
	}
	
	@Override
	public void delete( Integer idCliente ) {
		clienteRepository.deleteById( idCliente );
	}
}
