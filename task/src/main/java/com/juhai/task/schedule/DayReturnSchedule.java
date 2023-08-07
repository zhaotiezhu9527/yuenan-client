package com.juhai.task.schedule;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.NumberUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.juhai.commons.entity.Account;
import com.juhai.commons.entity.User;
import com.juhai.commons.service.AccountService;
import com.juhai.commons.service.ParamterService;
import com.juhai.commons.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 每周奖励
 * @author Administrator
 */
@Slf4j
@Component
public class DayReturnSchedule {

    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ParamterService paramterService;

    @Scheduled(cron = "0 30 23 * * ?")
    public void settle() throws Exception {
        log.info("每日利息任务开启");
        // 查询用户余额大于2000万的
        Map<String, String> allParamByMap = paramterService.getAllParamByMap();
        String dayRate = allParamByMap.get("day_rate");
        Long balance = NumberUtils.toLong(dayRate.split("-")[0]);
        double rateDou = NumberUtils.toDouble(dayRate.split("-")[1]);
        if (rateDou <= 0) {
            return;
        }
        double rate = NumberUtil.div(rateDou, 100);
        List<User> users = userService.list(new LambdaQueryWrapper<User>().ge(User::getBalance, balance));
        if (CollUtil.isNotEmpty(users)) {
            List<User> reports = new ArrayList<>();
            List<Account> accounts = new ArrayList<>();
            Date now = new Date();
            for (User user : users) {
                if (user.getUserStatus().intValue() == 1) {
                    continue;
                }
                BigDecimal tempBalance = NumberUtil.mul(user.getBalance(), rate);

                User tempUser = new User();
                tempUser.setUserName(user.getUserName());
                tempUser.setBalance(tempBalance);
                reports.add(tempUser);

                Account account = new Account();
                account.setAccountNo(IdUtil.getSnowflakeNextIdStr());
                account.setUserName(user.getUserName());
                account.setOptAmount(tempBalance);
                account.setBeforeAmount(user.getBalance());
                account.setAfterAmount(NumberUtil.add(account.getOptAmount(), account.getBeforeAmount()));
                account.setType(1);
                account.setOptType(8);
                account.setOptTime(now);
                account.setUserAgent(user.getUserAgent());
                account.setRefNo(null);
                account.setRemark("Cổ tức hàng ngày");
                accounts.add(account);
            }
            userService.batchUpdateReport(reports);
            accountService.saveBatch(accounts);
        }
        log.info("每日利息任务结束");
    }
}
