package com.hugojvb.freevom.models;

import java.util.List;
import java.util.Set;
import org.springframework.data.annotation.Id;

public class Video {

	@Id
	private String id;
	private String title;
	private String description;
	private String userId;
	private Integer likes;
	private Integer dislikes;
	private Set<String> tags;
	private String videoUrl;
	private VideoStatus videoStatus;
	private Integer viewCount;
	private List<Comment> comments;
	private String thumbnailUrl;
}
