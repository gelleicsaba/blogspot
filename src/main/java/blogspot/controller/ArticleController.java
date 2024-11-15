package blogspot.controller;

import blogspot.dto.ArticlePageDto;
import blogspot.dto.IArticleCount;
import blogspot.model.Article;
import blogspot.repository.ArticleRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    private ArticleRepository _articleRepository;
    private static final int PAGE_SIZE = 4;

    private Logger _logger;

    public ArticleController(Logger _logger) {
        this._logger = _logger;
    }

    @GetMapping("")
    public List<Article> index() {
        return _articleRepository.findAll(Sort.by(Sort.Direction.DESC, "name"));
    }

    @GetMapping("/latest")
    public Article latest() {
        final List<Article> article = _articleRepository.articlePageable(PageRequest.of (0, 1, Sort.Direction.DESC, "id"));
        return !article.isEmpty() ? article.getFirst() : new Article();
    }

    @GetMapping("/random")
    public Article random() {
        final long count = _articleRepository.count()-1;
        final int rnd = (int)(Math.random() * count);
        List<Article> article = _articleRepository.articlePageable(PageRequest.of (rnd, 1, Sort.Direction.ASC, "id"));
        return !article.isEmpty() ? article.getFirst() : new Article();
    }

    @GetMapping("/page")
    public ArticlePageDto page(@RequestParam("page") final int page) {
        final List<Article> article = _articleRepository.articlePage(page*PAGE_SIZE);
        final IArticleCount count = _articleRepository.articlecCount();
        final int lastPage = (count.getCount() / PAGE_SIZE);
        if (lastPage < page || page < 0) {
            throw new ArrayIndexOutOfBoundsException();
        }
        ArticlePageDto dto = new ArticlePageDto();
        dto.setData(article);
        dto.setPage(page);
        dto.setLastPage(lastPage);
        return dto;
    }

    @GetMapping("/limit")
    public List<Article> pageLimitDesc(@RequestParam("limit") final int limit) {
        return _articleRepository.articleLimitDesc(limit);
    }

    @GetMapping("/search")
    public ArticlePageDto articleSearchPage(@RequestParam("page") final int page, @RequestParam("search") final String search) {
        final String searchParam = "%"+search.toLowerCase()+"%";
        final List<Article> article = _articleRepository.articleSearchPage(page*PAGE_SIZE, searchParam, searchParam, searchParam, searchParam);
        final IArticleCount count = _articleRepository.articleSearchCount(searchParam, searchParam, searchParam, searchParam);
        final int lastPage = (count.getCount() / PAGE_SIZE);
        if (lastPage < page || page < 0) {
            throw new ArrayIndexOutOfBoundsException();
        }
        ArticlePageDto dto = new ArticlePageDto();
        dto.setData(article);
        dto.setPage(page);
        dto.setLastPage(lastPage);
        return dto;
    }



}