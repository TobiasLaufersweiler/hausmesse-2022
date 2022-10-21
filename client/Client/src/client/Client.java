/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import client.driver.DHT22;
import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.gpio.GpioPinDigitalOutput;
import com.pi4j.io.gpio.Pin;
import com.pi4j.io.gpio.PinState;
import com.pi4j.io.gpio.RaspiPin;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author murawia
 */
public class Client {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws MalformedURLException, IOException {
        GpioController gpio = GpioFactory.getInstance();
        GpioPinDigitalOutput pin = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_01, "MyLED", PinState.HIGH);
        
        pin.setShutdownOptions(true, PinState.LOW);
        DHT22 driver = new DHT22((Pin) pin);
        try {
            while(driver.read()){
                Date date = new Date();
                Timestamp ts = new Timestamp(date.getTime());
                sendData(driver.getTemperature(), driver.getHumidity(), ts);
            }
        } catch (Exception ex) {
            Logger.getLogger(Client.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    private static void sendData(double temp, double humanity, Timestamp timestamp) throws MalformedURLException, ProtocolException, IOException{
        URL url = new URL("https://localhost/api/data/");
        URLConnection con = url.openConnection();
        HttpURLConnection http = (HttpURLConnection)con;
        http.setRequestMethod("POST"); // PUT is another valid option
        http.setDoOutput(true);
        
        byte[] out = "{\"temp\":\"1\",\"humanity\":\"12\",\"timestamp\":\"timestampxxy\"}".replaceAll("timestampxxy", timestamp.toString()).getBytes(StandardCharsets.UTF_8);
        int length = out.length;

       http.setFixedLengthStreamingMode(length);
       http.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
       http.connect();
       try(OutputStream os = http.getOutputStream()) {
          os.write(out);
}
    }
    
}
