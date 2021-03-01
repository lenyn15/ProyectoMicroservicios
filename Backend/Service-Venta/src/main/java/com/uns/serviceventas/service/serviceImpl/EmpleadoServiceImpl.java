package com.uns.serviceventas.service.serviceImpl;

import com.uns.serviceventas.entity.Empleado;
import com.uns.serviceventas.service.EmpleadoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoServiceImpl implements EmpleadoService {
	@Override
	public List<Empleado> listAll() {
		return null;
	}
	
	@Override
	public Empleado findByID( Integer integer ) {
		return null;
	}
	
	@Override
	public Empleado addNew( Empleado empleado ) {
		return null;
	}
	
	@Override
	public Empleado update( Empleado empleado ) {
		return null;
	}
	
	@Override
	public void delete( Integer integer ) {
	
	}
	
	@Override
	public List<Empleado> findEmpleado( String filtro ) {
		return null;
	}
}
