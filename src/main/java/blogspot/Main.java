package blogspot;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.

import blogspot.configuration.ArgOptions;
import blogspot.configuration.IArgOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.scheduling.annotation.EnableAsync;

import java.text.MessageFormat;
import java.util.List;

/**
 * @author Gellei Csaba
 * @version 1.0.0
 */
@EnableAsync
@SpringBootApplication
public class Main {

    public static IArgOptions _argOptions;

    public static void main(String[] args) {
        ArgOptions argOptions = new ArgOptions();

        boolean invalidOption = false;
        for (String arg : args) {
            switch (arg) {
                case "spring":
                    argOptions.setSpring(true);
                    break;
                case "migration-seed":
                    argOptions.setMigrationSeed(true);
                    break;
                case "test":
                    argOptions.setTest(true);
                    break;
                case "developer":
                    argOptions.setDeveloper(true);
                    break;
                case "production":
                    argOptions.setProduction(true);
                    break;
                default:
                    System.err.println(MessageFormat.format("Invalid option -> \"{0}\"", arg));
                    invalidOption = true;
            }
        }

        if (invalidOption) {
            System.exit(1);
        }

        _argOptions = (IArgOptions)argOptions;

        System.out.println("Blogspot - spring boot project");
        System.out.println(_argOptions);

        if (_argOptions.isSpring()) {
            SpringApplication.run(Main.class, args);
        }

    }

    public static Resource getArticleResource() {
        return new ClassPathResource("articles.txt");
    }
}