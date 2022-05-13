package check.list.repository;

import check.list.models.Todo;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import java.util.List;

@JdbcRepository ( dialect = Dialect.ORACLE )
public interface TodoRepository extends CrudRepository<Todo, Long> {

    @Override
    @NonNull
    List<Todo> findAll();
    
    List<Todo> findByUsernameAndTag ( String username, String tag );

    List<Todo> findByUsername ( String username );
}
