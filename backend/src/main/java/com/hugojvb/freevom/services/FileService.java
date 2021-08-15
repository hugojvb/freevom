package com.hugojvb.freevom.services;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    
    String uploadFile(MultipartFile multipartFile);
}
