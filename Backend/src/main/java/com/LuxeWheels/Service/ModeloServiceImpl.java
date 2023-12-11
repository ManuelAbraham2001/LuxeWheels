package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearModeloDTO;
import com.LuxeWheels.Entity.*;
import com.LuxeWheels.Repository.CaracteristicaRepository;
import com.LuxeWheels.Repository.CategoriaRepository;
import com.LuxeWheels.Repository.MarcaRepository;
import com.LuxeWheels.Repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

@Service
public class ModeloServiceImpl implements ModeloService{

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;


    @Override
    public Modelo crear(CrearModeloDTO modelo) {
        Marca marca = marcaRepository.findByMarca(modelo.getMarca());
        List<Categoria> categorias = new ArrayList<>();
        List<Caracteristica> caracteristicas = new ArrayList<>();

        for (String c : modelo.getCategorias()) {
            Categoria categoria = categoriaRepository.findByCategoria(c);
            categorias.add(categoria);
        }

        for (String c : modelo.getCaracteristicas()) {
            Caracteristica caracteristica = caracteristicaRepository.findByCaracteristica(c);
            caracteristicas.add(caracteristica);
        }

        return modeloRepository.save(new Modelo(modelo.getModelo(), marca, categorias, caracteristicas));
    }

    @Override
    public List<Modelo> listarTodos() {
        return modeloRepository.findAll();
    }

    @Override
    public void editar(CrearModeloDTO modeloDTO, Long id) {

        Modelo modelo = modeloRepository.findById(id).orElseThrow();
        if(!modeloDTO.getMarca().equals(modelo.getMarca().getMarca())){
            Marca marca = marcaRepository.findByMarca(modeloDTO.getMarca());
            modelo.setMarca(marca);
        }
        List<Categoria> categorias = modelo.getCategorias();
        List<Caracteristica> caracteristicas = modelo.getCaracteristicas();

        agregarElementos(modeloDTO.getCategorias(), categorias, categoriaRepository, categoriaRepository::findByCategoria);
        agregarElementos(modeloDTO.getCaracteristicas(), caracteristicas, caracteristicaRepository, caracteristicaRepository::findByCaracteristica);

        modelo.setModelo(modeloDTO.getModelo());
        modelo.setCategorias(new ArrayList<>(categorias));
        modelo.setCaracteristicas(new ArrayList<>(caracteristicas));

        modeloRepository.save(modelo);
    }

    @Override
    public Page<Modelo> listarPaginados(int pagina) {
        int cantidadPorPagina = 10;
        Pageable page = PageRequest.of(pagina - 1, cantidadPorPagina);
        return modeloRepository.paginarModelos(page);
    }

    @Override
    public void agregarCategoria(String categoria, Long id) {

        Modelo modelo = modeloRepository.findById(id).orElseThrow();
        List<Categoria> categorias = modelo.getCategorias();
        boolean encontrado = false;

        for (Categoria c : categorias) {
            if(c.getCategoria().equals(categoria)){
                encontrado = true;
                break;
            }
        }

        if (!encontrado) {
            Categoria categoriaDB = categoriaRepository.findByCategoria(categoria);
            categorias.add(categoriaDB);
            modelo.setCategorias(categorias);
            modeloRepository.save(modelo);
        }
    }

    @Override
    public void eliminar(Long id) {
        modeloRepository.deleteById(id);
    }

    private <T, R extends JpaRepository<T, Long>> void agregarElementos(List<String> nuevosElementos, List<T> elementosExistentes, R repository, Function<String, T> findByFunction) {
        for (String nuevoElemento : nuevosElementos) {
            boolean elementoEncontrado = elementosExistentes.stream()
                    .anyMatch(existente -> findByFunction.apply(nuevoElemento).equals(existente));

            if (!elementoEncontrado) {
                T elemento = findByFunction.apply(nuevoElemento);
                elementosExistentes.add(elemento);
            }
        }
    }
}
