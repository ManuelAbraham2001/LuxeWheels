package com.LuxeWheels.Scheduler;

import com.LuxeWheels.Service.ReservaServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReservaScheduler {
    private ReservaServiceImpl reservaService;

    @Scheduled(cron = "0 0 0 * * *")
    public void actualizarEstadoDeLasReservas(){
        reservaService.actualizarEstadoDeLasReservas();
    }
}
