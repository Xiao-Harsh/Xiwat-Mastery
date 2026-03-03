package com.xiwat.security;

import com.xiwat.service.AttackLogService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Enumeration;
import java.util.regex.Pattern;

@Component
public class WafFilter implements Filter {

    @Autowired
    private AttackLogService attackLogService;

    // Refined to use word boundaries \b for keywords to avoid false positives
    // (e.g., "standard" containing "AND")
    private static final Pattern SQL_INJECTION_PATTERN = Pattern.compile(
            "(?i)(' OR|--|union select|drop table|1=1|\\bSELECT\\b|\\bINSERT\\b|\\bUPDATE\\b|\\bDELETE\\b|\\bDROP\\b|\\bUNION\\b|\\bOR\\b|\\bAND\\b|#|/\\*)",
            Pattern.CASE_INSENSITIVE);
    private static final Pattern XSS_PATTERN = Pattern.compile(
            "(?i)(<script.*?>.*?</script.*?>|<.*?on\\w+.*?>|onerror=|javascript:|alert\\(|\\.\\./)",
            Pattern.CASE_INSENSITIVE);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Skip WAF for H2 Console and Health Check to ensure the demo flows smoothly
        String uri = httpRequest.getRequestURI();
        if (uri.startsWith("/h2-console") || uri.equals("/api/health")) {
            chain.doFilter(request, response);
            return;
        }

        CachedBodyHttpServletWrapper wrappedRequest = new CachedBodyHttpServletWrapper(httpRequest);
        String ip = wrappedRequest.getRemoteAddr();

        // 1. Check Query Parameters (e.g., ?query=<script>)
        Enumeration<String> parameterNames = wrappedRequest.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String paramName = parameterNames.nextElement();
            String[] paramValues = wrappedRequest.getParameterValues(paramName);
            for (String value : paramValues) {
                if (isMalicious(value)) {
                    attackLogService.logAttack(ip, "MALICIOUS_QUERY_PARAM", value);
                    sendJsonError(httpResponse, "SECURITY_INTERCEPTION", "MALICIOUS_QUERY_PARAM_DETECTED");
                    return;
                }
            }
        }

        // 2. Check Key Headers (User-Agent, Referer)
        String userAgent = wrappedRequest.getHeader("User-Agent");
        String referer = wrappedRequest.getHeader("Referer");
        if (isMalicious(userAgent) || isMalicious(referer)) {
            attackLogService.logAttack(ip, "MALICIOUS_HEADER", "UA: " + userAgent + " | Ref: " + referer);
            sendJsonError(httpResponse, "SECURITY_INTERCEPTION", "MALICIOUS_HEADER_LOG_DETECTED");
            return;
        }

        // 3. Check JSON Body (e.g., email: ' OR 1=1 --)
        String body = wrappedRequest.getBody();
        if (isMalicious(body)) {
            attackLogService.logAttack(ip, "MALICIOUS_BODY", body);
            sendJsonError(httpResponse, "SECURITY_INTERCEPTION", "MALICIOUS_BODY_INJECTION_DETECTED");
            return;
        }

        chain.doFilter(wrappedRequest, response);
    }

    private void sendJsonError(HttpServletResponse response, String code, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String referenceId = "XW-" + (System.currentTimeMillis() % 10000);
        String json = String.format(
                "{\"error\": \"Access Denied\", \"code\": \"SECURITY_DISRUPTION\", \"reference\": \"%s\"}",
                referenceId);
        response.getWriter().write(json);
        response.getWriter().flush();
    }

    private boolean isMalicious(String input) {
        if (input == null || input.isEmpty())
            return false;

        try {
            String decodedInput = java.net.URLDecoder.decode(input, "UTF-8");
            return SQL_INJECTION_PATTERN.matcher(decodedInput).find() || XSS_PATTERN.matcher(decodedInput).find()
                    || SQL_INJECTION_PATTERN.matcher(input).find() || XSS_PATTERN.matcher(input).find();
        } catch (Exception e) {
            return SQL_INJECTION_PATTERN.matcher(input).find() || XSS_PATTERN.matcher(input).find();
        }
    }
}
