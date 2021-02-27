package com.uns.serviceproducto.services.serviceImpl;

import com.uns.serviceproducto.entity.Categoria;
import com.uns.serviceproducto.repository.CategoriaRepository;
import com.uns.serviceproducto.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CategoriaServiceImpl implements CategoriaService {
	
	private final CategoriaRepository categoriaRepository;
	
	@Autowired
	public CategoriaServiceImpl( CategoriaRepository categoriaRepository ) {
		this.categoriaRepository = categoriaRepository;
	}
	
	@Override
	public List<Categoria> listAll() {
		return categoriaRepository.findAll();
	}
	
	@Override
	public Categoria findByID( Integer idCategoria ) {
		return categoriaRepository.findById( idCategoria ).orElse( null );
	}
	
	@Override
	public Categoria addNew( Categoria categoria ) {
		Categoria           nuevo   = null;
		Optional<Categoria> buscado = categoriaRepository.findByNombre( categoria.getNombre() );
		if ( categoria.getNombre() != null ) {
			boolean existe = buscado.isPresent();
			if ( !existe ) {
				nuevo = categoriaRepository.saveAndFlush( categoria );
			}
		}
		return nuevo;
	}
	
	@Override
	public Categoria update( Categoria categoria ) {
		Categoria actualizado = null;
		Categoria find        = categoriaRepository.findById( categoria.getId() ).orElseThrow();
		if ( !Objects.equals( find.getNombre(),
		                      categoria.getNombre() ) ) {
			Optional<Categoria> nombreCategoria = categoriaRepository.findByNombre( categoria.getNombre() );
			boolean             existe          = nombreCategoria.isPresent();
			if ( !existe ) {
				actualizado = categoriaRepository.saveAndFlush( categoria );
			}
		}
		return actualizado;
	}
	
	@Override
	public void delete( Integer idCategoria ) {
		categoriaRepository.deleteById( idCategoria );
	}
}
