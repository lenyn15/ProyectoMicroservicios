package com.uns.serviceventas.service;

import com.uns.serviceventas.entity.Venta;
import com.uns.serviceventas.model.Cliente;

import java.util.List;

public interface VentaService extends GeneralService<Venta, Integer> {
	
	List<Cliente> listarClientes();
	
	List<Cliente> filtrarClientes( String nombre );
	
	Cliente buscarCliente( Integer id );
}
