package blogspot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "articles", schema = "public")
public class Article {
    @Id
    @GeneratedValue
    protected int id;

    @Column(name = "name", nullable = true, length = 400)
    protected String name;

    @Column(name = "category", nullable = true, length = 100)
    protected String category;

    @Column(name = "date", nullable = true, length = 16)
    protected String date;

    @Column(name = "content", nullable = true, columnDefinition = "TEXT")
    protected String content;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}