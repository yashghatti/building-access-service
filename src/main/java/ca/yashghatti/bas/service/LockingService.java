package ca.yashghatti.bas.service;

import ca.yashghatti.bas.model.SwitchState;
import ca.yashghatti.bas.model.TriggerResponse;
import org.springframework.stereotype.Service;

@Service
public class LockingService {

    public TriggerResponse triggerLock(String authCode) {
        return TriggerResponse.builder()
                .resultingState(SwitchState.OFF)
                .build();
    }

    public TriggerResponse triggerUnlock(String authCode) {
        return TriggerResponse.builder()
                .resultingState(SwitchState.ON)
                .build();
    }

    public TriggerResponse getState() {
        return TriggerResponse.builder()
                .resultingState(SwitchState.ERROR)
                .message("Blah blah")
                .build();
    }

}
