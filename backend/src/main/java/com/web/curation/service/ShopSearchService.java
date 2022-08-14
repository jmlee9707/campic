package com.web.curation.service;

import com.web.curation.data.dto.ItemsDto;
import com.web.curation.data.dto.SearchRequestDto;
import com.web.curation.data.entity.ShopSearch;
import com.web.curation.data.repository.ShopSearchRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
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
    public int save(SearchRequestDto searchRequestDto) {
        ShopSearch ss = new ShopSearch();
        ss.setSearchWord(searchRequestDto.getQuery());
        shopSearchRepository.save(ss);

        return ss.getSearchId();
    }

    /* 베스트 검색어 */
    public List<String> bestSearch() {
        List<String> bestSearchList = shopSearchRepository.findTop5(PageRequest.of(0,5));
        return bestSearchList;
    }

    /* 검색 */
    public List<ItemsDto> search(SearchRequestDto searchRequestDto) {
        String url = "https://openapi.naver.com/";

        URI uri = UriComponentsBuilder.fromHttpUrl(url)
                .path("v1/search/shop.json")
                .queryParam("query", searchRequestDto.getQuery())
                .queryParam("display", searchRequestDto.getDisplay())
                .queryParam("start", searchRequestDto.getStart())
                .encode()
                .build()
                .toUri();
        RestTemplate restTemplate = new RestTemplate();

        RequestEntity<Void> req = RequestEntity
                .get(uri)
                .header("X-Naver-Client-Id", "fZskdl4WGlcbiRs_kN0o")
                .header("X-Naver-Client-Secret", "tEzNV9vH9Y")
                .build();

        ResponseEntity<String> result = restTemplate.exchange(req, String.class);
        List<ItemsDto> itemList = fromJSONtoNaverProduct(result.getBody());

        return itemList;
    }

    private List<ItemsDto> fromJSONtoNaverProduct(String result) {
        // 문자열 정보를 JSONObject로 바꾸기
        JSONObject rjson = new JSONObject(result);
        // JSONObject에서 items 배열 꺼내기
        // JSON 배열이기 때문에 보통 배열이랑 다르게 활용해야한다.
        JSONArray items = rjson.getJSONArray("items");
//        System.out.println();
        List<ItemsDto> itemsDtoList = new ArrayList<>();
        for (int i = 0; i < items.length(); i++) {
            JSONObject itemJson = (JSONObject) items.get(i);
            ItemsDto itemDto = new ItemsDto(itemJson);
            itemsDtoList.add(itemDto);
        }
        return itemsDtoList;
    }
}
