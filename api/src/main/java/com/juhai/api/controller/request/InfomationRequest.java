package com.juhai.api.controller.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel(value = "收集信息请求类", description = "收集信息请求参数")
public class InfomationRequest {
    /**
     * 用户名
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "用户名", example = "dunaifen123", required = true)
    private String userName;

    /**
     * 手机号
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "手机号", example = "dunaifen123", required = true)
    private String userPhone;

    /**
     * 年龄
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "年龄", example = "dunaifen123", required = true)
    private Integer userAge;

    /**
     * 月薪
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "月薪", example = "dunaifen123", required = true)
    private String userSalary;

    /**
     * 工作
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "工作", example = "dunaifen123", required = true)
    private String userJob;

    /**
     * 车房
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "车房情况", example = "dunaifen123", required = true)
    private String userCar;

    /**
     * 婚姻情况
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "婚姻情况", example = "dunaifen123", required = true)
    private String userMarriage;

    /**
     * FB帐号
     */
    @NotNull(message = "system.param.err")
    @ApiModelProperty(value = "FB帐号", example = "dunaifen123", required = true)
    private String userFb;
}
