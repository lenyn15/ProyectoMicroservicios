package com.uns.serviceproducto.services;

import com.uns.serviceproducto.entity.Producto;

import java.util.List;

public interface ProductoService extends GeneralService<Producto, Integer> {
	
	List<Producto> findProductos( String filtro );
	
	List<Producto> findByCategoria( String filtroCategoria );
	
	List<Producto> findByMarca( String filtroMarca );
	
	Producto updateQuantity( Integer id,
	                         Integer cantidad );
}
