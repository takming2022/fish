package com.example.celery;

import com.geneea.celery.CeleryWorkerCLI;
public class MyWorker {
    public static void main(String[] args) throws Exception {
        //注意broker的url的末尾/必须用转义符%2F
        args = new String[]{"--queue","celery",
                            "--concurrency","2",
                            "--broker","amqp://guest:guest@localhost:5672/%2F"};
        CeleryWorkerCLI.main(args);
    }
}
