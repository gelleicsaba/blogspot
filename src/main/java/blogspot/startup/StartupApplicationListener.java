package blogspot.startup;

import blogspot.Main;
import blogspot.model.Category;
import blogspot.repository.CategoryRepository;
import blogspot.service.seed.MigrationSeedService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;

import java.util.Collection;
import java.util.List;

@Component
public class StartupApplicationListener implements ApplicationListener<ContextRefreshedEvent> {
    private Logger _logger;

    @Autowired
    private MigrationSeedService _migrationSeedService;

    public StartupApplicationListener(Logger logger) {
        _logger = logger;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        _logger.info("onApplicationEvent started");

        if (Main._argOptions.isMigrationSeed() && Main._argOptions.isSpring()) {
            _migrationSeedService.seed();
        }

    }

    @Override
    public boolean supportsAsyncExecution() {
        return false;
    }
}