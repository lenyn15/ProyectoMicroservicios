package com.uns.serviceventas.repository;

import com.uns.serviceventas.entity.EstadoVenta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoVentaRepository extends JpaRepository<EstadoVenta, Integer> {
}
