package com.hugojvb.freevom.services;

import java.io.IOException;
import java.util.UUID;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class s3Service implements FileService{
    private final AmazonS3Client amazonS3Client; 
    private static final String BUCKET_NAME = "freevom";
    
    public s3Service(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    @Override
    public String uploadFile(MultipartFile file) {

        var fileNameExtension = StringUtils.getFilename(file.getOriginalFilename());

        var key = UUID.randomUUID().toString() + fileNameExtension;

        var metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        try {
            amazonS3Client.putObject(BUCKET_NAME, key, file.getInputStream(), metadata);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An Exception Ocurred while uploading the file");
        }

        amazonS3Client.setObjectAcl(BUCKET_NAME, key, CannedAccessControlList.PublicRead);

        return amazonS3Client.getResourceUrl(BUCKET_NAME, key);
    }
}
