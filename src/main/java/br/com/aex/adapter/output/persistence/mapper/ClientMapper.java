package br.com.aex.adapter.output.persistence.mapper;

import br.com.aex.domain.models.ClienteModel;
import br.com.aex.adapter.output.persistence.entities.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ClientMapper {

    ClienteModel toClientModel(final Cliente source);

}
