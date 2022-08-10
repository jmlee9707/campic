package com.web.curation.data.repository;

import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.TagDto;
import com.web.curation.data.entity.CampTag;
import com.web.curation.data.entity.TotalCampList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagRepository  extends JpaRepository<CampTag, Integer> {
//    @Query("select distinct t " +
//            "from CampTag t " +
//            "where (t.tagGroup = 1 and t.hashtag in :taglist)" //+
//            "or (t.tagGroup = 2 and t.hashtag in :taglist)" +
//            "or (t.tagGroup = 3 and t.hashtag in :taglist)" +
//            "or (t.tagGroup = 4 and t.hashtag in :taglist)" +
//            "or (t.tagGroup = 5 and t.hashtag in :taglist)" +
//            "or (t.tagGroup = 6 and t.hashtag in :taglist)" +
//            "or (t.tagGroup = 7 and t.hashtag in :taglist)"
//            )
//    List<TagDto.SearchedTag> findByHashtag(List<String> taglist);
//    @Query("select distinct t.campId " +
//            "from CampTag t " +
//            "where t.tagGroup in :searchedTags")
//    List<CampDto.CampList> findByTag(List<TagDto.SearchedTag>[] searchedTags);

    @Query("select distinct t " +
            "from CampTag t " +
            "where t.hashtag in :taglist " //+
//            "group by t.tagGroup "
    )
    List<TagDto.SearchedTag> findDistinctByAndHashtagIn( List<String> taglist);

}

