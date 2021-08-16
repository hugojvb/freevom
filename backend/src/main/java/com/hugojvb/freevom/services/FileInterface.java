package com.hugojvb.freevom.services;

import org.springframework.web.multipart.MultipartFile;

public interface FileInterface {
    
    String uploadFile(MultipartFile file);
}
