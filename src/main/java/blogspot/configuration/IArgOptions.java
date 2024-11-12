package blogspot.configuration;

public interface IArgOptions {
    boolean isDeveloper();
    boolean isProduction();
    boolean isTest();
    boolean isSpring();
    boolean isMigrationSeed();
    String toString();
}