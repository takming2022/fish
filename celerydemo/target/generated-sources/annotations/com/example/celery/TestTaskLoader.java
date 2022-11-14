package com.example.celery;

import org.kohsuke.MetaInfServices;
import com.geneea.celery.CeleryTaskLoader;

@MetaInfServices
public class TestTaskLoader implements CeleryTaskLoader<com.example.celery.TestTask> {
    @Override
    public com.example.celery.TestTask loadTask() {
        return new com.example.celery.TestTask();
    }
}
