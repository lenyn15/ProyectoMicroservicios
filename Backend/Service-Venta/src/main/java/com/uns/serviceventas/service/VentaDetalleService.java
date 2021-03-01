package com.uns.serviceventas.service;

import com.uns.serviceventas.entity.VentaDetalle;
import com.uns.serviceventas.model.Producto;

import java.util.List;

public interface VentaDetalleService extends GeneralService<VentaDetalle, Integer> {
	
	List<Producto> listarProductos();
	
	List<Producto> filtrarProductos( String nombre );
	
	Producto buscarProducto( Integer id );
}
