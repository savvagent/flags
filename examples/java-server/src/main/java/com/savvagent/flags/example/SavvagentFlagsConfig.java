package com.savvagent.flags.example;

import com.savvagent.flags.sdk.SavvagentFlagsClient;
import com.savvagent.flags.sdk.SavvagentFlagsConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SavvagentFlagsConfig {

    @Value("${savvagentFlags.api-url}")
    private String apiUrl;

    @Value("${savvagentFlags.sdk-key}")
    private String sdkKey;

    @Value("${savvagentFlags.environment}")
    private String environment;

    @Bean
    public SavvagentFlagsClient savvagentFlagsClient() {
        return new SavvagentFlagsClient(
            SavvagentFlagsConfig.builder()
                .apiUrl(apiUrl)
                .sdkKey(sdkKey)
                .environment(environment)
                .cacheEnabled(true)
                .cacheTtl(60000) // 1 minute
                .build()
        );
    }
}
