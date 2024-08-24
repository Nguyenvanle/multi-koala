package com.duokoala.server.repository.mediaRepository;

import com.duokoala.server.entity.media.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, String> {

}
