package com.hugojvb.freevom.services;

import com.hugojvb.freevom.models.Video;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoService {
    
    private final S3Service s3Service;

    public void uploadVideo(MultipartFile file) {
        String videoUrl = s3Service.uploadFile(file);
        var video = new Video();
        video.setVideoUrl(videoUrl);
    }
}
