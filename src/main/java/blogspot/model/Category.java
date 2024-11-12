package blogspot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categories", schema = "public")
public class Category {
    @Id
    @GeneratedValue
    protected int id;

    @Column(name = "name", nullable = true, length = 100)
    protected String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}