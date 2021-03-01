package com.uns.serviceventas.service.serviceImpl;

import com.uns.serviceventas.entity.Empleado;
import com.uns.serviceventas.repository.EmpleadoRepository;
import com.uns.serviceventas.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpleadoServiceImpl implements EmpleadoService {
	
	private final EmpleadoRepository empleadoRepository;
	
	@Autowired
	public EmpleadoServiceImpl( EmpleadoRepository empleadoRepository ) {
		this.empleadoRepository = empleadoRepository;
	}
	
	@Override
	public List<Empleado> listAll() {
		return empleadoRepository.findAll();
	}
	
	@Override
	public Empleado findByID( Integer idEmpleado ) {
		return empleadoRepository.findById( idEmpleado ).orElse( null );
	}
	
	@Override
	public Empleado addNew( Empleado empleado ) {
		return empleadoRepository.saveAndFlush( empleado );
	}
	
	@Override
	public Empleado update( Empleado empleado ) {
		return empleadoRepository.saveAndFlush( empleado );
	}
	
	@Override
	public void delete( Integer idEmpleado ) {
		empleadoRepository.deleteById( idEmpleado );
	}
	
	@Override
	public List<Empleado> findEmpleado( String filtro ) {
		return empleadoRepository
				.findAll()
				.stream()
				.filter( buscados -> buscados.getNombres().contains( filtro ) )
				.collect( Collectors.toList() );
	}
}
