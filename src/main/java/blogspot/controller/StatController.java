package blogspot.controller;

import blogspot.dto.IArticleStat;
import blogspot.model.Article;
import blogspot.repository.ArticleRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/stat")
public class StatController {
    @Autowired
    private ArticleRepository _articleRepository;

    private Logger _logger;

    public StatController(Logger _logger) {
        this._logger = _logger;
    }

    @GetMapping("")
    public List<IArticleStat> getStatistics() {
        List<IArticleStat> rs = _articleRepository.getStatistics();
        return rs;
    }

}