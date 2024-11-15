package blogspot.dto;

import blogspot.model.Article;
import java.util.List;

public class AtriclePageDto {
    protected int page;
    protected List<Article> data;
    protected int lastPage;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public List<Article> getData() {
        return data;
    }

    public void setData(List<Article> data) {
        this.data = data;
    }

    public int getLastPage() {
        return lastPage;
    }

    public void setLastPage(int lastPage) {
        this.lastPage = lastPage;
    }
}