package com.uns.serviceventas.service;

import com.uns.serviceventas.entity.Empleado;

import java.util.List;

public interface EmpleadoService extends GeneralService<Empleado, Integer> {
	
	List<Empleado> findEmpleado(String filtro);
}
