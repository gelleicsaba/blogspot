package blogspot.configuration;

public class ArgOptions implements IArgOptions {
    protected boolean developer;
    protected boolean production;
    protected boolean test;
    protected boolean spring;
    protected boolean migrationSeed;

    public boolean isDeveloper() {
        return developer;
    }

    public void setDeveloper(boolean developer) {
        this.developer = developer;
    }

    public boolean isProduction() {
        return production;
    }

    public void setProduction(boolean production) {
        this.production = production;
    }

    public boolean isTest() {
        return test;
    }

    public void setTest(boolean test) {
        this.test = test;
    }

    public boolean isSpring() {
        return spring;
    }

    public void setSpring(boolean spring) {
        this.spring = spring;
    }

    public boolean isMigrationSeed() {
        return migrationSeed;
    }

    public void setMigrationSeed(boolean migrationSeed) {
        this.migrationSeed = migrationSeed;
    }

    @Override
    public String toString() {
        return "ArgOptions{" +
                "developer=" + developer +
                ", production=" + production +
                ", test=" + test +
                ", spring=" + spring +
                ", migrationSeed=" + migrationSeed +
                '}';
    }
}