package br.com.aex;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import io.swagger.v3.core.jackson.ModelResolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProjetoAplicadoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjetoAplicadoApplication.class, args);
    }

    @Bean
    public ModelResolver modelResolver(final ObjectMapper objectMapper) {
        return new ModelResolver(objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE));
    }

}
