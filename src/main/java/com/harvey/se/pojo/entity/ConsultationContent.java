package com.harvey.se.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.harvey.se.pojo.dto.ConsultationContentDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 咨询生物信息有关内容
 *
 * @author <a href="mailto:harvey.blocks@outlook.com">Harvey Blocks</a>
 * @version 1.0
 * @date 2025-11-11
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("`tb_consultation_content`")
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationContent {
    public static final ConsultationContent DEFAULT = new ConsultationContent(ConsultationContentDto.DEFAULT);

    // TODO
    @TableId(type = IdType.INPUT, value = "user_id")
    private Long userId;
    private Integer projectGoal;
    private Integer analysisType;
    private String organism;
    private String dataType;
    private String dataSource;
    private String sampleInfo;
    private String computeResource;
    private String storageRequirement;
    private String projectUrgency;
    private String userSkillLevel;
    private String preferredLanguage;
    private String preferredTools;
    private String coreHypothesis;
    private String expectedOutput;
    private String requestStatus;


    public ConsultationContent(ConsultationContentDto dto) {
        this(
                dto.getUserId(),
                dto.getProjectGoal(),
                dto.getAnalysisType(),
                dto.getOrganism(),
                dto.getDataType(),
                dto.getDataSource(),
                dto.getSampleInfo(),
                dto.getComputeResource(),
                dto.getStorageRequirement(),
                dto.getProjectUrgency(),
                dto.getUserSkillLevel(),
                dto.getPreferredLanguage(),
                dto.getPreferredTools(),
                dto.getCoreHypothesis(),
                dto.getExpectedOutput(),
                dto.getRequestStatus()
        );
    }


    public void fillNullWith(ConsultationContent defaultEntity) {
        projectGoal = projectGoal == null ? defaultEntity.projectGoal : projectGoal;
        analysisType = analysisType == null ? defaultEntity.analysisType : analysisType;
        organism = organism == null ? defaultEntity.organism : organism;
        dataType = dataType == null ? defaultEntity.dataType : dataType;
        dataSource = dataSource == null ? defaultEntity.dataSource : dataSource;
        sampleInfo = sampleInfo == null ? defaultEntity.sampleInfo : sampleInfo;
        computeResource = computeResource == null ? defaultEntity.computeResource : computeResource;
        storageRequirement = storageRequirement == null ? defaultEntity.storageRequirement : storageRequirement;
        projectUrgency = projectUrgency == null ? defaultEntity.projectUrgency : projectUrgency;
        preferredLanguage = preferredLanguage == null ? defaultEntity.preferredLanguage : preferredLanguage;
        preferredTools = preferredTools == null ? defaultEntity.preferredTools : preferredTools;
        coreHypothesis = coreHypothesis == null ? defaultEntity.coreHypothesis : coreHypothesis;
        expectedOutput = expectedOutput == null ? defaultEntity.expectedOutput : expectedOutput;
        requestStatus = requestStatus == null ? defaultEntity.requestStatus : requestStatus;
    }
}
