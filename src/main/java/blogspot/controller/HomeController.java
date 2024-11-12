package blogspot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "Blog services\n<br>Developed with spring boot 3.3.4";
    }
}