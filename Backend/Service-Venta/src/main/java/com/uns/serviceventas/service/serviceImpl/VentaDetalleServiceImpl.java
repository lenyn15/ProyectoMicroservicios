package com.uns.serviceventas.service.serviceImpl;

import com.uns.serviceventas.client.FeignProducto;
import com.uns.serviceventas.entity.VentaDetalle;
import com.uns.serviceventas.model.Producto;
import com.uns.serviceventas.repository.VentaDetalleRepository;
import com.uns.serviceventas.service.VentaDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaDetalleServiceImpl implements VentaDetalleService {
	
	private final VentaDetalleRepository ventaDetalleRepository;
	private final FeignProducto          feignProducto;
	
	@Autowired
	public VentaDetalleServiceImpl( VentaDetalleRepository ventaDetalleRepository,
	                                FeignProducto feignProducto ) {
		this.ventaDetalleRepository = ventaDetalleRepository;
		this.feignProducto          = feignProducto;
	}
	
	@Override
	public List<VentaDetalle> listAll() {
		return ventaDetalleRepository.findAll();
	}
	
	@Override
	public VentaDetalle findByID( Integer idVentaDetalle ) {
		VentaDetalle detalle = ventaDetalleRepository.findById( idVentaDetalle ).orElse( null );
		if ( detalle != null ) {
			Producto producto = feignProducto.buscarProducto( detalle.getProducto().getId() ).getBody();
			detalle.setProducto( producto );
		}
		return detalle;
	}
	
	@Override
	public VentaDetalle addNew( VentaDetalle ventaDetalle ) {
		return ventaDetalleRepository.saveAndFlush( ventaDetalle );
	}
	
	@Override
	public VentaDetalle update( VentaDetalle ventaDetalle ) {
		return ventaDetalleRepository.saveAndFlush( ventaDetalle );
	}
	
	@Override
	public void delete( Integer idVentaDetalle ) {
		ventaDetalleRepository.deleteById( idVentaDetalle );
	}
	
	@Override
	public List<Producto> listarProductos() {
		return feignProducto.listarProductos().getBody();
	}
	
	@Override
	public List<Producto> filtrarProductos( String nombre ) {
		return feignProducto.filtrarPorNombre( nombre ).getBody();
	}
	
	@Override
	public Producto buscarProducto( Integer idProducto ) {
		return feignProducto.buscarProducto( idProducto ).getBody();
	}
}
