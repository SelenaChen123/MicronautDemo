package check.list.controller;

import check.list.models.Todo;
import check.list.repository.TodoRepository;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import java.util.List;
import javax.validation.constraints.NotBlank;

@Controller ( "/api" )
@ExecuteOn ( TaskExecutors.IO )
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRep) {
        todoRepository = todoRep;
    }

    @Get ( value = "/todos" )
    public List<Todo> getTodos(@Nullable @QueryValue String username, @Nullable @QueryValue String tag) {
        if (username == null) {
            return todoRepository.findAll();
        } else if (tag == null) {
            return todoRepository.findByUsername(username);
        } else {
            return todoRepository.findByUsernameAndTag(username, tag);
        }
    }

    @Post ( value = "/todos", consumes = {"application/json"} )
    public Todo addTodo ( @Body Todo todo ) {
        Todo todoSaved = todoRepository.save( todo );
        return todoSaved;
    }

    @Delete ( value = "/todos/{id}" )
    public void deleteTodo ( @NotBlank Long id ) {
        todoRepository.deleteById( id );
    }

    /*
    @Get ( "/all-todos" )
    public List<Todo> getAll() {
        return todoRepository.findAll();
    }
    */
}
