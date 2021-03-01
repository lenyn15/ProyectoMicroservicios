package com.uns.serviceventas.service.serviceImpl;

import com.uns.serviceventas.entity.EstadoVenta;
import com.uns.serviceventas.repository.EstadoVentaRepository;
import com.uns.serviceventas.service.EstadoVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstadoVentaServiceImpl implements EstadoVentaService {
	
	private final EstadoVentaRepository estadoVentaRepository;
	
	@Autowired
	public EstadoVentaServiceImpl( EstadoVentaRepository estadoVentaRepository ) {
		this.estadoVentaRepository = estadoVentaRepository;
	}
	
	@Override
	public List<EstadoVenta> listAll() {
		return estadoVentaRepository.findAll();
	}
}
