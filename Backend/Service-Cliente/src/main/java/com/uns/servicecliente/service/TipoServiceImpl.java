package com.uns.servicecliente.service;

import com.uns.servicecliente.entity.Tipo;
import com.uns.servicecliente.repository.TipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoServiceImpl implements TipoService {
	
	private final TipoRepository tipoRepository;
	
	@Autowired
	public TipoServiceImpl( TipoRepository tipoRepository ) {
		this.tipoRepository = tipoRepository;
	}
	
	@Override
	public List<Tipo> listAll() {
		return tipoRepository.findAll();
	}
}
