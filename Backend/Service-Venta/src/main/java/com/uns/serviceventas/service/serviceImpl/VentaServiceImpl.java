package com.uns.serviceventas.service.serviceImpl;

import com.uns.serviceventas.client.FeignCliente;
import com.uns.serviceventas.client.FeignProducto;
import com.uns.serviceventas.entity.Venta;
import com.uns.serviceventas.entity.VentaDetalle;
import com.uns.serviceventas.model.Cliente;
import com.uns.serviceventas.model.Producto;
import com.uns.serviceventas.repository.VentaRepository;
import com.uns.serviceventas.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VentaServiceImpl implements VentaService {
	
	private final VentaRepository ventaRepository;
	private final FeignCliente    feignCliente;
	private final FeignProducto   feignProducto;
	
	@Autowired
	public VentaServiceImpl( VentaRepository ventaRepository,
	                         FeignCliente feignCliente,
	                         FeignProducto feignProducto ) {
		this.ventaRepository = ventaRepository;
		this.feignCliente    = feignCliente;
		this.feignProducto   = feignProducto;
	}
	
	@Override
	public List<Venta> listAll() {
		return ventaRepository.findAll();
	}
	
	@Override
	public Venta findByID( Integer idVenta ) {
		Venta venta = ventaRepository.findById( idVenta ).orElse( null );
		if ( venta != null ) {
			Cliente cliente = feignCliente.buscarCliente( venta.getCliente().getId() ).getBody();
			venta.setCliente( cliente );
			
			List<VentaDetalle> detalle = venta.getVentaDetalles().stream().peek( item -> {
				Producto producto = feignProducto.buscarProducto( item.getProducto().getId() ).getBody();
				item.setProducto( producto );
			} ).collect( Collectors.toList() );
			venta.setVentaDetalles( detalle );
		}
		return venta;
	}
	
	@Override
	public Venta addNew( Venta venta ) {
		Venta ventaNueva = findByID( venta.getId() );
		if ( ventaNueva != null ) {
			return ventaNueva;
		}
		ventaNueva = ventaRepository.saveAndFlush( venta );
		ventaNueva
				.getVentaDetalles()
				.forEach( detalle -> feignProducto.actualizarCantidad( detalle.getProducto().getId(),
				                                                       detalle.getCantidad() * -1 ) );
		return ventaNueva;
	}
	
	@Override
	public Venta update( Venta venta ) {
		return ventaRepository.saveAndFlush( venta );
	}
	
	@Override
	public void delete( Integer idVenta ) {
		ventaRepository.deleteById( idVenta );
	}
	
	@Override
	public List<Cliente> listarClientes() {
		return feignCliente.listarClientes().getBody();
	}
	
	@Override
	public List<Cliente> filtrarClientes( String nombre ) {
		return feignCliente.filtrarClientes( nombre ).getBody();
	}
	
	@Override
	public Cliente buscarCliente( Integer idCliente ) {
		return feignCliente.buscarCliente( idCliente ).getBody();
	}
}
