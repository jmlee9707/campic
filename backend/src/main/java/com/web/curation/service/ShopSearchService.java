package com.web.curation.service;

import com.web.curation.data.entity.ShopSearch;
import com.web.curation.data.repository.ShopSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShopSearchService {
    private final ShopSearchRepository shopSearchRepository;

    @Autowired
    public ShopSearchService(ShopSearchRepository shopSearchRepository){
        this.shopSearchRepository = shopSearchRepository;
    }

    /* 들어온 검색어 저장 */
    @Transactional
    public int save(ShopSearch shopSearch) {
        ShopSearch ss = new ShopSearch();
        System.out.println(shopSearch);
        ss.setSearchWord(shopSearch.getSearchWord());
        shopSearchRepository.save(ss);

        return ss.getSearchId();
    }

    /* 베스트 검색어 */
    public List<String> bestSearch() {
        List<String> bestSearchList = shopSearchRepository.findTop5(PageRequest.of(0,5));
        return bestSearchList;
    }


}
