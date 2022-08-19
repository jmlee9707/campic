package com.web.curation.data.dto;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;

@Getter
@Setter
public class ItemsDto {
    @Getter
    private String title;
    private String link;
    private String image;
    private String lprice;
    private String hprice;
    private String mallName;
    private String productId;
    private String productType;
    private String brand;
    private String maker;
    private String category1;
    private String category2;
    private String category3;
    private String category4;

    public ItemsDto(JSONObject items){
        this.title = items.getString("title");
        this.link = items.getString("link");
        this.image = items.getString("image");
        this.lprice = items.getString("lprice");
        this.hprice = items.getString("hprice");
        this.mallName = items.getString("mallName");
        this.productId = items.getString("productId");
        this.productType = items.getString("productType");
        this.brand = items.getString("brand");
        this.maker = items.getString("maker");
        this.category1 = items.getString("category1");
        this.category2 = items.getString("category2");
        this.category3 = items.getString("category3");
        this.category4 = items.getString("category4");
    }
}
