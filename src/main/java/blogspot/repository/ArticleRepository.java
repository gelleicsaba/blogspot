package blogspot.repository;

import blogspot.dto.IArticleCount;
import blogspot.dto.IArticleStat;
import blogspot.model.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Transactional
    default Article updateOrInsert(final Article entity) {
        return save(entity);
    }

    @Transactional
    default void remove(final Article entity) {
        delete(entity);
    }

    @Query("SELECT a FROM Article a WHERE a.id = ?1")
    List<Article> articleById(final int id);

    @Query("SELECT a FROM Article a WHERE a.name = ?1")
    List<Article> articleByName(final String name, Pageable pageable);

    @Query("SELECT a FROM Article a")
    List<Article> articlePageable(Pageable pageable);

    @Query(nativeQuery = true, value="SELECT category, COUNT(category) AS id FROM articles GROUP BY category HAVING COUNT(category)>0")
    List<IArticleStat> getStatistics();

    @Query(nativeQuery = true, value="SELECT a.* FROM articles a ORDER BY a.id DESC LIMIT 4 OFFSET ?1")
    List<Article> articlePage(int page);

    @Query(nativeQuery = true, value="SELECT COUNT(1) AS count FROM articles")
    IArticleCount articlecCount();

    @Query(nativeQuery = true, value="SELECT a.* FROM articles a ORDER BY a.id DESC LIMIT ?1")
    List<Article> articleLimitDesc(int limit);

}