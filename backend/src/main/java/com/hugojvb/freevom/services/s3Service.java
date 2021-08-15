package com.hugojvb.freevom.services;

import org.springframework.web.multipart.MultipartFile;

public class s3Service implements FileService{
    
    @Override
    public String uploadFile(MultipartFile multipartFile) {
        // Upload File to AWS s3
    }
}
