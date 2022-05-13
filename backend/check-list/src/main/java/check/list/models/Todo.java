package check.list.models;

import io.micronaut.core.annotation.Creator;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@MappedEntity
public class Todo {

    @Id
    @GeneratedValue
    private Long   id;

    private final String username;

    private final String content;

    private final String tag;

    @Creator
    public Todo ( String username, String content, String tag ) {
        this.username = username;
        this.content = content;
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername () {
        return username;
    }

    public String getContent () {
        return content;
    }

    public String getTag () {
        return tag;
    }

}
