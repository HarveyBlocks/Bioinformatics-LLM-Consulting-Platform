package com.harvey.se.pojo.dto;

import com.harvey.se.exception.ResourceNotFountException;
import com.harvey.se.pojo.entity.ChatMessage;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author <a href="mailto:harvey.blocks@outlook.com">Harvey Blocks</a>
 * @version 1.0
 * @date 2025-11-11
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(description = "用户提问的参数")
public class ChatMessageFromUserDto {

    @ApiModelProperty(value = "文本", required = true)
    private String message;
}
