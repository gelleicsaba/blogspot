package blogspot.service.seed;
import blogspot.Main;
import blogspot.model.Article;
import blogspot.model.Category;
import blogspot.repository.ArticleRepository;
import blogspot.repository.CategoryRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URL;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MigrationSeedService {
    @Autowired
    private CategoryRepository _categoryRepository;
    @Autowired
    private ArticleRepository _articleRepository;

    private Logger _logger;

    public MigrationSeedService(Logger _logger) {
        this._logger = _logger;
    }

    public void seed() {
        if (!Main._argOptions.isMigrationSeed()) {
            return;
        }
        _logger.info("Seeding Categories...");
        Collection<Category> categories = _categoryRepository.categoryAll();
        if (categories.isEmpty()) {
            /* Initial seed */
            String[] catNames = new String[] { "ASP.Net", "Vue", "Java", "Angular" };
            for (final String catName : catNames) {
                Category cat = new Category();
                cat.setName(catName);
                _categoryRepository.updateOrInsert(cat);
            }
        }
        /* Additional seeds */
        String[] catNames = new String[] { "Command tools", "Linux", "NodeJS", "Spring boot", "Intellij Idea", "OS", "HTML/CSS", "Web apps" };
        for (final String catName : catNames) {
            Category catTest = categories.stream().filter(x -> x.getName().equals(catName)).findFirst().orElse(null);
            if (catTest == null) {
                Category cat = new Category();
                cat.setName(catName);
                _categoryRepository.updateOrInsert(cat);
            }
        }

        _logger.info("Seeding Articles...");
        /* Article import */

        // remove for cycle after the test
        //for (int x = 0; x < 5; ++x) {

        final DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        final Date date = new Date();
        try {
            final File file = Main.getArticleResource().getFile();
            final Scanner scanner = new Scanner(file);
            String category = null;
            String name = null;
            String content = null;
            boolean next = true;
            while (scanner.hasNext()) {
                String line = scanner.nextLine();
                if (line.equals("--END--")) {
                    break;
                } else if (next) {
                    name = line;
                    line = scanner.nextLine();
                    category = line;
                    line = scanner.nextLine();
                    content = line;
                    next = false;
                } else if (line.equals("****")) {
                    List<Article> test = _articleRepository.articleByName(name, PageRequest.of(0,1));
                    if (test.isEmpty()) {
                        Article newArticle = new Article();
                        newArticle.setName(name);
                        newArticle.setDate(dateFormat.format(date));
                        newArticle.setCategory(category);
                        newArticle.setContent(content);
                        _articleRepository.updateOrInsert(newArticle);
                        _logger.info("Inserted new article : " + newArticle);
                    }
                    name = null;
                    content = null;
                    category = null;
                    next = true;
                }
            }
            scanner.close();
            _logger.info("Seeding All is done.");
        } catch (Exception ex) {
            _logger.error(ex.getMessage());
        }

        //}
        System.exit(0);
    }

}