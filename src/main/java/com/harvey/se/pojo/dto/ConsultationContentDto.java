package com.harvey.se.pojo.dto;

import com.harvey.se.exception.BadRequestException;
import com.harvey.se.exception.ResourceNotFountException;
import com.harvey.se.pojo.entity.ConsultationContent;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 用户咨询生物信息有关信息
 *
 * @author <a href="mailto:harvey.blocks@outlook.com">Harvey Blocks</a>
 * @version 1.0
 * @date 2025-11-11
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "用户的咨询信息")
public class ConsultationContentDto {
    public static final ConsultationContentDto DEFAULT =
            new ConsultationContentDto();

    @ApiModelProperty(value = "持有这个咨询信息的用户, 系统自动分配, 但其为null时表示此信息为默认信息")
    private Long userId;
    @ApiModelProperty(value = "项目核心分析目标")
    private Integer projectGoal;
    @ApiModelProperty(value = "具体项目分析类型")
    private Integer analysisType;
    @ApiModelProperty(value = "物种信息")
    private String organism;
    @ApiModelProperty(value = "数据类型与格式")
    private String dataType;
    @ApiModelProperty(value = "数据来源")
    private String dataSource;
    @ApiModelProperty(value = "样本数量与设计")
    private String sampleInfo;
    @ApiModelProperty(value = "计算资源规模")
    private String computeResource;
    @ApiModelProperty(value = "存储资源需求")
    private String storageRequirement;
    @ApiModelProperty(value = "项目紧急程度")
    private String projectUrgency;
    @ApiModelProperty(value = "用户技能水平")
    private String userSkillLevel;
    @ApiModelProperty(value = "偏好编程语言")
    private String preferredLanguage;
    @ApiModelProperty(value = "偏好分析工具")
    private String preferredTools;
    @ApiModelProperty(value = "核心科学假说")
    private String coreHypothesis;
    @ApiModelProperty(value = "期望交付成果")
    private String expectedOutput;
    @ApiModelProperty(value = "咨询状态")
    private String requestStatus;

    public static ConsultationContentDto adapte(ConsultationContentWithUserInfoDto withUserDto) {
        if (withUserDto == null) {
            throw new BadRequestException("请求参数不存在");
        }
        return new ConsultationContentDto( );
    }

    public static ConsultationContentDto adapte(ConsultationContent entity) {
        if (entity == null) {
            throw new ResourceNotFountException("请求不存在的资源");
        }
        return new ConsultationContentDto();
    }
}
