package ca.yashghatti.bas.controller;

import ca.yashghatti.bas.model.SwitchState;
import ca.yashghatti.bas.model.TriggerResponse;
import ca.yashghatti.bas.service.LockingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/switch")
@RestController
public class LockingController {

    @Autowired
    private LockingService lockingService;

    @PostMapping("/lock")
    public ResponseEntity<TriggerResponse> triggerLock(@RequestParam("authCode") String authCode) {
        return ResponseEntity.ok(lockingService.triggerLock(authCode));
    }

    @PostMapping("/unlock")
    public ResponseEntity<TriggerResponse> triggerUnlock(@RequestParam("authCode") String authCode) {
        return ResponseEntity.ok(lockingService.triggerUnlock(authCode));
    }

    @GetMapping("/state")
    public ResponseEntity<TriggerResponse> getState() {
        return ResponseEntity.ok(lockingService.getState());
    }

}
