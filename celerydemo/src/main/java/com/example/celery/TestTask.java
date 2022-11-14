package com.example.celery;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

import com.geneea.celery.CeleryTask;

@CeleryTask
public class TestTask {

    public int sum(int x, int y){
        return x + y;
    }
    public static String pokemon_api(int number) throws IOException {
        URL restURL = new URL("https://pokeapi.co/api/v2/pokemon/" + Integer.toString(number));

        HttpURLConnection conn = (HttpURLConnection) restURL.openConnection();

        conn.setRequestMethod("GET"); // POST GET PUT DELETE
        conn.setRequestProperty("Accept", "application/json");

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        line = br.readLine();
        JSONObject object = new JSONObject(line);
        String pageName = object.getString("name");
        br.close();
        return pageName;
    }
}
