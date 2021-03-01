package com.uns.serviceventas.repository;

import com.uns.serviceventas.entity.EstadoVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoVentaRepository extends JpaRepository<EstadoVenta, Integer> {
}
