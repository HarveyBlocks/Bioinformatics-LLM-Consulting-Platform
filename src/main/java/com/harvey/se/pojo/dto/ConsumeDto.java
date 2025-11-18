package com.harvey.se.pojo.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.annotation.Resource;

/**
 * TODO
 *
 * @author <a href="mailto:harvey.blocks@outlook.com">Harvey Blocks</a>
 * @version 1.0
 * @date 2025-11-12 13:49
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "消费操作的信息类型")
public class ConsumeDto {
    @ApiModelProperty(value = "目标商品价格", required = true)
    private Long id;
}
