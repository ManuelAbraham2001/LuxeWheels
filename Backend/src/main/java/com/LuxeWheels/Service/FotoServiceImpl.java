package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Entity.Modelo;
import com.LuxeWheels.Entity.Vehiculo;
import com.LuxeWheels.Repository.FotoRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AccessControlList;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class FotoServiceImpl implements FotoService{

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private FotoRepository fotoRepository;

    @Override
    public void cargarFotoModelo(MultipartFile foto, Vehiculo vehiculo) {
        String nombreImagen = "imgs/" + UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();

        try{
            PutObjectRequest request = new PutObjectRequest("c3-equipo5", nombreImagen, foto.getInputStream(), new ObjectMetadata());
            request.setCannedAcl(CannedAccessControlList.PublicRead);

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");
            request.setMetadata(metadata);
            s3Client.putObject(request);

            fotoRepository.save(new Foto("https://c3-equipo5.s3.us-east-2.amazonaws.com/" + nombreImagen, vehiculo));
        }catch (IOException e){
            throw new RuntimeException("Error al cargar la imagen");
        }

    }

    @Override
    public void eliminarFotosVehiculo(List<Foto> fotos) {
        for (Foto f : fotos) {
            fotoRepository.deleteById(f.getId());
        }
    }

    @Override
    public Foto cargar(MultipartFile foto, String tipo) throws IOException {
        String nombreImagen = "imgs/" + UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();

        PutObjectRequest request = new PutObjectRequest("c3-equipo5", nombreImagen, foto.getInputStream(), new ObjectMetadata());
        ObjectMetadata metadata = new ObjectMetadata();
        request.setCannedAcl(CannedAccessControlList.PublicRead);

        metadata.setContentType(tipo);
        request.setMetadata(metadata);
        s3Client.putObject(request);

        return new Foto("https://c3-equipo5.s3.us-east-2.amazonaws.com/" + nombreImagen);
    }


}
