package com.harvey.se.pojo.dto;

import com.harvey.se.exception.BadRequestException;
import com.harvey.se.exception.ResourceNotFountException;
import com.harvey.se.pojo.entity.ConsultationContent;
import com.harvey.se.pojo.entity.User;
import com.harvey.se.pojo.enums.UserRole;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 用户对生物信息的咨询和用户本身的信息
 *
 * @author <a href="mailto:harvey.blocks@outlook.com">Harvey Blocks</a>
 * @version 1.0
 * @date 2025-11-11
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "用户的信息及其咨询信息")
public class ConsultationContentWithUserInfoDto {
    @ApiModelProperty(value = "持有这个咨询信息的用户, 系统自动分配, 但其为null时表示此信息为默认信息")
    private Long userId;
    /**
     * 手机号码
     */
    @ApiModelProperty(value = "用户电话号码")
    private String phone;
    /**
     * 昵称，默认是随机字符
     */
    @ApiModelProperty(value = "用户昵称")
    private String nickname;

    @ApiModelProperty(value = "用户积分")
    private Integer points;
    /**
     * 创建时间
     */
    @ApiModelProperty(value = "记录创建时间, 由系统决定")
    private LocalDateTime createTime;
    /**
     * 更新时间
     */
    @ApiModelProperty(value = "记录更新时间, 由系统决定")
    private LocalDateTime updateTime;
    /**
     * 角色,权限
     */
    @ApiModelProperty(value = "用户权限", example = "0为root, 1为普通用户, 2为被拉入黑名单的用户, 3为vip(暂无)")
    private UserRole role;

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

    @SuppressWarnings("DuplicatedCode")
    public static ConsultationContentWithUserInfoDto combine(
            ConsultationContent consultationContent, User user) {
        if (user == null) {
            throw new ResourceNotFountException("can not fond resource of user");
        } else if (consultationContent == null) {
            throw new ResourceNotFountException("can not fond resource of consultation content");
        } else if (consultationContent.getUserId() != null && !consultationContent.getUserId().equals(user.getId())) {
            throw new IllegalArgumentException("the user_id of consultation content must equals with user's id");
        }
        return new ConsultationContentWithUserInfoDto(
                user.getId(),
                user.getPhone(),
                user.getNickname(),
                user.getPoints(),
                user.getCreateTime(),
                user.getUpdateTime(),
                user.getRole(),
                consultationContent.getProjectGoal(),
                consultationContent.getAnalysisType(),
                consultationContent.getOrganism(),
                consultationContent.getDataType(),
                consultationContent.getDataSource(),
                consultationContent.getSampleInfo(),
                consultationContent.getComputeResource(),
                consultationContent.getStorageRequirement(),
                consultationContent.getProjectUrgency(),
                consultationContent.getUserSkillLevel(),
                consultationContent.getPreferredLanguage(),
                consultationContent.getPreferredTools(),
                consultationContent.getCoreHypothesis(),
                consultationContent.getExpectedOutput(),
                consultationContent.getRequestStatus()
        );
    }

    @SuppressWarnings("DuplicatedCode")
    public static ConsultationContentWithUserInfoDto combine(
            ConsultationContentDto consultationContent, UserInfoDto user) {
        if (user == null) {
            throw new ResourceNotFountException("can not fond resource of user");
        } else if (consultationContent == null) {
            throw new ResourceNotFountException("can not fond resource of consultation content");
        } else if (consultationContent.getUserId() != null && !consultationContent.getUserId().equals(user.getId())) {
            throw new IllegalArgumentException("the user_id of consultation content must equals with user's id");
        }
        return new ConsultationContentWithUserInfoDto(
                user.getId(),
                user.getPhone(),
                user.getNickname(),
                user.getPoints(),
                user.getCreateTime(),
                user.getUpdateTime(),
                user.getRole(),
                consultationContent.getProjectGoal(),
                consultationContent.getAnalysisType(),
                consultationContent.getOrganism(),
                consultationContent.getDataType(),
                consultationContent.getDataSource(),
                consultationContent.getSampleInfo(),
                consultationContent.getComputeResource(),
                consultationContent.getStorageRequirement(),
                consultationContent.getProjectUrgency(),
                consultationContent.getUserSkillLevel(),
                consultationContent.getPreferredLanguage(),
                consultationContent.getPreferredTools(),
                consultationContent.getCoreHypothesis(),
                consultationContent.getExpectedOutput(),
                consultationContent.getRequestStatus()
        );
    }
}
