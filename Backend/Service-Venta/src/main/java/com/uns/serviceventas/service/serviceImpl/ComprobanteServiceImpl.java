package com.uns.serviceventas.service.serviceImpl;

import com.uns.serviceventas.entity.Comprobante;
import com.uns.serviceventas.repository.ComprobanteRepository;
import com.uns.serviceventas.service.ComprobanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComprobanteServiceImpl implements ComprobanteService {
	
	private final ComprobanteRepository comprobanteRepository;
	
	@Autowired
	public ComprobanteServiceImpl( ComprobanteRepository comprobanteRepository ) {
		this.comprobanteRepository = comprobanteRepository;
	}
	
	@Override
	public List<Comprobante> listAll() {
		return comprobanteRepository.findAll();
	}
}
