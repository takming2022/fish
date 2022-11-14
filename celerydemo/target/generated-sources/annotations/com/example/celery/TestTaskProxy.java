package com.example.celery;

import com.geneea.celery.Celery;
import com.google.common.util.concurrent.ListenableFuture;

public final class TestTaskProxy {

    private final Celery client;

    private TestTaskProxy(Celery client) {
        this.client = client;
    }

    public static com.example.celery.TestTaskProxy with(Celery client) {
        return new com.example.celery.TestTaskProxy(client);
    }

    public ListenableFuture<java.lang.Integer> sum(
            java.lang.Integer x,
            java.lang.Integer y
        ) throws java.io.IOException {

        return client.submit(
                com.example.celery.TestTask.class,
                "sum",
                new Object[]{
                        x,
                        y
                });
    }
    public ListenableFuture<java.lang.String> pokemon_api(
            java.lang.Integer number
        ) throws java.io.IOException {

        return client.submit(
                com.example.celery.TestTask.class,
                "pokemon_api",
                new Object[]{
                        number
                });
    }
}
