package com.uns.serviceproducto.services.serviceImpl;

import com.uns.serviceproducto.entity.Marca;
import com.uns.serviceproducto.repository.MarcaRepository;
import com.uns.serviceproducto.services.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MarcaServiceImpl implements MarcaService {
	
	private final MarcaRepository marcaRepository;
	
	@Autowired
	public MarcaServiceImpl( MarcaRepository marcaRepository ) {
		this.marcaRepository = marcaRepository;
	}
	
	@Override
	public List<Marca> listAll() {
		return marcaRepository.findAll();
	}
	
	
	@Override
	public Marca findByID( Integer idMarca ) {
		return marcaRepository.findById( idMarca ).orElse( null );
	}
	
	@Override
	public Marca addNew( Marca marca ) {
		Marca           nuevo   = null;
		Optional<Marca> buscado = marcaRepository.findByNombre( marca.getNombre() );
		if ( marca.getNombre() != null ) {
			boolean existe = buscado.isPresent();
			if ( !existe ) {
				nuevo = marcaRepository.saveAndFlush( marca );
			}
		}
		return nuevo;
	}
	
	@Override
	public Marca update( Marca marca ) {
		Marca actualizado = null;
		Marca find        = marcaRepository.findById( marca.getId() ).orElseThrow();
		if ( !Objects.equals( find.getNombre(),
		                      marca.getNombre() ) ) {
			Optional<Marca> nombreMarca = marcaRepository.findByNombre( marca.getNombre() );
			boolean         existe      = nombreMarca.isPresent();
			if ( !existe ) {
				actualizado = marcaRepository.saveAndFlush( marca );
			}
		}
		return actualizado;
	}
	
	@Override
	public void delete( Integer idMarca ) {
		marcaRepository.deleteById( idMarca );
	}
}
