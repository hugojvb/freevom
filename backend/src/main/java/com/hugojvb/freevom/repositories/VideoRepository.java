package com.hugojvb.freevom.repositories;

import com.hugojvb.freevom.models.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {
    
}
