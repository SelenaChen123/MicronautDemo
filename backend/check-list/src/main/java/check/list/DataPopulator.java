package check.list;

import java.util.Arrays;

import javax.transaction.Transactional;

import check.list.models.Todo;
import check.list.repository.TodoRepository;
import io.micronaut.context.annotation.Requires;
import io.micronaut.context.event.StartupEvent;
import io.micronaut.runtime.event.annotation.EventListener;
import jakarta.inject.Singleton;

@Singleton
@Requires(notEnv = "test")
public class DataPopulator {

    private final TodoRepository todoRepository;

    public DataPopulator(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @EventListener
    @Transactional
    void init(StartupEvent event) {
        // clear out any existing data
        todoRepository.deleteAll();

        // create data
        Todo fred = new Todo("Fred", "content", "tag");
        Todo barney = new Todo("Barney", "asdfasdfasdf asdf", "aaa");
        todoRepository.saveAll(Arrays.asList(fred, barney));
    }
}