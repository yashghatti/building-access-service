package ca.yashghatti.bas.model;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.experimental.Accessors;

@Data
@Accessors( chain = true )
@Builder
public class TriggerResponse {
    @NonNull
    private SwitchState resultingState;
    private String message;
}
