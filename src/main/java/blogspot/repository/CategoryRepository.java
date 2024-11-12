package blogspot.repository;

import blogspot.model.Article;
import blogspot.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Transactional
    default Category updateOrInsert(final Category entity) {
        return save(entity);
    }

    @Transactional
    default void remove(final Category entity) {
        delete(entity);
    }

    @Query("SELECT c FROM Category c WHERE c.id = ?1")
    Collection<Category> categoryById(final int id);

    @Query("SELECT c FROM Category c")
    Collection<Category> categoryAll();

    //@Query("SELECT c FROM Category c LIMIT ?1")
    //Collection<Category> categoryLimit(final int limit);

    @Query("SELECT c FROM Category c WHERE c.name = ?1")
    Collection<Category> categoryByName(final String name);
}